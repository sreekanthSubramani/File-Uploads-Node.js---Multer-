import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Generics from './Genericfiles/Generics'
import PDFComponent from './PDFComp/PDFComponent'
import Mp3File from './MP3/Mp3file'
import Multiplefiles from './MultipleFiles/Multiplefles'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Multiplefiles />
  </StrictMode>,
)
