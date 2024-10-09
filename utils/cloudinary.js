const path = require('path');
const {v2} = require('cloudinary')
const cloudinary = v2;




const uploadOnCloudnary = async (req, res, type) => {
    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUDNAME, 
        api_key: process.env.CLOUDINARY_APIKEY, 
        api_secret: process.env.CLOUDINARY_SECRET
    });
    
    
    let typeOBJ;
    if(type == 'video'){
        typeOBJ = {
            filename_override: req.file.filename,
            resource_type: type
        }
    } else {
        typeOBJ = {
            filename_override: req.file.filename,
        }
    }


    // Upload an image
    const uploadResult = await cloudinary.uploader
    .upload(
        // `https://res.cloudinary.com/demo/image/upload/getting-started/${req.file.filename}`,
        path.resolve(__dirname, '../public/images', req.file.filename), typeOBJ
        )
    .catch((error) => {
        console.log("Uploading File ERROR: ", error);
    });
    console.log("uploadResult: ", uploadResult);
    return uploadResult;
}


module.exports = uploadOnCloudnary;