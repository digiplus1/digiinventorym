import {Immobilisation} from "./Immobilisation";

export class Inventaire {
  id:number;
  etat:string;
  inventaire:number;
  referenceInventaire:string;
  quantite:number;
  immobilisation:Immobilisation;
}
