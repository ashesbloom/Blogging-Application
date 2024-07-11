const multer = require('multer');
const fs = require('fs');

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

const upload = multer({ storage: storage });


function calculateReadingTime(text) {
  // Count words
  const words = text.trim().split(/\s+/).length;
  
  // Estimate reading time (average reading speed: 200 words per minute)
  const readingTime = Math.ceil(words /100); // Round up to the nearest minute
  
  return readingTime;
}


module.exports = {
  upload,
  calculateReadingTime
}