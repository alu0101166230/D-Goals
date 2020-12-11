// src/app/shared/models/horario.model.ts

import {Deserializable} from "./deserializable.model";

export class Horario implements Deserializable {
   fecha Date = new Date();
   dia_de_repetecion: Array <string>;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }

}

