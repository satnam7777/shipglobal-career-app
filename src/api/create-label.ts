// const axios = require('axios');
// axios.defaults.validateStatus = () => true;
// import { parseStringPromise, Builder } from 'xml2js';
// import { ExternalServerError, UnauthorizedError } from '@shipengine/connect-runtime';
// import { ServiceCode, CODType, LabelType, PackageCode } from './models';
// import { BASE_URL } from './constants';

// export interface Address {
//   Name: string;
//   Addr1: string;
//   Addr2?: string;
//   Addr3?: string;
//   City: string;
//   State: string;
//   Zip: string;
//   Contact?: string;
//   Phone: string;
// }

// interface Dimensions {
//   Length: number;
//   Width: number;
//   Height: number;
// }

// interface Shipment {
//   Shipment: {
//     UID: string;
//     shipper: Address;
//     consignee: Address;
//     Service: ServiceCode;
//     SignatureRequired: boolean;
//     Residential: boolean;
//     SaturdayDel: boolean;
//     Declared?: number;
//     COD?: number;
//     CODType: CODType;
//     Weight: number;
//     BillTo?: number;
//     Instructions?: string;
//     Reference?: string;
//     Reference2?: string;
//     Reference3?: string;
//     Tracking?: string;
//     DIM?: Dimensions;
//     LabelType?: LabelType;
//     ShipEmail?: string;
//     DelEmail?: string;
//     Letter?: PackageCode;
//     ShipDate: String;
//   };
// }

// export interface OnTracShipmentRequest {
//   OnTracShipmentRequest: {
//     Shipments: Shipment[];
//   };
// }

// export interface ResponseShipment {
//   UID: string;
//   Error: string;
//   TransitDays: number;
//   TrackingNumber: string;
//   ExpectedDeliveryDate: string;
//   CommitTime: string;
//   ServiceChrg: number;
//   ServiceChargeDetails: {
//     BaseCharge: number;
//     CODCharge: number;
//     DeclaredCharge: number;
//     AdditionalCharges: number;
//     SaturdayCharge: number;
//   };
//   FuelChrg: number;
//   TotalChrg: number;
//   TarrifChrg: number;
//   Label: string;
//   SortCode: string;
//   RateZone: number;
// }

// export interface OnTrackShipmentResponse {
//   Error?: string;
//   Shipments: ResponseShipment[];
// }

// export interface CreateShipmentRequest {
//   accountNumber: string;
//   password: string;
//   request: OnTracShipmentRequest;
// }

// const normalizeData = (data: any) => {
//   const shipments = JSON.parse(
//     JSON.stringify(data?.OnTracShipmentResponse?.Shipments?.Shipment || [])
//   );
//   if (Array.isArray(shipments)) {
//     data.OnTracShipmentResponse.Shipments = shipments.filter((item) => item);
//   } else {
//     data.OnTracShipmentResponse.Shipments = [shipments];
//   }
//   return data;
// };

// const mapShipments = (shipment): ResponseShipment => {
//   return {
//     UID: shipment?.UID,
//     TrackingNumber: shipment?.Tracking,
//     Error: shipment?.Error,
//     TransitDays: Number(shipment?.TransitDays),
//     ExpectedDeliveryDate: shipment?.ExpectedDeliveryDate,
//     CommitTime: shipment?.CommitTime,
//     ServiceChrg: Number(shipment?.ServiceChrg),
//     ServiceChargeDetails: {
//       BaseCharge: Number(shipment?.ServiceChargeDetails?.BaseCharge),
//       CODCharge: Number(shipment?.ServiceChargeDetails?.CODCharge),
//       DeclaredCharge: Number(shipment?.ServiceChargeDetails?.DeclaredCharge),
//       AdditionalCharges: Number(
//         shipment?.ServiceChargeDetails?.AdditionalCharges
//       ),
//       SaturdayCharge: Number(shipment?.ServiceChargeDetails?.SaturdayCharge),
//     },
//     FuelChrg: Number(shipment?.FuelChrg),
//     TotalChrg: Number(shipment?.TotalChrg),
//     TarrifChrg: Number(shipment?.TarrifChrg),
//     Label: shipment?.Label,
//     SortCode: shipment?.SortCode,
//     RateZone: Number(shipment?.RateZone),
//   };
// };

// const mapParsedXmlToResponse = (data: any): OnTrackShipmentResponse => {
//   return {
//     Error: data.OnTracShipmentResponse?.Error,
//     Shipments: data.OnTracShipmentResponse?.Shipments.map(mapShipments),
//   };
// };

// const validateRootErrors = (rootError?: string, shipmentError?: string) => {
//   if (rootError && rootError !== "") {
//     if(rootError.includes('Password')) {
//       throw new UnauthorizedError(rootError);
//     } else {
//       throw new ExternalServerError(rootError);
//     }
//   }
//   if (shipmentError && shipmentError !== "") {
//     throw new ExternalServerError(shipmentError);
//   }
// }

// export const createLabel = async (
//   request: CreateShipmentRequest
// ): Promise<OnTrackShipmentResponse> => {

//   // const url = `${BASE_URL}/${
//   //   request.accountNumber
//   // }/shipments?pw=${request.password}`;

//   const url= `${BASE_URL}/testshipmentprocess`;
//   const requestXml = new Builder().buildObject(request.request);

