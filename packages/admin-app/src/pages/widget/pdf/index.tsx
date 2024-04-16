import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
pdfjs.GlobalWorkerOptions.workerSrc = `http://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`
import PDFFile from './04.pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'
import { cn } from '@/lib/utils'

export default function WidgetPDF() {
  const [numPages, setNumPages] = useState<number>(0)
  // const [pageNumber, setPageNumber] = useState<number>(1)
  const [showText, setShowText] = useState<boolean>(false)

  function onDocumentLoadSuccess({ numPages, canvasRef }: any): void {
    setNumPages(numPages)
    setShowText(true)
    console.log(canvasRef)
  }

  return (
    <div className='select-none relative'>
      <div
        className={cn('absolute z-20 top-[50%] text-red-400 left-[50%] hidden', {
          block: showText,
        })}
      >
        禁止复制
      </div>
      <div className='z-10'>
        <Document renderMode='canvas' file={PDFFile} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={1} />
        </Document>
        <p className={numPages ? 'block' : 'hidden'}>
          Page {1} of {numPages}
        </p>
      </div>
    </div>
  )
}
