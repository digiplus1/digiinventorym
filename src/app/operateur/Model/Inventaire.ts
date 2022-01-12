import {Immobilisation} from "./Immobilisation";

export class Inventaire {
  id:number;
  etat:string;
  inventaire:number;
  referenceInventaire:string;
  description:string;
  quantite_inventorier:number;
  immobilisation:Immobilisation;
}
