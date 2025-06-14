import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Temaforo } from '../models/temaforo';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class TemaforoService {
  private url = `${base_url}/temaforo`;
private listaCambio = new Subject<Temaforo[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Temaforo[]>(this.url);
  }

  insert(tr: Temaforo) {
    return this.http.post(this.url, tr);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva:Temaforo[]){
    this.listaCambio .next(listaNueva);

  }

  listId(id:number){
    return this.http.get<Temaforo>(`${this.url}/${id}`)
  }
  update(tr:Temaforo){
    return this.http.put(this.url , tr)
  }
  deleteA(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }

}
