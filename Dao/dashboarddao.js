require('dotenv').config();
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const User = require("../models/Items");

const s3 = new aws.S3({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY, 
  }
  
});

const upload = (bucketName) =>
  multer({
    storage: multerS3({
      s3,
      bucket: bucketName,
       acl: 'public-read',
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });

exports.setProfilePic = (req, res, next) => {
  
  const uploadSingle = upload(bucketName).single("croppedImage");

  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });

    const { itemname, parentcategory } = req.body;
    console.log(itemname,parentcategory,req.file.location)
    if (!itemname || !parentcategory) {
      return res.status(400).json({ success: false, message: 'Name and parentCategory are required' });
    }

    try {
      // Create a new entry in the database including the image URL, name, and parentCategory
      const newItem = await User.create({
        photoUrl: req.file.location,
        itemname: itemname,
        parentcategory: parentcategory
      });

      res.status(200).json({ data: newItem });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

module.exports.getImages = async (req, res) => {
  try {
    console.log('Fetching images...');
    const images = await User.find().lean();
    console.log('Images fetched:', images);
    return images;
  } catch (error) {
    console.error('Error fetching images:', error);
    throw new Error('Failed to fetch images');
  }
}
