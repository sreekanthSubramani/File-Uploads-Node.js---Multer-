import { useState } from "react"


export default function PDFComponent(){
    
    const [pdffile, setPDFFile] = useState(null)
    const [status, setStatus] = useState('')
    const [showPDF, setShowPDF] = useState(false)
    const [viewable, setViewable] = useState(null)

    function handlePDFUploads(e){
        const tempFile = e.target.files[0]

        if(tempFile.type != 'application/pdf'){
            setStatus('Not a PDF File')
            setPDFFile(null)
            return
        }

        setPDFFile(tempFile)

    }
    
    async function handlePDFAsync(){
        
        const formData = new FormData()
        formData.append('file', pdffile)
        
        try{    
            const fetchPDFFile = await fetch('http://localhost:3232/pdffiles',{
                method : "POST",
                body : formData
            })
            const resp = await fetchPDFFile.json()
            console.log(resp.msg)
            const pdfFileURL = `http://localhost:3232/pdffiles/${resp.file.filename}`
            setViewable(pdfFileURL)
            setShowPDF((prev)=> !prev)
        }catch{
            console.log('post method for PDF not working')
        }
    }
    
    return(
        <>
            <h1>PDF Only FileUploads</h1>
            <input type="file" accept="application/pdf" onChange={handlePDFUploads}/>
            <button onClick={handlePDFAsync}>Submit</button>
            <p>{status}</p>
            {
            showPDF &&
            <iframe
            src={viewable}
            width={600}
            height={500}
            title="PDF Preview"></iframe>
            }
            </>
            
    )
}