export interface ILedgerPeriod {
    startEpochSeconds: number;
    endEpochSeconds: number;
    totalCredit: number;
    totalDebit: number;
    debitsByBillableAction: {
        [key: string]: number;
    };
}
