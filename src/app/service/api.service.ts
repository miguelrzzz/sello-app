import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://localhost/'; // URL de tu backend

  constructor(private http: HttpClient) { }

  /**
   * Método genérico para todas las peticiones
   * @param method 'GET' | 'POST' | 'PUT' | 'DELETE'
   * @param endpoint Nombre del endpoint (ej: 'usuarios')
   * @param body Opcional para POST/PUT
   * @param params Opcional para GET (query params)
   */
  request<T>(
    method: string,
    endpoint: string,
    body?: any,
    params?: HttpParams
  ): Observable<T> {
    const url = `${this.baseUrl}/${endpoint}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.getToken()}` // Si usas JWT
    });

    return this.http.request<T>(method, url, {
      body,
      headers,
      params
    }).pipe(
      catchError(this.handleError)
    );
  }

  // Métodos específicos para mejor semántica
  get<T>(endpoint: string, params?: HttpParams): Observable<T> {
    return this.request<T>('GET', endpoint, null, params);
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.request<T>('POST', endpoint, body);
  }

  put<T>(endpoint: string, body: any): Observable<T> {
    return this.request<T>('PUT', endpoint, body);
  }

  delete<T>(endpoint: string): Observable<T> {
    return this.request<T>('DELETE', endpoint);
  }

  private getToken(): string | null {
    return localStorage.getItem('token'); // O tu método para obtener el token
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Error en la petición:', error);
    // Personaliza según tus necesidades
    return throwError(() => ({
      status: error.status,
      message: error.error?.message || 'Error desconocido'
    }));
  }
}