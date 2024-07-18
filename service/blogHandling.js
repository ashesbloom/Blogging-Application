const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const dir = `./public/uploads/${req.user._id}`;
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive:true});
        }
        cb(null,dir);
    },
    filename: function (req, file, cb) {
      const name = `${Date.now()}-${file.originalname}`;
      cb(null,name);
    }
  })

const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
      cb(new Error('Only .gif, .png, .jpeg, and .jpg files are allowed!'), false);    
    }
};

// Initialize Multer with storage and file filter
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 1024 * 1024 * 5 } // Optional: Set file size limit (5 MB in this case)
})



function calculateReadingTime(text) {
  // Count words
  const words = text.trim().split(/\s+/).length;
  
  // Estimate reading time (average reading speed: 200 words per minute)
  const readingTime = Math.ceil(words /100); 
  
  return readingTime;
}


module.exports = {
  upload,
  calculateReadingTime
}