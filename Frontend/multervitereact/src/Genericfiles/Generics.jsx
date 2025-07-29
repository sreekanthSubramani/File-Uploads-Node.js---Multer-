import { useState } from "react"
import '../App.css'


export default function Generics(){

    const [file, setFile] = useState(null)
    const [img, setImg] = useState(null)
    const [showImage, setShowImage] = useState(false)

    function handleFileUploads(e){
        setFile(e.target.files[0])
    }


    async function handleUploadAsync(){
        const formData = new FormData()
        formData.append('file', file)
        
        try{    
            const fetchUploads = await fetch('http://localhost:3232/allfile', {
                method : "POST",
                body : formData
            })

            const msg = await fetchUploads.json()
            const image = `http://localhost:3232/generics/${msg.file.filename}`
            setImg(image)
            setShowImage((prev)=> !prev)
        }catch{
            console.log('POST for generics not working')
        }
    }

    return(
        <>

            <h3> Generic File Uploads - No mimetypes - No File Size Restriction </h3>
            <input type="file" onChange={handleFileUploads}/>
            <button onClick={handleUploadAsync}>Upload</button>
            {showImage &&
            <img 
            src={img} 
            alt="name"
            style={{height : 100, width : 100}}
            />
            }
        </>
    )
}