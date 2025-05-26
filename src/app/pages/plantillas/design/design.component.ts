import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import {PDFDocument, StandardFonts, rgb} from 'pdf-lib';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
import { PlantillaService } from '../../../service/plantillas.service';
import { Plantilla } from '../../../models/plantilla.model';
import { PdfThumbnailComponent } from '../../../components/components/pdf-preview/pdf-preview.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-design',
  imports: [PdfThumbnailComponent, HttpClientModule, CommonModule],
  templateUrl: './design.component.html',
  styleUrl: './design.component.css',
  providers: [PlantillaService]
})
export class DesignComponent implements OnInit {
  selectedFile: File | null = null;
  plantillas: Plantilla[] | undefined;
  plantilla: Plantilla | undefined;
  idPlantilla: number | undefined;
  isLoading = true; // Bandera para controlar la carga
  opciones = ['1 persona', 'mas personas']

  constructor(
    private route: ActivatedRoute,
    private plantilla_service: PlantillaService
  ) { }

  async ngOnInit(): Promise<void> {
    try {
      await this.cargarPlantillas();

      this.route.params.subscribe(params => {
        this.idPlantilla = Number(params['idPlantilla']);
        console.log(params);
        this.buscarPlantilla(); // Llamamos a buscarPlantilla después de obtener el id
        console.log(this.plantilla);
      });
      console.log(this.plantilla);
    } catch (error) {
      console.error('Error al cargar:', error);
    } finally {
      this.isLoading = false;
    }
  }

  cargarPlantillas(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.plantilla_service.getPlantillas().subscribe({
        next: (data) => {
          this.plantillas = data.data;
          resolve();
        },
        error: (err) => {
          console.error('Error al cargar plantillas:', err);
          reject(err);
        }
      });
    });
  }

  buscarPlantilla() {
    if (this.plantillas) {
      this.plantilla = this.plantillas.find(p => Number(p.idPlantilla) == this.idPlantilla);
    }
    console.log(this.plantilla);
  }


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
