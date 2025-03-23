 import multer, { diskStorage } from "multer";


 //creating multer middleware to parse formdata
const storage=multer.diskStorage({
    filename:function(re,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)

    }
})
const upload=multer({storage})

export default upload