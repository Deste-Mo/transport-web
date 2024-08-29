import multer from 'multer';
import path from 'path';

// Configuration de multer pour le stockage des fichiers
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads'); // Dossier de stockage des fichier
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Vérification du type de fichier
function checkFileType(file, cb) {
  const filetypes = /jpeg|jpg|png|gif|pdf|txt|pdf/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb('Erreur : Images et pdf et text uniquement !');
  }
}

const uploadMessFile = multer({
  storage: storage,
  limits: { fileSize: 10000000 }, // Limite de taille de fichier à 10MB
  fileFilter: (req, file, cb) => {
    checkFileType(file, cb);
  }
});


export default uploadMessFile;