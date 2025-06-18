import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ContactoEmergencia } from '../../../models/contactoemergencia';
import { environment } from '../../environments/environment';

const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class ContactoemergenciaService {

  private url = `${base_url}/contactoemergencia`;
private listaCambio = new Subject<ContactoEmergencia[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<ContactoEmergencia[]>(this.url);
  }

  insert(ce: ContactoEmergencia) {
    return this.http.post(this.url, ce);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:ContactoEmergencia[]){
    this.listaCambio .next(listaNueva);

  }

  listId(id:number){
    return this.http.get<ContactoEmergencia>(`${this.url}/${id}`)
  }
  update(ce:ContactoEmergencia){
    return this.http.put(this.url , ce)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

}
