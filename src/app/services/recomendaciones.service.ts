import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { Subject } from 'rxjs';
import { Recomendaciones } from '../models/recomendaciones';
import { HttpClient } from '@angular/common/http';

const base_url=environment.base

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {

  private listaCambio = new Subject<Recomendaciones[]>();
  private url=`${base_url}/recomendaciones`
  constructor(private http:HttpClient) { }

   list() {
      return this.http.get<Recomendaciones[]>(`${this.url}/lista`);
    }
  
      
    insert(r: Recomendaciones) {
        return this.http.post(`${this.url}/inserciones`, r)
    }
  
    getList() { // para actualizar automático (looks like)
      return this.listaCambio.asObservable();
    }
  
      setList(listaNueva: Recomendaciones[]) {
        this.listaCambio.next(listaNueva);
    }
  
     listId(id: number) {
         return this.http.get<Recomendaciones>(`${this.url}/${id}`)
       }
     
           update(r: Recomendaciones) {
         return this.http.put(this.url, r)
       }
       
           deleteA(id: number){
           return this.http.delete(`${this.url}/${id}`)
         }
       


}