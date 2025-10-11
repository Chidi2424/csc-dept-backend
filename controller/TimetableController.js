const express = require("express");
const { UploadTimeTable } = require("../controller/TimetableController");
const cloudinary = require("../Utils/Cloudinary,js");
const UploadTimeTableImage = async (req, res) => {
  const { images } = req.body;
  try {
    if (!Name || !price || !category) {
      return res.status(663).json({
        message: "Name ,price, category are required",
      });
    }
    if (images.length > 5) {
      return res.status(577).json({
        message: "U cant upload more than 5 files",
      });
    }
    const productExist = await ProductModel.findOne({ Name });
    if (productExist) {
      return res.status(422).json({
        message: "Name already exist",
      });
    }

    const uploadedImages = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image, {
          file: image,
          folder: "products", // Optional: store images in a specific folder in Cloudinary

          resource_type: "image",
        });

        return {
          img: result.secure_url,
        };
      })
    );
    const postnewProduct = new ProductModel({
      Name,
      Description,
      price,
      productImage,
      category,
      countInStock,
      rating,
      images: uploadedImages,
    });
    await postnewProduct.save();
    res.status(200).json(postnewProduct);
  } catch (error) {
    res.status(465).json({
      message: "Server error",
    });
  }
};
