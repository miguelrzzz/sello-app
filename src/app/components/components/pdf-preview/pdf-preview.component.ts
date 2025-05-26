import { Component, Input, ElementRef, AfterViewInit } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { GlobalWorkerOptions } from 'pdfjs-dist';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-pdf-thumbnail',
   imports: [CommonModule],
  template: `
    <div class="relative w-full h-full flex items-center justify-center bg-gray-50">
      <canvas #pdfCanvas class="max-w-full max-h-full object-contain"></canvas>
      <div *ngIf="errorMessage" class="absolute inset-0 flex items-center justify-center bg-white/80">
        <p class="text-red-500 text-sm p-2">{{errorMessage}}</p>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `]
})
export class PdfThumbnailComponent implements AfterViewInit {
  @Input() pdfUrl!: string;
  @Input() thumbnailHeight = 300; // Altura configurable
  errorMessage: string = '';

  constructor(private elementRef: ElementRef) { }

  async ngAfterViewInit() {
    this
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString();
    try {
      const loadingTask = pdfjsLib.getDocument({
        url: this.pdfUrl,
        disableAutoFetch: true
      });

      const pdf = await loadingTask.promise;
      const page = await pdf.getPage(1);
      const viewport = page.getViewport({ scale: 1.0 });

      // Calcular escala basada en la altura deseada
      const scale = (this.thumbnailHeight / viewport.height) * 0.99; // 90% del alto disponible
      const scaledViewport = page.getViewport({ scale });

      const canvas = this.elementRef.nativeElement.querySelector('canvas');
      canvas.width = scaledViewport.width * 0.99;
      canvas.height = scaledViewport.height;

      await page.render({
        canvasContext: canvas.getContext('2d'),
        viewport: scaledViewport
      }).promise;

    } catch (error) {
      console.error('Error al cargar PDF:', error);
      this.errorMessage = 'Error al cargar vista previa';
    }
  }
  // }
}