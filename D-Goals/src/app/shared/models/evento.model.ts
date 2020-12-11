// src/app/shared/models/evento.model.ts

import {Horario} from "./horario.model";
import {Deserializable} from "./deserializable.model";

export class Evento implements Deserializable{
              horario : Horario[];
              estado: string;
              hora_inicio: Date = new Date();
           hora_final: Date = new Date();

deserialize(input: any) {
    Object.assign(this, input);
   this.horario = new Horario().deserialize(input.horario);
    return this;
  }

}

