const MongoURI = require("../private/credentialsDB");

const GridFsStorage = require("multer-gridfs-storage");
const multer = require("multer");

const storage = new GridFsStorage({
  url: MongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "archivos"
      };
      resolve(fileInfo);
    });
  },
});

const upload = multer({ storage });

module.exports = {
  upload,
};
