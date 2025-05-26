import { Component, ChangeDetectorRef } from '@angular/core';
import { CategoriasService } from '../../../service/categorias.service';
import { HttpClientModule } from '@angular/common/http';
import { Categoria } from '../../../models/categoria.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-panel-categorias',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './panel-categorias.component.html',
  styleUrls: ['./panel-categorias.component.css'],
  providers: [CategoriasService]
})
export class PanelCategoriasComponent {
  mostrarModalAgregar: boolean = false;
  mostrarModalEditar: boolean = false;
  mostrarModalEliminar: boolean = false;
  categorias: Categoria[] = [];
  categoriaSeleccionada: any = null;
  nuevaCategoria: Partial<Categoria> = {
    nombre: '',
    descripcion: '',
    estado_idEstado: 1
  };

  constructor(private categoriaService: CategoriasService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoriaService.getCategorias().subscribe({
      next: (response) => {
        this.categorias = response.data;
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  abrirModalAgregar(): void {
    this.nuevaCategoria = { nombre: '', descripcion: '', estado_idEstado: 1 };
    this.mostrarModalAgregar = true;
  }

  abrirModalEditar(categoria: Categoria): void {
    this.categoriaSeleccionada = { ...categoria };
    this.mostrarModalEditar = true;
  }

  abrirModalEliminar(categoria: Categoria): void {
    this.categoriaSeleccionada = categoria;
    this.mostrarModalEliminar = true;
  }

  cerrarModal(): void {
    this.mostrarModalAgregar = false;
    this.mostrarModalEditar = false;
    this.mostrarModalEliminar = false;
    this.categoriaSeleccionada = null;
  }

  // Luego en el método
  agregarCategoria(): void {
    this.categoriaService.crearCategoria(this.nuevaCategoria as Categoria).subscribe({
      next: (response) => {
        this.cargarCategorias();
        this.cerrarModal();
      },
      // ... manejo de errores
    });
  }

  actualizarCategoria(): void {
    if (!this.categoriaSeleccionada) return;

    // this.categoriaService.actualizarCategoria(this.categoriaSeleccionada).subscribe({
    //   next: (response) => {
    //     const index = this.categorias.findIndex(c => c.idcategoria === this.categoriaSeleccionada?.idcategoria);
    //     if (index !== -1) {
    //       this.categorias[index] = response.data;
    //     }
    //     this.cerrarModal();
    //   },
    //   error: (err) => {
    //     console.error('Error al actualizar categoría:', err);
    //   }
    // });
  }

  eliminarCategoria(): void {
    if (!this.categoriaSeleccionada) return;

    // this.categoriaService.eliminarCategoria(this.categoriaSeleccionada.idcategoria).subscribe({
    //   next: () => {
    //     this.categorias = this.categorias.filter(c => c.idcategoria !== this.categoriaSeleccionada?.idcategoria);
    //     this.cerrarModal();
    //   },
    //   error: (err) => {
    //     console.error('Error al eliminar categoría:', err);
    //   }
    // });
  }

  cambiarEstado(idCategoria: number, estadoActual: number): void {
    const nuevoEstado = estadoActual === 1 ? 0 : 1;

    //   this.categoriaService.cambiarEstadoCategoria(idCategoria, nuevoEstado).subscribe({
    //     next: () => {
    //       const categoria = this.categorias.find(c => c.idcategoria === idCategoria);
    //       if (categoria) {
    //         categoria.estado_idEstado = nuevoEstado;
    //       }
    //     },
    //     error: (err) => {
    //       console.error('Error al cambiar estado:', err);
    //     }
    //   });
  }
}