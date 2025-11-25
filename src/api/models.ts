export enum ServiceCode {
  All = "",
  Sunrise = "S",
  SunriseGold = "G",
  PalletizedFreight = "H",
  Ground = "C",
  SameDay = "DC",
}

export enum PackageCode {
  Letter = "1",
  Package = "0",
}

export enum CODType {
  None = "NONE",
  Unsecured = "UNSECURED",
  Secured = "SECURED",
}

export enum LabelType {
  None = 0,
  PDF = 1,
  CROPPED_PDF = 13,
  ZPL = 9,
  EPL = 11,
}

// export class Package {
//   uid: string;
//   shipFromZip: string;
//   shipToZip: string;
//   residential: boolean;
//   cashOnDelivery: number;
//   saturdayDelivery: boolean;
//   declaredValue: number;
//   weight: number;
//   length: number;
//   width: number;
//   height: number;
//   serviceCode: ServiceCode;
//   packageCode: PackageCode;
//   signatureRequired?: boolean;
//   shipDate?: Date;
//   PUZip: string;
//   DelZip: string;
//   ReceiverCountry: string;
//   ShipperCountry: string;
//   Weight: number;
//   Length: number;
//   Width: number;
//   Height: number;

//   constructor(
//     uid: string,
//     shipFromZip: string,
//     shipToZip: string,
//     residential: boolean,
//     cashOnDelivery: number,
//     saturdayDelivery: boolean,
//     declaredValue: number,
//     weight: number,
//     length: number,
//     width: number,
//     height: number,
//     serviceCode: ServiceCode,
//     packageCode: PackageCode
//   ) {
//     this.uid = uid;
//     this.shipFromZip = shipFromZip;
//     this.shipToZip = shipToZip;
//     this.residential = residential;
//     this.cashOnDelivery = cashOnDelivery;
//     this.saturdayDelivery = saturdayDelivery;
//     this.declaredValue = declaredValue;
//     this.weight = weight;
//     this.length = length;
//     this.width = width;
//     this.height = height;
//     this.serviceCode = serviceCode;
//     this.packageCode = packageCode;
//   }

//   getQueryString(): string {
//     let queryString =
//       `${this.uid || ""};` +
//       `${this.shipFromZip || ""};` +
//       `${this.shipToZip || ""};` +
//       `${this.residential || false};` +
//       `${this.cashOnDelivery.toFixed(2) || ""};` +
//       `${this.saturdayDelivery || false};` +
//       `${this.declaredValue.toFixed(2) || ""};` +
//       `${this.weight.toFixed(2) || ""};` +
//       `${this.length.toFixed(2) || ""}X${this.width.toFixed(2) || ""}X${
//         this.height.toFixed(2) || ""
//       };` +
//       `${this.serviceCode || ""};` +
//       `${this.packageCode || ""};`;
//     return queryString;
//   }
// }

export class Package {
  uid: string;
  shipFromZip: string;
  shipToZip: string;
  residential: boolean;
  cashOnDelivery: number;
  saturdayDelivery: boolean;
  declaredValue: number;
  weight: number;
  length: number;
  width: number;
  height: number;
  serviceCode: ServiceCode;
  packageCode: PackageCode;
  signatureRequired?: boolean;
  shipDate?: Date;

  // 📦 ShipGlobal Required Fields (added)
  PUZip: string;
  DelZip: string;
  ReceiverCountry: string;
  ShipperCountry: string;
  Weight: number;
  Length: number;
  Width: number;
  Height: number;

