import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { PlantillaService } from '../../../service/plantillas.service';
import { HttpClientModule } from '@angular/common/http';
import { Plantilla } from '../../../models/plantilla.model';
import { LocalService } from '../../../service/local.service';
@Component({
  standalone: true,
  selector: 'app-panel-plantillas',
  templateUrl: './panel-plantillas.component.html',
  styleUrls: ['./panel-plantillas.component.css'],
  imports: [CommonModule, HttpClientModule],
  providers: [PlantillaService]
})
export class PanelPlantillasComponent implements OnInit{
  constructor( private plantillaService : PlantillaService, private localService: LocalService){}
  plantillas: Plantilla[] = [];
  ngOnInit(): void {
    this.plantillaService.getPlantillas().subscribe(data => {
      this.plantillas = data.data;
    });
  }
  
  async agregarPlantilla(){

    const userId = this.localService.getData('userId')
    if(!userId){
      alert('Usuario no identificado, debe iniciar sesion primero');
    }
    try{
      const respuesta = await this.plantillaService.crearPlantilla(userId);
      alert('Plantilla guardad correctamente');
    }catch(error){
      console.error('Error al crear la plantilla', error);
    }
  }

}
