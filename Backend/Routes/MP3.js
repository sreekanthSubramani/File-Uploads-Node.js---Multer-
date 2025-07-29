const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, 'mpeg/')
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const fileFilter = (req, file, cb)=>{
    if(file.mimetype === "audio/mpeg" || file.mimetype === "audio/mp3"){
        cb(null, true)
    }else{
        cb(new Error("NOT A MP3 FILES"),false)
    }vv
}


const uploads = multer({
    storage : storage,
    fileFilter : fileFilter
})


router.post('/mpegfile', uploads.single('file'), (req, res)=>{
    res.json({msg : 'MP3 file uploaded', file : req.file})
})





module.exports = router