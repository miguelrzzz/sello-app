import { Component } from '@angular/core';
// import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
@Component({
  selector: 'app-design',
  imports: [],
  templateUrl: './design.component.html',
  styleUrl: './design.component.css',
})
export class DesignComponent  {
  selectedFile: File | null = null;

  constructor () {}
  

  // Método para cargar PDF desde assets
  async loadLocalPdf() {
    try {
      // Usando fetch en lugar de HttpClient
      const response = await fetch('/assets/certificado.pdf');
      const pdfArrayBuffer = await response.arrayBuffer();
      const modifiedPdfBytes = await this.processCertificate(pdfArrayBuffer);
      this.downloadPdf(modifiedPdfBytes, 'Certificado_Modificado.pdf');
    } catch (error) {
      console.error('Error:', error);
    }
  }

  // Métodos existentes para manejar PDFs subidos
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async modifyUploadedPdf() {
    if (!this.selectedFile) return;
    
    try {
      const fileBytes = await this.selectedFile.arrayBuffer();
      const modifiedPdfBytes = await this.processCertificate(fileBytes);
      this.downloadPdf(modifiedPdfBytes, 'Certificado_Personalizado.pdf');
    } catch (error) {
      console.error('Error al procesar certificado:', error);
    }
  }

  private async processCertificate(pdfBytes: ArrayBuffer): Promise<Uint8Array> {
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const [page] = pdfDoc.getPages();
    const { width, height } = page.getSize();
    
    // Personalización del certificado
    await page.drawText('MARÍA GARCÍA', {
      x: width / 2 - 120,
      y: height * 0.6,
      size: 32,
      color: rgb(0.72, 0.53, 0.18), // Dorado vintage
      font: await pdfDoc.embedFont('Helvetica-Bold'),
    });
    
    return pdfDoc.save();
  }

  private downloadPdf(pdfBytes: Uint8Array, filename: string) {
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    link.click();
  }
}