//   const response = await axios.post(url, requestXml);
//   console.log(response.data, 'response 00000000000000');
//   if (response.status !== 200) {
//     throw new ExternalServerError('There was an error connecting to Shipglobal', {
//       externalHttpStatusCode: response.status,
//       externalContext: JSON.stringify(response.data)
//     });
//   }
//   const data = await parseStringPromise(response.data, {
//     explicitArray: false,
//   });
//   validateRootErrors(data.OnTracShipmentResponse?.Shipments?.Error, data.OnTracShipmentResponse?.Shipments?.Shipment?.Error);
//   const normalizedData = normalizeData(data);
//   const mappedResponse = mapParsedXmlToResponse(normalizedData);
//   return mappedResponse;
// };



import axios from "axios";
import { parseStringPromise } from "xml2js";
import { ExternalServerError } from "@shipengine/connect-runtime";
import { BASE_URL } from "./constants";

axios.defaults.validateStatus = () => true;

const buildXML = (req: any): string => {
  const r = req.FFUSACourier;
  const s = r.Shipments.Shipment;

  return `<?xml version='1.0'?>
<FFUSACourier action='Request' version='1.0'>
  <Requestor>
    <Username>${r.Requestor.Username}</Username>
    <Password>${r.Requestor.Password}</Password>
    <SecurityKey>${r.Requestor.SecurityKey}</SecurityKey>
    <AuthorizeCode>${r.Requestor.AuthorizeCode}</AuthorizeCode>
    <AccountNumber>${r.Requestor.AccountNumber}</AccountNumber>
  </Requestor>

  <Shipments>
    <Shipment>
      <Details>
        <Date>${s.Details.Date}</Date>
        <ServiceType>${s.Details.ServiceType}</ServiceType>
        <ServiceCode>${s.Details.ServiceCode}</ServiceCode>
        <CustomerReference>${s.Details.CustomerReference}</CustomerReference>
        <ShipmentReference>${s.Details.ShipmentReference}</ShipmentReference>
      </Details>

      <Billing>
        <ChargesBillToAccountNumber>${s.Billing.ChargesBillToAccountNumber}</ChargesBillToAccountNumber>
        <ChargesBillToType>${s.Billing.ChargesBillToType}</ChargesBillToType>
        <DutiesBillToAccountNumber>${s.Billing.DutiesBillToAccountNumber}</DutiesBillToAccountNumber>
        <DutiesBillToType>${s.Billing.DutiesBillToType}</DutiesBillToType>
      </Billing>

      <Shipper>
        <CompanyName>${s.Shipper.CompanyName}</CompanyName>
        <ContactName>${s.Shipper.ContactName}</ContactName>
        <Address1>${s.Shipper.Address1}</Address1>
        <Address2>${s.Shipper.Address2}</Address2>
        <City>${s.Shipper.City}</City>
        <StateProvince>${s.Shipper.StateProvince}</StateProvince>
        <ZipPostal>${s.Shipper.ZipPostal}</ZipPostal>
        <Country>${s.Shipper.Country}</Country>
        <Phone>${s.Shipper.Phone}</Phone>
        <Email>${s.Shipper.Email}</Email>
        <Reference>${s.Shipper.Reference}</Reference>
      </Shipper>

      <Receiver>
        <CompanyName>${s.Receiver.CompanyName}</CompanyName>
        <ContactName>${s.Receiver.ContactName}</ContactName>
        <Address1>${s.Receiver.Address1}</Address1>
        <Address2>${s.Receiver.Address2}</Address2>
        <City>${s.Receiver.City}</City>
        <StateProvince>${s.Receiver.StateProvince}</StateProvince>
        <ZipPostal>${s.Receiver.ZipPostal}</ZipPostal>
        <Country>${s.Receiver.Country}</Country>
        <Phone>${s.Receiver.Phone}</Phone>
        <Email>${s.Receiver.Email}</Email>
        <Reference>${s.Receiver.Reference}</Reference>
      </Receiver>

      <Packages>
        <NumberOfPackages>${s.Packages.NumberOfPackages}</NumberOfPackages>
        <Package>
          <SequenceNumber>${s.Packages.Package.SequenceNumber}</SequenceNumber>
          <PackageType>${s.Packages.Package.PackageType}</PackageType>
          <Weight>${s.Packages.Package.Weight}</Weight>
          <WeightType>${s.Packages.Package.WeightType}</WeightType>
          <Length>${s.Packages.Package.Length}</Length>
          <Width>${s.Packages.Package.Width}</Width>
          <Height>${s.Packages.Package.Height}</Height>
          <DimUnit>${s.Packages.Package.DimUnit}</DimUnit>
          <CustomsValue>${s.Packages.Package.CustomsValue}</CustomsValue>
          <Currency>${s.Packages.Package.Currency}</Currency>
          <Content>${s.Packages.Package.Content}</Content>
        </Package>
      </Packages>

      <LabelType>${s.LabelType}</LabelType>
      <CommercialInvoice>${s.CommercialInvoice}</CommercialInvoice>
    </Shipment>
  </Shipments>
</FFUSACourier>`;
};

export const createLabel = async (request: any): Promise<any> => {
  const url = `${BASE_URL}/testshipmentprocess`;
  const xmlBody = buildXML(request);

  console.log(xmlBody, "xml body to shipglobal 0000000000000");

  const response = await axios.post(url, xmlBody, {
    headers: { "Content-Type": "application/xml" },
  });

  console.log(response.data, "response data from shipglobal 0000000000000");

  if (response.status !== 200) {
    throw new ExternalServerError("ShipGlobal API Error", {
      externalContext: JSON.stringify(response.data),
      externalHttpStatusCode: response.status,
    });
  }

  const parsed = await parseStringPromise(response.data, {
    explicitArray: false,
  });

  return parsed;
};
