const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      cb(null, `public/img/${req.query.path}`);
    } catch (error) {
      console.error('Multer Error::.', error);
    }
  },
  filename: (req, file, cb) => {
    try {
      cb(null, Date.now() + '-' + file.originalname);
    } catch (error) {
      console.error('Multer Error::.', error);
    }
  },
});

const uploadStorage = multer({ storage: storage });

module.exports = uploadStorage;
