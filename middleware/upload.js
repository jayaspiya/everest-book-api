const multer = require('multer')
const storage = multer.diskStorage({
    destination: function(req,file, cb){
        cb(null, './uploads/')
    },
    filename: function(req,file,cb){
        const uploadedFilename = Date.now() + "-" + file.originalname
        cb(null, uploadedFilename)
        req.uploadedFilename = uploadedFilename
    }
})
module.exports = multer({
    storage
})