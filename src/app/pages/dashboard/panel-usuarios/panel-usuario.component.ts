import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../../service/usuario.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Importar el modelo de usuario
import { usuarios } from '../../../models/usuarios.model';
import { RolesService } from '../../../service/roles.service';
import { Roles } from '../../../models/roles.model';
import { lastValueFrom } from 'rxjs';
@Component({
  standalone: true,
  selector: 'app-usuario',
  templateUrl: './panel-usuario.component.html',
  styleUrls: ['./panel-usuario.component.css'],
  imports: [CommonModule, HttpClientModule, FormsModule],
  providers: [UsuarioService]
})
export class PanelUsuarioComponent implements OnInit {
  constructor(private usuario_service: UsuarioService, private roles_service: RolesService) { }
  listUsuarios: usuarios[] = [];
  listRoles: Roles[] = [];
  isAdd: boolean = false;
  isEdit: boolean = false;
  isDelete: boolean = false;
  // Variables para mostrar modales
  mostrarModalAgregar = false;
  mostrarModalEditar = false;
  mostrarModalEliminar = false;
  mostrarModalStatus = false;

  // Variables para formulario
  idUsuario: number = 0;
  nombre: string = '';
  apPaterno: string = '';
  apMaterno: string = '';
  correo: string = '';
  password: string = '';
  idEstado: number = 0;
  idRol: number = 0;

  ngOnInit(): void {
    this.cargarDatos();
    console.log('lista ', this.listRoles);
  }

  cargarDatos() {
    this.usuario_service.getUsuarios().subscribe(data => {
      this.listUsuarios = data.data;
    });

    this.roles_service.getRoles().subscribe(data => {
      this.listRoles = data.data;
    });
  }

  editarUsuario(usuario: usuarios) {
    this.isEdit = true;
  }

  usuarioSeleccionado: any = null;

  // Métodos para abrir modales
  abrirModalAgregar() {
    this.mostrarModalAgregar = true;
    this.resetForm();
  }

  abrirModalEditar(usuario: any) {
    this.usuarioSeleccionado = { ...usuario };
    this.mostrarModalEditar = true;
  }

  abrirModalEliminar(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.mostrarModalEliminar = true;
  }

  abrirModalCambiarStatus(usuario: any) {
    this.usuarioSeleccionado = usuario;
    this.mostrarModalStatus = true;
  }

  // Método para cerrar modales
  cerrarModal() {
    this.mostrarModalAgregar = false;
    this.mostrarModalEditar = false;
    this.mostrarModalEliminar = false;
    this.mostrarModalStatus = false;
    this.usuarioSeleccionado = null;
  }

  // Métodos para operaciones CRUD
  agregarUsuario() {
    this.isAdd = true;
    const usuario: usuarios = {
      idUsuario: this.idUsuario,
      nombre: this.nombre,
      apPaterno: this.apPaterno,
      apMaterno: this.apMaterno,
      correo: this.correo,
      password: this.password,
      idEstado: this.idEstado,
      idRol: this.idRol
    };
    this.usuario_service.crearUsuario(usuario).subscribe(data => {
      if (data.status == 200) {
        this.listUsuarios.push(data.data);
        this.isAdd = false;
      } else {
        console.error('Error al agregar usuario');
      }
    });
  }
  actualizarUsuario() {
    // Lógica para actualizar usuario
    const index = this.listUsuarios.findIndex(u => u.idUsuario === this.usuarioSeleccionado.idUsuario);
    if (index !== -1) {
      this.listUsuarios[index] = { ...this.usuarioSeleccionado };
    }
    this.cerrarModal();
  }
  actualizarEstadoUsuario() {
    const index = this.listUsuarios.findIndex(u => u.idUsuario === this.usuarioSeleccionado.idUsuario);
    if (index !== -1) {
      this.listUsuarios[index] = { ...this.usuarioSeleccionado };
    }
    this.cerrarModal();
  }

  eliminarUsuario() {
    // Lógica para eliminar usuario
    this.listUsuarios = this.listUsuarios.filter(u => u.idUsuario !== this.usuarioSeleccionado.idUsuario);
    this.cerrarModal();
  }

  // cambiarStatus(usuario: any) {
  //   console.log(usuario.idUsuario);
  //   this.usuario_service.actualizarEstadoUsuario(usuario.idUsuario);
  //   this.cerrarModal();
  // }

  async cambiarStatus(idUsuario: number, nuevoEstado: number) {
    try {
      await lastValueFrom(
        this.usuario_service.actualizarEstadoUsuario(idUsuario, nuevoEstado)
      );

      // Actualiza el estado del usuario en la lista
      this.listUsuarios = this.listUsuarios.map(u =>
        u.idUsuario === idUsuario ? { ...u, idEstado: nuevoEstado } : u
      );

      this.cerrarModal();
    } catch (err) {
      console.error('Error:', err);
      // Manejo de errores
    }
  }
  // Resetear formulario
  resetForm() {
    idUsuario: 0;
    nombre: '';
    apPaterno: '';
    apMaterno: '';
    correo: '';
    password: '';
    idEstado: 0;
    idRol: 0;

  }
}

