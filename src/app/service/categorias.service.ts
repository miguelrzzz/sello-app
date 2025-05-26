import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {
  private apiUrl = 'http://localhost/categorias';

  constructor(private http: HttpClient) { }

  //GET /categoria/Total
  getTotalCategorias(): Observable<{ success: boolean, data: number }> {
    return this.http.get<{ success: boolean, data: number }>(`${this.apiUrl}/Total`);
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
  crearCategoria(categoria: any): Observable<any> {
    return this.http.post(this.apiUrl, categoria);
    // const body = {
    //   nombre: categoria.nombre,
    //   descripcion: categoria.descripcion,
    //   estado_idEstado: 1,
    // };

    // return this.http.post(
    //   this.apiUrl,
    //   body,
    //   {
    //     headers: new HttpHeaders({
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     })
    //   }
    // ).pipe(
    //   catchError(error => {
    //     console.error('Error completo:', error);
    //     throw error; // Reenviar el error para manejo en el componente
    //   })
    // );
  }

}
