const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')


const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, 'multiplefiles/')
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})



const uploads = multer({
    storage : storage,
})



router.post('/multipleFileHandler', uploads.array('files', 10), (req, res, files)=>{
    res.json({msg : "Success adding multiple files", files : req.files})
})




module.exports = routerthe 