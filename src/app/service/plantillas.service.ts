import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlantillaService {
  private apiUrl = 'http://localhost:3000/public/plantillas'; 

  constructor(private http: HttpClient) {}

  //GET /usuarios/Total
  getTotalPlantillas(): Observable<{success: boolean, data: number}> {
    return this.http.get<{success: boolean, data: number}>(`${this.apiUrl}/Total`);
  }
  // GET /usuarios
  getPlantillas(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET /usuarios/{id}
  getPlantillaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // POST /usuarios
  crearPlantilla(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
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
}
