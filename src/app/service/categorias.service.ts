import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost:3000/public/categorias'; 

  constructor(private http: HttpClient) {}

  //GET /categoria/Total
  getTotalCategorias(): Observable<{success: boolean, data: number}> {
    return this.http.get<{success: boolean, data: number}>(`${this.apiUrl}/Total`);
  }
  // GET /categorias
  getCategorias(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // GET /categorias/{id}
  getCategoriaById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // POST /categorias
  crearCategoria(usuario: any): Observable<any> {
    return this.http.post(this.apiUrl, usuario);
  }

}
