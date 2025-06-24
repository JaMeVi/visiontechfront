import { Injectable } from '@angular/core';
import { environment } from '../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Recomendaciones } from '../models/recomendaciones';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {

  private url = `${base_url}/recomendaciones`;
  private listaCambio = new Subject<Recomendaciones[]>();

  constructor(private h: HttpClient) { }

  list() {
    return this.h.get<Recomendaciones[]>((this.url));
  }

  insert(r: Recomendaciones) {
    return this.h.post((this.url), r)
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Recomendaciones[]) {
    this.listaCambio.next(listaNueva);
  }
}
