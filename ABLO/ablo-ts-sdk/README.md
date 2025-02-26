# Ablo Typescript SDK

This is the official Ablo Typescript SDK.

## Installation

```bash
npm install ablo-ts-sdk
```

## Usage

To use the Ablo Typescript SDK, you need to initialize it with your API key. Here's a basic example of how to use the SDK:

```typescript
import { Ablo } from 'ablo-ts-sdk'

const ablo = new Ablo('your-api-key')

// Example usage of the SDK
// GET /styles
const styles = await ablo.styles.getAll()
console.log('Styles:', styles)
// Background Removal
const backgroundRemovalResult = await ablo.backgroundRemoval.byUrl(
  imageUrl: 'https://example.com/image.jpg',
)
console.log('Background removed image:', backgroundRemovalResult.image)

// FontMaker
const fontMakerResult = await ablo.fontMaker.run({
  text: 'Hello World',
  styleId: 'some-fontmaker-style-id',
})
console.log('FontMaker generated images:', fontMakerResult.images)

// Image Maker
const imageMakerResult = await ablo.imageMaker.run({
  freeText: 'A beautiful sunset over the ocean',
  styleId: 'some-imagemaker-style-id',
})
console.log('Image Maker generated images:', imageMakerResult.images)

// Photo Transformer
const photoTransformerResult = await ablo.photoTransformer.fromUrl({
  imageUrl: 'https://example.com/image.jpg',
  styleId: 'some-phototransformer-style-id',
})
console.log('Photo Transformer result:', photoTransformerResult.images)

// Inpainting
const inpaintingResult = await ablo.inpainting.run({
  imageUrl: 'https://example.com/image.jpg',
  maskUrl: 'https://example.com/mask.jpg',
})
console.log('Inpainting result:', inpaintingResult.images)


```
