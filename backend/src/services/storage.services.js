const Imagekit = require("imagekit");
const fs = require("fs");
const path = require("path");

const IMAGEKIT_PUBLIC_KEY = process.env.IMAGEKIT_PUBLIC_KEY;
const IMAGEKIT_PRIVATE_KEY = process.env.IMAGEKIT_PRIVATE_KEY;
const IMAGEKIT_URL = process.env.IMAGEKIT_URL;

let storageInstance = null;
if (IMAGEKIT_PUBLIC_KEY && IMAGEKIT_PRIVATE_KEY && IMAGEKIT_URL) {
  storageInstance = new Imagekit({
    publicKey: IMAGEKIT_PUBLIC_KEY,
    privateKey: IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: IMAGEKIT_URL,
  });
}

const ensureUploadsDir = () => {
  const dir = path.join(__dirname, "../../uploads");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  return dir;
};

const sendFiles = async (fileBuffer, fileName) => {
  // If ImageKit is configured, upload there. Otherwise, save locally to /uploads and return a local URL.
  if (storageInstance) {
    const base64 = fileBuffer.toString("base64");
    return await storageInstance.upload({ file: base64, fileName, folder: "hm" });
  }

  // Fallback: save file locally
  const uploadsDir = ensureUploadsDir();
  const safeName = `${Date.now()}-${fileName.replace(/[^a-zA-Z0-9.-]/g, "_")}`;
  const outPath = path.join(uploadsDir, safeName);
  await fs.promises.writeFile(outPath, fileBuffer);

  const port = process.env.PORT || process.env.port || 4500;
  const url = `http://localhost:${port}/uploads/${safeName}`;
  return { url };
};

module.exports = sendFiles;
