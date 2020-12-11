// src/app/shared/models/user.model.ts

import {Habito} from "./habito.model";
import {Deserializable} from "./deserializable.model";

export class User implements Deserializable {
  id: number;
  name: string;
 schema_version: number
 mail: string;
password: string;
habitos: Habito[];
numero_de_horas_totales: Date = new Date();
tareas_cumplidas: number;
dias_seguidos: number;

  deserialize(input: any) {
    Object.assign(this, input);
   this.habito = new Habito().deserialize(input.habito);
    return this;
  }

}

