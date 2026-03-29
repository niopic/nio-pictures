import sharp from "sharp";

const src = "src/assets/images/logo.png";

// apple-touch-icon: 180x180 with slight padding inside a black square
await sharp({
  create: { width: 180, height: 180, channels: 4, background: "#000000" },
})
  .composite([
    {
      input: await sharp(src).resize(160, 160, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer(),
      gravity: "centre",
    },
  ])
  .png()
  .toFile("public/apple-touch-icon.png");
console.log("Generated public/apple-touch-icon.png");

// favicon.svg wrapper pointing at a PNG fallback
// favicon.png: 64x64 for crisp rendering at 32/16 in browsers
await sharp({
  create: { width: 64, height: 64, channels: 4, background: "#000000" },
})
  .composite([
    {
      input: await sharp(src).resize(56, 56, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer(),
      gravity: "centre",
    },
  ])
  .png()
  .toFile("public/assets/images/favicon.png");
console.log("Generated public/assets/images/favicon.png");
