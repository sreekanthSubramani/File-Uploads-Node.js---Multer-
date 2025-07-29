const express = require('express')
const router = express.Router()
const multer = require('multer')



const storage = multer.diskStorage({
    destination : (req, file, cb)=>{
        cb(null, 'generics/')
    },
    filename : (req, file, cb)=>{
        cb(null, Date.now() + '-' + file.originalname)
    }
})


const uploads = multer({storage : storage})


router.post('/allfile', uploads.single('file'), (req, res, file)=>{
    res.json({msg : "Success uploads", file : req.file })
})


module.exports = router