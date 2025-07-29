import { useState } from "react"



export default function Multiplefiles(){

    const [multipleFiles, setMultipleFiles] = useState([])
    const [showFiles, setShowFiles] = useState(false)
    const [viewables, setViewables] = useState([])
    
    function multipleFilesHandler(e){
        setMultipleFiles(e.target.files)
    }

    async function handleAsyncUploads(){
        const formData = new FormData()
        for(let  i=0; i < multipleFiles.length; i++){
            formData.append('files', multipleFiles[i])
        }

        try{
            const multipleFilers = await fetch('http://localhost:3232/multipleFileHandler',{
                method : "POST",
                body : formData
            })
            const respMultiples = await multipleFilers.json()
            const takingAllUrls = respMultiples.files.map(im=> `http://localhost:3232/multiplefiles/${im.filename}`)
            setShowFiles((prev)=> !prev)
            setViewables(takingAllUrls)
        }catch{
            console.log('Error happened in POST Req')
        }


    }
    
    
    return(
        <>
            <h1>Multiple Files Upload</h1>
            <input type="file" multiple onChange={multipleFilesHandler}/>
            <button onClick={handleAsyncUploads}>Upload</button>

            {
            showFiles &&
            viewables.map(im=>{
                return(
                    <>
                    <img
                    src={im}
                    style={{width : 100, height : 100}}
                    >
                    </img>
                    </>
                )
            })}
        </>
    )
}