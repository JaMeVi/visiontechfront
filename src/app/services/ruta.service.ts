import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Ruta } from '../models/ruta';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
const base_url = environment.base;
@Injectable({
  providedIn: 'root'
})
export class RutaService {
  private url = `${base_url}/rutas`;
private listaCambio = new Subject<Ruta[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<Ruta[]>(this.url);
  }

  insert(r: Ruta) {
    return this.http.post(this.url, r);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: Ruta[]) {
    this.listaCambio.next(listaNueva);
  }
  actualizar(id: number, ruta: Ruta): Observable<Ruta> {
  return this.http.put<Ruta>(`${this.url}/${id}`, ruta).pipe(
    tap(() => this.actualizarLista())
  );
}

eliminar(id: number): Observable<void> {
  return this.http.delete<void>(`${this.url}/${id}`).pipe(
    tap(() => this.actualizarLista())
  );
}

private actualizarLista(): void {
  this.list().subscribe(data => this.listaCambio.next(data));
}
}