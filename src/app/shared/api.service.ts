import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Usuario } from '../Model/usuario';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  apiurl = 'http://localhost:3000/usuarios';

  GetAllUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiurl);
  }

  getUsuarioById(id: any): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiurl + '/' + id);
  }

  RemoverUsuario(id: any) {
    return this.http.delete(this.apiurl + '/' + id);
  }

  CriarUsuario(dadosUsuario: any) {
    return this.http.post(this.apiurl, dadosUsuario);
  }

  EditarUsuario(id: any, dadosUsuario: any) {
    return this.http.put(this.apiurl + '/' + id, dadosUsuario);
  }

}
