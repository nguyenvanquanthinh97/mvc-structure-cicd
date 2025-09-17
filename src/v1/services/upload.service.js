"use strict";
const crypto = require("crypto");
const { s3, config: s3Config, PutObjectCommand } = require("../config/s3.config");

const uploadImageFromLocalToS3 = async({
  file
}) => {
  try {
    const randomImageName = crypto.randomBytes(16).toString('hex')
    const command = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: randomImageName,
      Body: file.buffer,
      ContentType: 'image/jpeg'
    })
    await s3.send(command)
    // export url
    const imageUrl = `${s3Config.AWS_BUCKET_URL}/${randomImageName}`
    return imageUrl
  } catch (error) {
    console.error('Error uploading image use S3Client::', error)
  }
}

module.exports = {
  uploadImageFromLocalToS3
}
