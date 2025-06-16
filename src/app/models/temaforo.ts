import{User}from './user'
export class Temaforo{
    idTema:number=0;
    tituloTema:string="";
    comentario:string="";
    fechaCreacion:Date=new Date();
    estadoCerrado:boolean=false;
    usuario:User=new User()
}