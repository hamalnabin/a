import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + '.' + file.originalname.split('.').pop());
  }
});

const fileFilter = (req, file, cb) => {
  const extname = path.extname(file.originalname).toLowerCase();
  if (extname === '.jpg' || extname === '.jpeg' || extname === '.png' || extname === '.webp') {
    return cb(null, true);
  }
  cb(new Error('Only .jpg, .jpeg, .png, and .webp files are allowed'));
};

const upload = multer({ storage, fileFilter });

export default upload;