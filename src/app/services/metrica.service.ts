import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Metrica } from '../models/metrica';
const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class MetricaService {

  private url = `${base_url}/metricas`;
  private listaCambio = new Subject<Metrica[]>();
    constructor(private http: HttpClient) {}
    list() {
      return this.http.get<Metrica[]>(this.url);
    }
  
    insert(mr: Metrica) {
      return this.http.post(this.url, mr);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva:Metrica[]){
      this.listaCambio .next(listaNueva);
  
    }
  
    listId(id:number){
      return this.http.get<Metrica>(`${this.url}/${id}`)
    }
    update(mr:Metrica){
      return this.http.put(this.url , mr)
    }
    deleteA(id:number){
      return this.http.delete(`${this.url}/${id}`)
    }
}
