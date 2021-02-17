const multer = require('multer');


module.exports = (folderName='uploads') => {
    let upload = multer({
        storage: multer.diskStorage({
          destination: folderName,
          filename: (req, file, save) => {
            save(null, `${file.originalname}`);
          },
        }),
      }).single("file");

    return upload;
}