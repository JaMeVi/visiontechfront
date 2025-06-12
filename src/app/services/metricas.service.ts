import { Injectable } from '@angular/core';
import { Metrica } from '../models/metrica';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

const base_url = environment.base

@Injectable({
  providedIn: 'root'
})


export class MetricasService {

  private url = `${base_url}/metricas`
  constructor(private http: HttpClient) { }
    list() {
    return this.http.get<Metrica[]>(this.url)
  }
}
