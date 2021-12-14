export class Inventairesoumision{
  referenceInventaire:string;
  referenceimmobilisation:string;
  quantite:number=0;
  commentaire:string;
  longitude:number;
  lattitude:number;
  annuler:boolean;//cett permet d'annuler une immo
  is_approuver:boolean; //let chef unité valide l'inventaire
  is_valid:boolean;//true lorsque la requete de l'operateur est bonne
  is_active:boolean;//
}
