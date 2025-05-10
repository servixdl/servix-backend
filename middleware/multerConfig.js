import multer from "multer";
import path from "path";


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
    const nombreUnico = Date.now() + path.extname(file.originalname); // ejemplo: 1715379137.jpg
    cb(null, nombreUnico);
  }
});


export const upload = multer({ storage });
