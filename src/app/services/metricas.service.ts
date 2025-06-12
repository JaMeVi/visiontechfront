import { Injectable } from '@angular/core';
import { Metrica } from '../models/metrica';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})

export class MetricasService {

  private url = `${base_url}/metricas`;
  private listaCambio = new Subject<Metrica[]>();
  
  constructor(private http: HttpClient) { }
    list() {
    return this.http.get<Metrica[]>(this.url)
  }
  
  insert(m: Metrica){
    return this.http.post(this.url, m);
  }

  getList(){
    return this.listaCambio.asObservable();
  }

  setList(listaNueva: Metrica[]){
    this.listaCambio.next(listaNueva);
  }
}
