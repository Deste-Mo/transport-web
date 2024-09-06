import multer from 'multer';
import path from 'path';

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads/'); // Dossier de stockage des images
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Vérification du type de fichier
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb('Erreur : Images uniquement !');
  }
}

const upload = multer({
  storage: storage,
  limits: { fileSize: 100000000000 },
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});


export default upload;