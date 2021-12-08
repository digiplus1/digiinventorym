export class User {
  id!: number;
  nom!: string;
  contact!: string;
  email!: string;
  password!: string;
  is_active!: boolean;
  photo!: string;
  type_utilisateur!: string;
  matricule!: string;
  nomentreprise:string;
  uniteentreprise:string
  is_responsable!: boolean;
  nomPartenaire!: string;
  expires_datetime_token!: Date;
  token!: string;
  permissions!: string[];
  admin: boolean = false;
  confirm_password!: string;
  referencesession:string;
  superviseur:string;
  responsableunite:string;
  contactsuperviseur:string;
}
