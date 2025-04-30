import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Plantilla } from '../../models/plantilla';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-plantillas',
  imports: [CommonModule,FormsModule],
  templateUrl: './plantillas.component.html',
  styleUrl: './plantillas.component.css'
})
export class PlantillasComponent {
  searchPlantilla : string = '';
  plantillaSeleccionada?: Plantilla;

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


  buscarPlantilla(){
  }
  seleccionarPlantilla(plantilla: Plantilla) {
    this.plantillaSeleccionada = plantilla;
  }

  cerrarModal() {
    this.plantillaSeleccionada = undefined;
  }
  get plantillasFiltradas(): Plantilla[] {
    if (!this.searchPlantilla.trim()) {
      return this.plantillas;
    }
    const term = this.searchPlantilla.toLowerCase();
    return this.plantillas.filter(p =>
      p.titulo.toLowerCase().includes(term) ||
      p.categoria.toLowerCase().includes(term)
    );
  }
}
