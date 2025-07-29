const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, 'pdffiles/')
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + '-' + path.extname(file.originalname))
    }
})


const fileFilter = (req, file, cb)=>{
    if(file.mimetype === "application/pdf"){
        cb(null, true)
    }else{
        cb(new Error("NOT A PDF FILES"),false)
    }
}


const uploads = multer({
    storage : storage,
    fileFilter : fileFilter
})


router.post('/pdffiles', uploads.single('file'), (req, res, file)=>{
    res.json({msg : 'PDF file uploaded', file : req.file})
})





module.exports = router