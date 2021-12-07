export class AddressIp {
  static host: string = "https://digiinventory-backend.herokuapp.com/immoapi/";
  constructor(hostname: string) {
    AddressIp.host = hostname;
  }
}
