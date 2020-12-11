// src/app/shared/models/habito.model.ts

import {Evento} from "./evento.model";
import {Deserializable} from "./deserializable.model";

export class Habito implements Deserializable {
    id: number;
        nombre: string;
        evento: Evento[];
    total_horas_dedicadas_al_habito: Date = new Date();
    tareas_cumplidas del habito: number;
    dias_seguidos_de_racha: number;

  deserialize(input: any) {
    Object.assign(this, input);
   this.evento = new Evento().deserialize(input.evento);
    return this;
  }

}

