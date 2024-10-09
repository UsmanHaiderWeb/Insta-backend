const multer = require('multer');
const crypto = require('crypto');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cd) => {
        cd(null, './public/images')
    },
    filename: (req, file, cd) => {
        crypto.randomBytes(12, (er, bytes) => {
            cd(null, bytes.toString("hex") + path.extname(file.originalname));
        })
    }
})

const upload = multer({storage})


module.exports = upload;