// import { Package, OntracRatesResponse } from "./models";
// const axios = require("axios");
// axios.defaults.validateStatus = () => true;
// import { parseStringPromise } from "xml2js";
// import {
//   ExternalServerError,
//   UnauthorizedError,
// } from "@shipengine/connect-runtime";
// import { BASE_URL } from "./constants";



// // const getRatesUrl = (request: OntracRatesRequest): string =>
// //   `${BASE_URL}/${request.accountNumber}/rates?` +
// //   `pw=${request.password}` +
// //   `&packages=${request.packages.map((p) => p.getQueryString()).join(",")}`;
  

// const getRatesUrl = (request: OntracRatesRequest): string => `${BASE_URL}/ratesxml`;


// export class OntracRatesRequest {
//   accountNumber: string;
//   password: string;
//   transactionId: string;
//   packages: Package[];
//   constructor(
//     accountNumber: string,
//     password: string,
//     transactionId: string,
//     packages: Package[]
//   ) {
//     this.accountNumber = accountNumber || "";
//     this.password = password || "";
//     this.transactionId = transactionId || "";
//     this.packages = packages;
//   }
// }

// const mapParsedXmlToResponse = (data: any): OntracRatesResponse => {
//   const response: OntracRatesResponse = {
//     Shipments: data.OnTracRateResponse?.Shipments
//       ? data.OnTracRateResponse?.Shipments.map((item) => {
//           const shipment = item.Shipment;
//           return {
//             Rates: shipment?.Rates?.map((rateItem) => {
//               const rate = rateItem.Rate;
//               return {
//                 Service: rate.Service,
//                 ServiceCharge: Number(rate.ServiceCharge),
//                 ServiceChargeDetails: {
//                   BaseCharge: Number(rate.ServiceChargeDetails?.BaseCharge),
//                   CODCharge: Number(rate.ServiceChargeDetails?.CODCharge),
//                   DeclaredCharge: Number(
//                     rate.ServiceChargeDetails?.DeclaredCharge
//                   ),
//                   AdditionalCharges: Number(
//                     rate.ServiceChargeDetails?.AdditionalCharges
//                   ),
//                   SaturdayCharge: Number(
//                     rate.ServiceChargeDetails?.SaturdayCharge
//                   ),
//                 },
//                 FuelCharge: Number(rate.FuelCharge),
//                 TotalCharge: Number(rate.TotalCharge),
//                 BilledWeight: Number(rate.BilledWeight),
//                 TransitDays: Number(rate.TransitDays),
//                 ExpectedDeliveryDate: rate.ExpectedDeliveryDate,
//                 CommitTime: rate.CommitTime,
//                 RateZone: rate.RateZone,
//                 GlobalRate: Number(rate.GlobalRate),
//               };
//             }),
//             UID: shipment?.UID,
//             Delzip: shipment?.Delzip,
//             PUZip: shipment?.PUZip,
//             Declared: Number(shipment?.Declared),
//             Residential: Boolean(shipment?.Residential),
//             COD: Number(shipment?.Residential),
//             SaturdayDel: Boolean(shipment?.SaturdayDel),
//             Weight: Number(shipment?.Weight),
//             DIM: {
//               Length: Number(shipment?.DIM?.Length),
//               Width: Number(shipment?.DIM?.Width),
//               Height: Number(shipment?.DIM?.Height),
//             },
//             Error: shipment?.Error,
//           };
//         })
//       : [],
//     Error: data.OnTracRateResponse?.Error,
//   };
//   return response;
// };

// const normalizeData = (data) => {
//   if (!Array.isArray(data?.OnTracRateResponse?.Shipments)) {
//     const shipment = JSON.parse(
//       JSON.stringify(data?.OnTracRateResponse?.Shipments || [])
//     );
//     data.OnTracRateResponse.Shipments = [shipment].filter((item) => item);
//   }

//   data.OnTracRateResponse.Shipments.forEach((item) => {
//     if (item.Shipment && !Array.isArray(item.Shipment.Rates)) {
//       const rate = JSON.parse(JSON.stringify(item.Shipment.Rates || false));
//       item.Shipment.Rates = [rate].filter((item) => item);
//     }
//   });

//   return data;
// };

// const validateRootErrors = (rootError?: string, shipmentError?: string) => {
//   if (rootError && rootError !== "") {
//     if (rootError.includes("Password")) {
//       throw new UnauthorizedError(rootError);
//     } else {
//       throw new ExternalServerError(rootError);
//     }
//   }
//   if (shipmentError && shipmentError !== "") {
//     throw new ExternalServerError(shipmentError);
//   }
// };

