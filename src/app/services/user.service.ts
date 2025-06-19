import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { User } from '../models/user';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
const base_url=environment.base;
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = `${base_url}/usuarios`;
  private listaCambio = new Subject<User[]>();
  constructor(private http: HttpClient) {}
  list() {
    return this.http.get<User[]>(this.url);
  }

  insert(u: User) {
    return this.http.post(this.url, u);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  setList(listaNueva: User[]) {
    this.listaCambio.next(listaNueva);
  }
  listId(id:number){
    return this.http.get<User>(`${this.url}/${id}`)
  }
  update(u:User){
    return this.http.put(this.url , u)
  }
  deleteU(id:number){
    return this.http.delete(`${this.url}/${id}`)
  }
  searchUser(usert:string){
    const params={username:usert}
    return this.http.get<User[]>(`${this.url}/busquedas`,{params})
  }
}
