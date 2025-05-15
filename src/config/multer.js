import multer from 'multer';
import crypto from 'crypto';
import { extname, resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadFolder = resolve(__dirname, "..", "..", "tmp", "uploads");

// Garante que a pasta existe
if (!fs.existsSync(uploadFolder)) {
    fs.mkdirSync(uploadFolder, { recursive: true });
}

export default {
    storage: multer.diskStorage({
        destination: uploadFolder,
        filename: (req, file, callback) => {
            crypto.randomBytes(16, (err, res) => {
                if (err) return callback(err);

                return callback(null, res.toString("hex") + extname(file.originalname))
            });
        },
    }),
}