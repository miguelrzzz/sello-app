import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
//  N$6B_~?n.?vtB5s
//  Manejo de sesion con session storage
export class LocalService {
  constructor() { }
  public saveData(key: string, value: string) {
    sessionStorage.setItem(key, value)
  };
  public getData(key: string) {
    return sessionStorage.getItem(key)
  };
  public removeData(key: string) {
    sessionStorage.removeItem(key)
  }
  public clearData() {
    sessionStorage.clear()
  };
}
