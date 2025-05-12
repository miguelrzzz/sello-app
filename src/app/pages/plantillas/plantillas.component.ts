import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { Plantilla } from '../../models/plantilla.model';
import { PlantillaService } from '../../service/plantillas.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@Component({
  selector: 'app-plantillas',
  imports: [CommonModule,FormsModule,HttpClientModule],
  templateUrl: './plantillas.component.html',
  styleUrl: './plantillas.component.css',
  providers:[PlantillaService]
})
export class PlantillasComponent implements OnInit{
  constructor(private plantillaService : PlantillaService){}
  searchPlantilla : string = '';
  plantillaSeleccionada?: Plantilla;

  plantillas: Plantilla[] |undefined;

  ngOnInit(): void {
  }
  cargarPlantillas(){
    this.plantillaService.getPlantillas().subscribe({
      next: (response) =>{
        if(response.success){
          this.plantillas = response.data
        }else{
          console.error("la solicitud no fue exitosa")
        }
      },error:(err)=> {
        console.error("Eror",err);
      },
    })
  }

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
      return this.plantillas || [];
    }
    const term = this.searchPlantilla.toLowerCase();
    return (this.plantillas || []).filter(p =>
      p.nombre.toLowerCase().includes(term) ||
      p.descripcion.toLowerCase().includes(term)
    );
  }
}
