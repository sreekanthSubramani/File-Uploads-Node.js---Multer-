const http = require('http')
const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()


//routes

const genericsPost = require('./Routes/Genericuploadroute')
const pdfFiles = require('./Routes/PDFupload')
const mp3files = require('./Routes/MP3')
const multipleFilesRouter = require('./Routes/Multiplefiles')


const server = http.createServer(app)

app.use(cors({
    origin : "http://localhost:5173"
}))

app.use(mp3files)
app.use(pdfFiles)
app.use(genericsPost)
app.use(multipleFilesRouter)




app.use('/generics', express.static(path.join(__dirname, 'generics')))
app.use('/pdffiles', express.static(path.join(__dirname, 'pdffiles')))
app.use('/mpeg', express.static(path.join(__dirname, 'mpeg')))
app.use('/multiplefiles', express.static(path.join(__dirname, 'multiplefiles')))


server.listen(3232, (e)=>{
    if(!e) console.log('Server running in port 3232')
})