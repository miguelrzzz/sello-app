import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Plantilla } from '../../models/plantilla.model';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormControl, FormGroup, FormsModule } from '@angular/forms';
import { Router, NavigationEnd, RouterOutlet, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

// Servicios
import { UsuarioService } from '../../service/usuario.service';
import { RolesService } from '../../service/roles.service';
import { PlantillaService } from '../../service/plantillas.service';
import { LocalService } from '../../service/local.service';
// Modelos
import { usuarios } from '../../models/usuarios.model';
import { Roles } from '../../models/roles.model';
import { PagesErrorComponent } from '../../shared/pages-error/pages-error.component';


@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, RouterOutlet, RouterModule, HttpClientModule, PagesErrorComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  standalone: true,
  providers: [UsuarioService, PlantillaService, LocalService, RolesService]
})
export class DashboardComponent implements OnInit {
  // Variables
  totalUsuarios: Number | null = null;

  // Variables para validacion de usuario
  admin = 1;
  isAdmin: boolean = false;
  usuarios: usuarios[] = [];
  roles: Roles[] = [];

  // localService: any;
  plantillas: Plantilla[] | undefined;

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
    }
  }
  isDefaultRoute = true;

  constructor(
    private router: Router,
    private localService: LocalService,
    private usuario_service: UsuarioService,
    private plantillasService: PlantillaService,
    private roles_service: RolesService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.isDefaultRoute = event.urlAfterRedirects === '/' || event.url === '/dashboard';
      });
  }
  cargarPlantillas() {
    this.plantillasService.getPlantillas().subscribe({
      next: (response) => {
        if (response.success) {
          this.plantillas = response.data
        } else {
          console.error('La solicitud no fue exitosa');
        }
      }, error: (err) => {
        console.error("Eror", err);
      },
    })
  }
  ngOnInit(): void {
    const id = this.localService.getData('isLoggedIn');
    this.cargarUsuarios();
    // const usuario = this.usuario_service.getUsuario(Number(id));
    let usuario = this.usuarios.find((usuario) => usuario.idUsuario == Number(id));
    if (usuario?.idRol === Number(id)) {
      this.isAdmin = true;
    }

    this.usuario_service.getTotalUsuarios().subscribe({
      next: (response) => {
        if (response.success) {
          this.totalUsuarios = response.data; // Aquí obtienes el valor 1
        } else {
          console.error('La solicitud no fue exitosa');
        }
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
      }
    });
  }
    cargarUsuarios() {
    this.usuario_service.getUsuarios().subscribe(data => {
      this.usuarios = data.data;
    });
  }
}