import { Temaforo } from "./temaforo"

export class Respuesta{
    idRespuesta:number=0
    respuesta:string=""
    fechaRespuesta: Date=new Date()
    temaForo:Temaforo=new Temaforo()
}