  constructor(
    uid: string,
    shipFromZip: string,
    shipToZip: string,
    residential: boolean,
    cashOnDelivery: number,
    saturdayDelivery: boolean,
    declaredValue: number,
    weight: number,
    length: number,
    width: number,
    height: number,
    serviceCode: ServiceCode,
    packageCode: PackageCode,

    // ⭐ Add new constructor params (optional — if you pass manually)
    PUZip?: string,
    DelZip?: string,
    ReceiverCountry?: string,
    ShipperCountry?: string,
    Weight?: number,
    Length?: number,
    Width?: number,
    Height?: number
  ) {
    // Your original properties
    this.uid = uid;
    this.shipFromZip = shipFromZip;
    this.shipToZip = shipToZip;
    this.residential = residential;
    this.cashOnDelivery = cashOnDelivery;
    this.saturdayDelivery = saturdayDelivery;
    this.declaredValue = declaredValue;
    this.weight = weight;
    this.length = length;
    this.width = width;
    this.height = height;
    this.serviceCode = serviceCode;
    this.packageCode = packageCode;

    // ⭐ ShipGlobal fields mapping (auto-fill defaults if not provided)
    this.PUZip = PUZip || shipFromZip;
    this.DelZip = DelZip || shipToZip;
    this.ReceiverCountry = ReceiverCountry || "";
    this.ShipperCountry = ShipperCountry || "";
    this.Weight = Weight || weight;
    this.Length = Length || length;
    this.Width = Width || width;
    this.Height = Height || height;
  }

  getQueryString(): string {
    let queryString =
      `${this.uid || ""};` +
      `${this.shipFromZip || ""};` +
      `${this.shipToZip || ""};` +
      `${this.residential || false};` +
      `${this.cashOnDelivery.toFixed(2) || ""};` +
      `${this.saturdayDelivery || false};` +
      `${this.declaredValue.toFixed(2) || ""};` +
      `${this.weight.toFixed(2) || ""};` +
      `${this.length.toFixed(2) || ""}X${this.width.toFixed(2) || ""}X${
        this.height.toFixed(2) || ""
      };` +
      `${this.serviceCode || ""};` +
      `${this.packageCode || ""};`;
    return queryString;
  }
}


export class ServiceChargeDetails {
  BaseCharge: number;
  CODCharge: number;
  DeclaredCharge: number;
  AdditionalCharges: number;
  SaturdayCharge: number;
}

export class Rate {
  Service: ServiceCode;
  ServiceCharge: number;
  ServiceChargeDetails: ServiceChargeDetails;
  FuelCharge: number;
  TotalCharge: number;
  BilledWeight: number;
  TransitDays: number;
  ExpectedDeliveryDate: string;
  RateZone: string;
  GlobalRate: string;
}

export class Dimensions {
  Length: number;
  Width: number;
  Height: number;
}

export class Shipment {
  Rates: Rate[];
  UID: string;
  Delzip: string;
  PUZip: string;
  Declared: number;
  Residential: boolean;
  COD: number;
  SaturdayDel: boolean;
  Weight: number;
  DIM: Dimensions;
  Error: string;
}

export class OntracRatesResponse {
  Shipments: Shipment[];
  Error?: string;
}

export interface OntracTrackingResponse {
  Shipments: TrackingShipment[];
  Note: string;
  Error: string;
}

export interface TrackingResult {
  Code: string;
  Desc: string;
}

export interface TrackingShipment {
  TrackingNbr: string;
  Events: TrackingEvent[];
  Tracking: string;
  Exp_Del_Date: string;
  ShipDate: string;
  Delivered: boolean;
  Name: string;
  Contact: string;
  Addr1: string;
  Addr2: string;
  Addr3: string;
  City: string;
  State: string;
  Zip: string;
  Service: ServiceCode;
  POD: string;
  Error: string;
  Reference: string;
  Reference2: string;
  Reference3: string;
  ServiceCharge: number;
  FuelCharge: number;
  TotalChrg: number;
  Residential: boolean;
  Weight: string;
  Signature: string;
  Result?: TrackingResult;
}

export interface TrackingEvent {
  Status: string;
  Description: string;
  EventTime: string;
  Facility: string;
  City: string;
  State: string;
  Zip: string;
}