// export const getRates = async (
//   request: OntracRatesRequest
// ): Promise<OntracRatesResponse> => {
//   const rateRequestUrl = getRatesUrl(request);
// // console.log(JSON.stringify(rateRequestUrl), '444444444444444')
//   const response = await axios.post(rateRequestUrl);
//   console.log(JSON.stringify(response.data), '0000000000000000000000000000000000000');
//   if (response.status !== 200) {
//     throw new ExternalServerError("There was an error connecting to OnTrac", {
//       externalContext: JSON.stringify(response.data),
//       externalHttpStatusCode: response.status,
//     });
//   }



//   const data = await parseStringPromise(response.data, {
//     explicitArray: false,
//   });

//    console.log(data, '7777777777777777777777777777777777777777')

//   validateRootErrors(
//     data.OnTracRateResponse?.Shipments?.Error,
//     data.OnTracRateResponse?.Shipments?.Shipment?.Error
//   );
//   const normalizedData = normalizeData(data);
//   const mappedResponse = mapParsedXmlToResponse(normalizedData);
//   return mappedResponse;
// };


import { Package, OntracRatesResponse } from "./models";
const axios = require("axios");
axios.defaults.validateStatus = () => true;
import { parseStringPromise } from "xml2js";
import {
  ExternalServerError,
  UnauthorizedError,
} from "@shipengine/connect-runtime";
import { BASE_URL } from "./constants";

export class OntracRatesRequest {
  accountNumber: string;
  password: string;
  transactionId: string;
  packages: Package[];

  shipperZipcode: string;
  receiverZipcode: string;
  receiverCountry: string;
  shipperCountry: string;
  weight: number;
  dims: any;

  constructor(
    accountNumber: string,
    password: string,
    transactionId: string,
    packages: Package[]
  ) {
    this.accountNumber = accountNumber || "";
    this.password = password || "";
    this.transactionId = transactionId || "";
    this.packages = packages;

    const pkg = packages[0];

    this.shipperZipcode = pkg.PUZip;
    this.receiverZipcode = pkg.DelZip;
    this.receiverCountry = pkg.ReceiverCountry;
    this.shipperCountry = pkg.ShipperCountry;
    this.weight = pkg.Weight;
    this.dims = {
      Length: pkg.Length,
      Width: pkg.Width,
      Height: pkg.Height,
    };
  }
}

const getRatesUrl = () => `${BASE_URL}/ratesxml`;

const buildRateXML = (req: OntracRatesRequest) => {
  return `<?xml version="1.0"?>
<ShipGlobalCourier>
  <Requestor>
    <AccountNumber>${req.accountNumber}</AccountNumber>
    <ShipperZipcode>${req.shipperZipcode}</ShipperZipcode>
    <ReceiverZipcode>${req.receiverZipcode}</ReceiverZipcode>
    <ReceiverCountry>${req.receiverCountry}</ReceiverCountry>
    <ShipperCountry>${req.shipperCountry}</ShipperCountry>
    <Dims>
      <Length>${req.dims.Length}</Length>
      <Width>${req.dims.Width}</Width>
      <Height>${req.dims.Height}</Height>
    </Dims>
    <Weight>${req.weight}</Weight>
  </Requestor>
</ShipGlobalCourier>`;
};

// Extract charges from XML JSON
const mapParsedXmlToResponse = (data: any): any => {
  const charges =
    data?.ShipGlobalCourier?.Rates?.Results?.Charges || [];

  return {
    Charges: Array.isArray(charges) ? charges : [charges],
  };
};

export const getRates = async (
  request: OntracRatesRequest
): Promise<OntracRatesResponse> => {
  const url = getRatesUrl();
  const xmlBody = buildRateXML(request);

  console.log("REQUEST XML:", xmlBody);

  const response = await axios.post(url, xmlBody, {
    headers: { "Content-Type": "application/xml" },
  });

  console.log("RAW XML RESPONSE:", response.data);

  if (response.status !== 200) {
    throw new ExternalServerError("Error contacting ShipGlobal", {
      externalContext: JSON.stringify(response.data),
      externalHttpStatusCode: response.status,
    });
  }

  const parsed = await parseStringPromise(response.data, { explicitArray: false });

  console.log("PARSED XML:", parsed);

  return mapParsedXmlToResponse(parsed);
};
