import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Plantilla } from '../../models/plantilla';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true
})
export class DashboardComponent {
  // formNuevaPlantilla : FormGroup;
  plantillas: Plantilla[] = [
    {
      titulo: 'Constancia de Participación',
      imagenUrl: 'assets/constancias/participacion1.png',
      categoria: 'Participación',
      descripcion: ''
    },
    {
      titulo: 'Constancia de Asistencia',
      imagenUrl: 'assets/constancias/asistencia1.png',
      categoria: 'Asistencia',
      descripcion: ''
    },
    {
      titulo: 'Constancia de Reconocimiento',
      imagenUrl: 'assets/constancias/reconocimiento1.png',
      categoria: 'Reconocimiento',
      descripcion: ''
    },
    // Puedes agregar más plantillas aquí
  ];


  mostrarModalNuevaPlantilla = false;
  mostrarModalImportarPlantilla = false;

  nuevaPlantilla = {
    nombre: '',
    categoria: '',
    descripcion: ''
  };

  archivoImportado: File | null = null;

  abrirModalNuevaPlantilla() {
    this.mostrarModalNuevaPlantilla = true;
  }

  cerrarModalNuevaPlantilla() {
    this.mostrarModalNuevaPlantilla = false;
  }

  abrirModalImportarPlantilla() {
    this.mostrarModalImportarPlantilla = true;
  }

  cerrarModalImportarPlantilla() {
    this.mostrarModalImportarPlantilla = false;
  }

  crearPlantilla() {
    console.log('Plantilla creada:', this.nuevaPlantilla);
    this.cerrarModalNuevaPlantilla();
    // Aquí puedes llamar a un servicio para guardar la plantilla
  }

  onArchivoSeleccionado(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.archivoImportado = file;
      console.log('Archivo seleccionado:', file.name);
    }
  }

  importarPlantilla() {
    if (this.archivoImportado) {
      console.log('Importando archivo:', this.archivoImportado.name);
      this.cerrarModalImportarPlantilla();
      // Aquí puedes llamar a un servicio para procesar el archivo
    }
  }
  isDefaultRoute = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isDefaultRoute = event.urlAfterRedirects === '/' || event.url === '/dashboard';
      });
  }
}