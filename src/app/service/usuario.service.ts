import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';
import { usuarios } from '../models/usuarios.model';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:3000/public/usuarios'; 
  private usuarioSesion: usuarios = {
    idUsuario : 0,
    nombre:'',
    apPaterno :'',
    apMaterno: '' ,
    correo: '',
    password: '',
    idEstado: 0,
    idRol: 0
  }

  constructor(private http: HttpClient) {}

  // Funciones para acceder a la APIs relacionadas a los usuarios
  //GET /usuarios/Total
  getTotalUsuarios(): Observable<{success: boolean, data: number}> {
    return this.http.get<{success: boolean, data: number}>(`${this.apiUrl}/Total`);
  }
  // GET /usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET /usuarios/{id}
  getUsuario(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // GET /usuarios/{email}
  getUsuarioByEmail(email: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/email/${email}`);
  }
  // POST /usuarios/insertar
  crearUsuario(usuario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/insertar`, usuario);
  }


  // POST /usuarios/login
  loginUsuario(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }

  // PUT /usuarios/{id}
  actualizarUsuario(id: number, usuario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, usuario);
  }

  // DELETE /usuarios/{id}
  eliminarUsuario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
  //********************************************************************************* */
  //Funciones basicas para el manejo de los usuarios

  //Guardar la session
  guardarUsuarioSesion(usuario: usuarios): void {
    this.usuarioSesion = usuario;
  }
  getUsuarioSesion(): usuarios {
    return this.usuarioSesion;
  }
}
