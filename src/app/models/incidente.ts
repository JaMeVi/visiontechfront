import { Ruta } from "./ruta"

export class Incidente{
    idIncidente:number=0
    tipo:string=""
    gravedad:string=""
    descripcion:string=""
    ruta:Ruta=new Ruta()
}