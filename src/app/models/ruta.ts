import{User}from './user'
export class Ruta{
    idRuta:number=0
    nombreRuta:string=""
    destino:string=""
    inicio:string=""
    favorito:boolean=false
    distanciaMetros:number=0
    tiempoRuta:number=0
    usuario:User=new User()

}