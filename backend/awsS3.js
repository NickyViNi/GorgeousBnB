const { aws } = require("./config");
const AWS = require("aws-sdk");
const multer = require("multer");
const s3 = new AWS.S3({ apiVersion: "2006-03-01" });
const NAME_OF_BUCKET = aws.NAME_OF_BUCKET;


const singleFileUpload = async ({ file, public = false }) => {
    const { originalname, buffer } = file;
    const path = require("path");

    // Set the name of the file in your S3 bucket to the date in ms plus the extension name.
    const Key = new Date().getTime().toString() + path.extname(originalname);
    const uploadParams = {
      Bucket: NAME_OF_BUCKET,
      Key: public ? `public/${Key}` : Key,
      Body: buffer
    };
    const result = await s3.upload(uploadParams).promise();

    // Return the link if public. If private, return the name of the file in your
    // S3 bucket as the key in your database for subsequent retrieval.
    return public ? result.Location : result.Key;
  };

const multipleFilesUpload = async ({files, public = false}) => {
    return await Promise.all(
      files.map((file) => {
        return singleFileUpload({file, public});
      })
    );
};

// The aws-sdk package uses your IAM credentials in the .env file to authorize this call to s3.getSignedUrl
const retrievePrivateFile = key => {
    let fileUrl;
    if (key) {
      fileUrl = s3.getSignedUrl("getObject", {
        Bucket: NAME_OF_BUCKET,
        Key: key
      });
    }
    return fileUrl || key;
  };

const storage = multer.memoryStorage({
    destination: function (req, file, callback) {
      callback(null, "");
    },
});

/* Multer is Node.js middleware that takes multipart/form-data requests,
puts the text fields into a body object on the request, and reassembles
the file(s) under a file or files key in the request. */
//nameOfKey must match the name under which you stored the data on the frontend.
const singleMulterUpload = nameOfKey => multer({ storage: storage }).single(nameOfKey);
const multipleMulterUpload = nameOfKey => multer({ storage: storage }).array(nameOfKey);

module.exports = {
    s3,
    singleFileUpload,
    multipleFilesUpload,
    retrievePrivateFile,
    singleMulterUpload,
    multipleMulterUpload
  };
