import { useState } from "react"


export default function Mp3File(){
    
    const [mp3File, setMP3File] = useState(null)
    const [status, setStatus] = useState('')
    const [showMP3, setShowMP3] = useState(false)
    const [viewable, setViewable] = useState(null)

    function handleMP3Uploads(e){
        const tempFile = e.target.files[0]

        if(tempFile.type != 'audio/mpeg' && tempFile.type != 'audio/mp3'){
            setStatus('Not a MP3 File')
            setMP3File(null)
            return
        }

        setMP3File(tempFile)

    }
    
    async function handleMP3Async(){
        
        const formData = new FormData()
        formData.append('file', mp3File)
        
        try{    
            const fetchMp3files = await fetch('http://localhost:3232/mpegfile',{
                method : "POST",
                body : formData
            })
            const resp = await fetchMp3files.json()
            console.log(resp.msg)
            const mpegfile = `http://localhost:3232/mpeg/${resp.file.filename}`
            setViewable(mpegfile)
            setShowMP3((prev)=> !prev)
        }catch{
            console.log('post method for MP3 not working')
        }
    }
    
    return(
        <>
            <h1>MP3 Only FileUploads</h1>
            <input type="file" accept="audio/mpeg" onChange={handleMP3Uploads}/>
            <button onClick={handleMP3Async}>Submit</button>
            <p>{status}</p>
            {
            showMP3 &&
            <>
            <audio controls src={viewable}></audio>
            <p>check</p>
            </>
            }
            </>
            
    )
}