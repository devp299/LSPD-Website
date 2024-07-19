import multer from "multer";

const multerUpload = multer({
    limits: {
        fileSize: 1024*1024*10,
    }
});

const imageNews = multerUpload.single("image");

export {imageNews};
