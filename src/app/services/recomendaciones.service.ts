import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Recomendacion } from '../models/recomendacion';
import { environment } from '../environments/environment';
import { Observable, Subject, tap } from 'rxjs';

const base_url = environment.base;

@Injectable({
  providedIn: 'root'
})
export class RecomendacionesService {
  private url = `${base_url}/recomendaciones`;
  private listaCambio = new Subject<Recomendacion[]>();

  constructor(private http: HttpClient) {}

   list() {
      return this.http.get<Recomendacion[]>(this.url);
    }
  
    insert(r: Recomendacion) {
      return this.http.post(this.url, r);
    }
    getList() {
      return this.listaCambio.asObservable();
    }
    setList(listaNueva: Recomendacion[]) {
      this.listaCambio.next(listaNueva);
    }
    actualizar(id: number, ruta: Recomendacion): Observable<Recomendacion> {
    return this.http.put<Recomendacion>(`${this.url}/${id}`, ruta).pipe(
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