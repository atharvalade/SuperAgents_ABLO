from huggingface_hub import login
from sec_edgar_downloader import Downloader
import os
import re
from bs4 import BeautifulSoup
from smolagents import tool, ToolCallingAgent, CodeAgent, HfApiModel

login()
model_id = "Qwen/Qwen2.5-Coder-32B-Instruct"
model = HfApiModel(model_id)

@tool
def analyze_company_financials(ticker: str) -> dict:
    """
    Analyzes company financials using SEC EDGAR 10-K filing data.
    
    Args:
        ticker: Company stock ticker symbol
    
    Returns:
        Dictionary with financial analysis and buy recommendation
    """
    try:
        # Download latest 10-K filing with email address and company name
        dl = Downloader(
            company_name=ticker,
            email_address="gauravkarwa41@gmail.com"
        )
        dl.get("10-K", ticker, amount=1)
        
        # Find the most recent 10-K filing directory
        base_path = os.path.join(os.getcwd(), "sec_edgar_filings")
        company_dir = os.path.join(base_path, ticker, "10-K")
        if not os.path.exists(company_dir):
            return f"No 10-K filings found for {ticker}"
            
        latest_filing = max([os.path.join(company_dir, d) for d in os.listdir(company_dir)])
        
        # Parse the filing document
        filing_docs = [f for f in os.listdir(latest_filing) if f.endswith('.htm')]
        if not filing_docs:
            return f"No HTML document found in the filing for {ticker}"
            
        with open(os.path.join(latest_filing, filing_docs[0]), 'r', encoding='utf-8') as f:
            soup = BeautifulSoup(f.read(), 'html.parser')
        
        # Extract financial data
        tables = soup.find_all('table')
        revenue = None
        net_income = None
        
        for table in tables:
            text = table.get_text().lower()
            rows = table.find_all('tr')
            
            for row in rows:
                row_text = row.get_text().lower()
                if 'revenue' in row_text or 'sales' in row_text:
                    numbers = re.findall(r'[-+]?\d*\.?\d+', row_text)
                    if numbers:
                        revenue = float(numbers[0]) * 1000000
                
                if 'net income' in row_text or 'net earnings' in row_text:
                    numbers = re.findall(r'[-+]?\d*\.?\d+', row_text)
                    if numbers:
                        net_income = float(numbers[0]) * 1000000
        
        if revenue is None or net_income is None:
            return f"Could not extract complete financial data for {ticker}"
        
        profit_margin = (net_income / revenue) * 100 if revenue else 0
        
        buy_recommendation = False
        reason = ""
        
        if profit_margin > 10:
            buy_recommendation = True
            reason = "Strong profit margins above 10%"
        elif profit_margin > 5:
            buy_recommendation = True
            reason = "Moderate but positive profit margins"
        else:
            reason = "Low profit margins"
        
        return {
            'ticker': ticker,
            # 'address': '11585 Broadway, New York, NY 10036',
            'buy_recommendation': buy_recommendation,
            'reason': reason,
            'source': '10-K Filing'
        }
    except Exception as e:
        return f"Error analyzing company financials: {str(e)}"

web_agent = ToolCallingAgent(
    tools=[analyze_company_financials],
    model=model,
    max_steps=15,
    name="company_analysis_agent",
    description="Analyzes financial data for companies and provides investment recommendations.",
)

manager_agent = CodeAgent(
    tools=[],
    model=model,
    managed_agents=[web_agent],
    additional_authorized_imports=["sec_edgar_downloader", "bs4", "os", "re"],
)

# Updated prompt to avoid web search dependency
answer = manager_agent.run("""
As an expert in the New York financial market, please:
1. List 5 public companies that have their headquarters near '415 Mission Street, 3rd Floor
San Francisco, CA 94105' within 2 mile radius
2. For each company you listed, analyze their financial data and provide:
   - Their latest revenue and profit figures
   - A buy recommendation based on their financial health
Response should be in JSON format like this:{
    "companies": [
        {
            "ticker": "AAPL",
            "address": "companies address",
            "Recommendation": "Buy" or "Sell"}]
""")

print(answer)
