require('dotenv').config();
const mongoose = require('mongoose');
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const ObjectId = mongoose.Types.ObjectId;
const User = require("../models/Items");
const Category = require("../models/category");
const Subcategory = require("../models/subcategory");


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
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });

exports.addItems = (req, res, next) => {
  console.log("hello")
 
  const uploadSingle = upload(process.env.BUCKET_NAME).single("image");

  uploadSingle(req, res, async (err) => {
    if (err) return res.status(400).json({ success: false, message: err.message });
    console.log("body values",req.body)
    const { name, description,price,stockquantity,category_id,subcategory_id,preferences } = req.body;
    console.log("preferences",req.body.preferences)
    try {
      // Create a new entry in the database including the image URL, name, and parentCategory
      const newItem = await User.create({
        photoUrl: req.file.location,
        name: name,
        description:description,
        price:price,
        stock_quantity:stockquantity,
        category_id:category_id,
        subcategory_id:subcategory_id,
        preferences:preferences
      });
      console.log("result",newItem)
      res.status(200).json(newItem);
    } catch (error) {
      console.log("errror in dao add items",error)
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

exports.addcategory = (req, res, next) => {
  const uploadSingle = upload(process.env.BUCKET_NAME).single("croppedImage");
   console.log("i am working")
  uploadSingle(req, res, async (err) => {
    console.log("body",req.body)
    if (err) {
      console.log("error dsde ", err)
      return res.status(400).json({ success: false, message: err.message });
    }
    
    if (!req.file) {
      return res.status(400).json({ success: false, message: "File upload failed" });
    }

    const { name } = req.body;
    console.log("name",name,req.file.location)
    try {
      const newcategory = await Category.create({
        categoryPicUrl: req.file.location,
        name: name
      });

      res.status(200).json({ data: newcategory });
    } catch (error) {
      console.log("error")
      res.status(500).json({ success: false, message: error.message });
    }
  });
};

module.exports.addsubcategory = async (name,category) => {
  try {

    const subcategory = await Subcategory.create({
          name: name,
          category: category
    })
    const updatedcategory = await Category.updateOne({ _id: category },
    { $push: { subcategories: { subcategory_id: subcategory._id } } })

    return subcategory
  } catch (error) {
    console.log("error",error)
    throw new Error('Failed to post sub category');
  }
}

module.exports.getItemsByPref = async (preferences,description) => {
  try{
    const result = User.aggregate([
      {
          $match: {
              preferences: { $in: preferences },
              $text: { $search: description }
          }
      },
      {
          $addFields: {
              score: { $meta: "textScore" }
          }
      },
      {
          $sort: {
              score: -1  // Descending order
          }
      }
  ]);

      // Run the aggregation query
      console.log("result",result);
      return result
    } catch (error) {
        console.error('Error performing aggregation:', error);
        throw error
    }

      } 




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
module.exports.getcategories = async () => {
  try {
    const category = await Category.find().lean();
    console.log("category",category)
    return category
  } catch (error) {
    throw new Error('Failed to fetch category');
  }
}

module.exports.getsubcategories = async (category_id) => {
  const validcategory_id = new ObjectId(category_id)
  try {
    const subcategory = await Subcategory.find({category:validcategory_id}).lean();
    return subcategory;
  } catch (error) {
    console.log("error in dao file", error)
    throw new Error('Failed to fetch subcategory');
  }
}
