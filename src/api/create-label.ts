const axios = require('axios');
axios.defaults.validateStatus = () => true;
import { parseStringPromise, Builder } from 'xml2js';
import { ExternalServerError, UnauthorizedError } from '@shipengine/connect-runtime';
import { ServiceCode, CODType, LabelType, PackageCode } from './models';
import { BASE_URL } from './constants';

export interface Address {
  Name: string;
  Addr1: string;
  Addr2?: string;
  Addr3?: string;
  City: string;
  State: string;
  Zip: string;
  Contact?: string;
  Phone: string;
}

interface Dimensions {
  Length: number;
  Width: number;
  Height: number;
}

interface Shipment {
  Shipment: {
    UID: string;
    shipper: Address;
    consignee: Address;
    Service: ServiceCode;
    SignatureRequired: boolean;
    Residential: boolean;
    SaturdayDel: boolean;
    Declared?: number;
    COD?: number;
    CODType: CODType;
    Weight: number;
    BillTo?: number;
    Instructions?: string;
    Reference?: string;
    Reference2?: string;
    Reference3?: string;
    Tracking?: string;
    DIM?: Dimensions;
    LabelType?: LabelType;
    ShipEmail?: string;
    DelEmail?: string;
    Letter?: PackageCode;
    ShipDate: String;
  };
}

export interface OnTracShipmentRequest {
  OnTracShipmentRequest: {
    Shipments: Shipment[];
  };
}

export interface ResponseShipment {
  UID: string;
  Error: string;
  TransitDays: number;
  TrackingNumber: string;
  ExpectedDeliveryDate: string;
  CommitTime: string;
  ServiceChrg: number;
  ServiceChargeDetails: {
    BaseCharge: number;
    CODCharge: number;
    DeclaredCharge: number;
    AdditionalCharges: number;
    SaturdayCharge: number;
  };
  FuelChrg: number;
  TotalChrg: number;
  TarrifChrg: number;
  Label: string;
  SortCode: string;
  RateZone: number;
}

export interface OnTrackShipmentResponse {
  Error?: string;
  Shipments: ResponseShipment[];
}

export interface CreateShipmentRequest {
  accountNumber: string;
  password: string;
  request: OnTracShipmentRequest;
}

const normalizeData = (data: any) => {
  const shipments = JSON.parse(
    JSON.stringify(data?.OnTracShipmentResponse?.Shipments?.Shipment || [])
  );
  if (Array.isArray(shipments)) {
    data.OnTracShipmentResponse.Shipments = shipments.filter((item) => item);
  } else {
    data.OnTracShipmentResponse.Shipments = [shipments];
  }
  return data;
};

const mapShipments = (shipment): ResponseShipment => {
  return {
    UID: shipment?.UID,
    TrackingNumber: shipment?.Tracking,
    Error: shipment?.Error,
    TransitDays: Number(shipment?.TransitDays),
    ExpectedDeliveryDate: shipment?.ExpectedDeliveryDate,
    CommitTime: shipment?.CommitTime,
    ServiceChrg: Number(shipment?.ServiceChrg),
    ServiceChargeDetails: {
      BaseCharge: Number(shipment?.ServiceChargeDetails?.BaseCharge),
      CODCharge: Number(shipment?.ServiceChargeDetails?.CODCharge),
      DeclaredCharge: Number(shipment?.ServiceChargeDetails?.DeclaredCharge),
      AdditionalCharges: Number(
        shipment?.ServiceChargeDetails?.AdditionalCharges
      ),
      SaturdayCharge: Number(shipment?.ServiceChargeDetails?.SaturdayCharge),
    },
    FuelChrg: Number(shipment?.FuelChrg),
    TotalChrg: Number(shipment?.TotalChrg),
    TarrifChrg: Number(shipment?.TarrifChrg),
    Label: shipment?.Label,
    SortCode: shipment?.SortCode,
    RateZone: Number(shipment?.RateZone),
  };
};

const mapParsedXmlToResponse = (data: any): OnTrackShipmentResponse => {
  return {
    Error: data.OnTracShipmentResponse?.Error,
    Shipments: data.OnTracShipmentResponse?.Shipments.map(mapShipments),
  };
};

const validateRootErrors = (rootError?: string, shipmentError?: string) => {
  if (rootError && rootError !== "") {
    if(rootError.includes('Password')) {
      throw new UnauthorizedError(rootError);
    } else {
      throw new ExternalServerError(rootError);
    }
  }
  if (shipmentError && shipmentError !== "") {
    throw new ExternalServerError(shipmentError);
  }
}

export const createLabel = async (
  request: CreateShipmentRequest
): Promise<OnTrackShipmentResponse> => {

  // const url = `${BASE_URL}/${
  //   request.accountNumber
  // }/shipments?pw=${request.password}`;

  const url= `${BASE_URL}/shipments`;
  const requestXml = new Builder().buildObject(request.request);

  console.log(url, '00000000000000000')

  const response = await axios.post(url, requestXml);
  if (response.status !== 200) {
    throw new ExternalServerError('There was an error connecting to Shipglobal', {
      externalHttpStatusCode: response.status,
      externalContext: JSON.stringify(response.data)
    });
  }
  const data = await parseStringPromise(response.data, {
    explicitArray: false,
  });
  validateRootErrors(data.OnTracShipmentResponse?.Shipments?.Error, data.OnTracShipmentResponse?.Shipments?.Shipment?.Error);
  const normalizedData = normalizeData(data);
  const mappedResponse = mapParsedXmlToResponse(normalizedData);
  return mappedResponse;
};
