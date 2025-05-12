import { Component } from '@angular/core';
import { CategoriasService } from '../../../service/categorias.service';
import { HttpClientModule } from '@angular/common/http';
import { Categoria } from '../../../models/categoria.model';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-panel-categorias',
  imports: [ CommonModule,HttpClientModule],
  templateUrl: './panel-categorias.component.html',
  styleUrl: './panel-categorias.component.css',
  providers: [CategoriasService]
})
export class PanelCategoriasComponent {
  constructor( private categoriaService : CategoriasService){}
  categorias: Categoria[] = [];
  
  ngOnInit(): void {
    this.categoriaService.getCategorias().subscribe(data => {
      this.categorias = data.data;
    });
  }
}
