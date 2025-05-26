import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private apiUrl = 'http://localhost/roles'; 

  constructor(private http: HttpClient) {}

  //GET /roles
  getRoles(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
