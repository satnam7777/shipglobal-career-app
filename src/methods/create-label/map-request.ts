// import { CreateLabelRequest } from "@shipengine/connect-carrier-api";
// import {
//   AddressResidentialIndicator,
//   ConfirmationTypes,
//   DocumentFormat,
//   ShipFrom,
//   ShipTo,
// } from "@shipengine/connect-carrier-api/lib/models";
// import { BadRequestError } from "@shipengine/connect-runtime";
// import {
//   Address,
//   CODType,
//   CreateShipmentRequest,
//   LabelType,
//   OnTracShipmentRequest,
//   ServiceCode,
// } from "../../api";
// import { RegistrationData } from "../../definitions/forms";
// import { ouncesToPounds, toFixedNumber } from "../shared";
// const moment = require("moment");

// const mapAddress = (address: ShipFrom | ShipTo): Address => {
//   return {
//     Name: address?.company_name || address?.name || "",
//     Contact: address?.company_name || address?.name || "",
//     Addr1: address?.address_lines[0] || "",
//     City: address?.city_locality || "",
//     State: address?.state_province || "",
//     Zip: address?.postal_code?.substr(0, 5) || "",
//     Phone: address?.phone_number || "",
//   };
// };

// const mapLabelFormat = (format: DocumentFormat): LabelType => {
//   switch (format) {
//     case DocumentFormat.Pdf:
//       return LabelType.CROPPED_PDF;
//     case DocumentFormat.Zpl:
//       return LabelType.ZPL;
//     default:
//       throw new BadRequestError('Ontrac only supports PDF and ZPL label formats.');
//   }
// };

// const mapOnTracShipmentRequest = (
//   request: CreateLabelRequest
// ): OnTracShipmentRequest => {
//   const { accountnumber } = request.metadata as RegistrationData;
//   const pckg = request.packages[0];
//   return {
//     OnTracShipmentRequest: {
//       Shipments: [
//         {
//           Shipment: {
//             UID: request.transaction_id || "",
//             Service: request.service_code as ServiceCode,
//             shipper: mapAddress(request.ship_from),
//             consignee: mapAddress(request.ship_to),
//             DelEmail: "",
//             Tracking: "",
//             COD: 0.0,
//             ShipEmail: "",
//             ShipDate: moment(request.ship_datetime).format("YYYY-MM-DD"),
//             Residential:
//               request.ship_to.address_residential_indicator ===
//               AddressResidentialIndicator.Yes,
//             SignatureRequired:
//               request.confirmation === ConfirmationTypes.Signature,
//             SaturdayDel: request.advanced_options.saturday_delivery === true,
//             Declared: Number(pckg.insured_value || "0"),
//             CODType: CODType.None,
//             Weight: ouncesToPounds(
//               Number(pckg.weight_details.weight_in_ounces || "0")
//             ),
//             BillTo: Number(accountnumber || "0"),
//             Instructions: pckg.label_messages?.reference1 || "",
//             Reference: pckg.label_messages?.reference1 || "",
//             Reference2: pckg.label_messages?.reference2 || "",
//             Reference3: pckg.label_messages?.reference3 || "",
//             DIM: {
//               Length: toFixedNumber(
//                 pckg.dimension_details?.dimensions_in_inches?.length,
//                 2
//               ),
//               Width: toFixedNumber(
//                 pckg.dimension_details?.dimensions_in_inches?.width,
//                 2
//               ),
//               Height: toFixedNumber(
//                 pckg.dimension_details?.dimensions_in_inches?.height,
//                 2
//               ),
//             },
//             LabelType: mapLabelFormat(request.label_format),
//           },
//         },
//       ],
//     },
//   };
// };

// export const mapRequest = (
//   request: CreateLabelRequest
// ): CreateShipmentRequest => {
//   const { accountnumber, password } = request.metadata as RegistrationData;
//   return {
//     accountNumber: accountnumber,
//     password: password,
//     request: mapOnTracShipmentRequest(request),
//   };
// };


// src/methods/create-label/map-request.ts






// import { CreateLabelRequest } from "@shipengine/connect-carrier-api";

// export const mapRequest = (request: CreateLabelRequest): any => {
//   const p = request.packages[0];


//   const length = Number(p.dimension_details?.dimensions_in_inches?.length || 0);
//   const width = Number(p.dimension_details?.dimensions_in_inches?.width || 0);
//   const height = Number(p.dimension_details?.dimensions_in_inches?.height || 0);

//   const weightOz = Number(p.weight_details?.weight_in_ounces || 0);
//   const weightLb = weightOz / 16;

//   return {
//     transaction_id: request.transaction_id || "",
//     service_code: request.service_code || "D",
//     ship_datetime: request.ship_datetime || new Date().toISOString(),
//     is_return_label: request.is_return_label || false,
//    // is_residential: request.ship_to?.residential || false,
//     packages: request.packages,
//     ship_to: request.ship_to,
//     ship_from: request.ship_from,
//     dropoff_location: request.dropoff_location,
//     pickup_location: request.pickup_location,
//     reference: request.reference || "",
//     metadata: request.metadata || {},

//     FFUSACourier: {
//       action: "Request",
//       version: "1.0",

//       Requestor: {
//         Username: request.bill_shipping_to?.account_number || request.metadata?.username || "",
//         Password: request.metadata?.password || "",
//         SecurityKey: request.metadata?.securityKey || "",
//         AuthorizeCode: request.metadata?.authorizeCode || "",
//         AccountNumber: request.bill_shipping_to?.account_number || "",
//       },

//       Shipments: {
//         Shipment: {
//           Details: {
//             Date: (request.ship_datetime || new Date().toISOString()).substring(0, 10),
//             ServiceType: request.service_code || "D",
//             ServiceCode: request.service_code || "",
//             CustomerReference: p.label_messages?.reference1 || "",
//             ShipmentReference: request.reference || "",
//           },

//           Billing: {
//             ChargesBillToAccountNumber: request.bill_shipping_to?.account_number || "",
//             ChargesBillToType: "S",
//             DutiesBillToAccountNumber: request.bill_shipping_to?.account_number || "",
//             DutiesBillToType: "S",
//           },

//           Shipper: {
//             CompanyName: request.ship_from.company_name || "",
//             ContactName: request.ship_from.name || "",
//             Address1: request.ship_from.address_lines?.[0] || "",
//             Address2: request.ship_from.address_lines?.[1] || "",
//             City: request.ship_from.city_locality || "",
//             StateProvince: request.ship_from.state_province || "",
//             ZipPostal: request.ship_from.postal_code || "",
//             Country: request.ship_from.country_code || "",
//             Phone: request.ship_from.phone_number || "",
//             Email: request.ship_from.email || "",
//             Reference: request.ship_from.address_lines?.[0] || "",
//           },

//           Receiver: {
//             CompanyName: request.ship_to.company_name || "",
//             ContactName: request.ship_to.name || "",
//             Address1: request.ship_to.address_lines?.[0] || "",
//             Address2: request.ship_to.address_lines?.[1] || "",
//             City: request.ship_to.city_locality || "",
//             StateProvince: request.ship_to.state_province || "",
//             ZipPostal: request.ship_to.postal_code || "",
//             Country: request.ship_to.country_code || "",
//             Phone: request.ship_to.phone_number || "",
//             Email: request.ship_to.email || "",
//             Reference: request.ship_to.address_lines?.[0] || "",
//           },

//           Packages: {
//             NumberOfPackages: request.packages.length,
//             Package: {
//               SequenceNumber: 1,
//               PackageType: "P",
//               Weight: weightLb.toFixed(2),
//               WeightType: "LB",
//               Length: length,
//               Width: width,
//               Height: height,
//               DimUnit: "IN",
//             // CustomsValue: p.customs?.amount || p.insured_value?.amount || 0,
//               Currency: "USD",
//              //Content: p.content_description || p.customs?.description || "General Merchandise",
//             },
//           },

//           LabelType: "PDF",
//           CommercialInvoice: "False",
//         },
//       },
//     },
//   };
// };




import { CreateLabelRequest } from "@shipengine/connect-carrier-api";

export const mapRequest = (request: CreateLabelRequest): any => {

  console.log(request, '000000000000000000');
  const p = request.packages?.[0];
  console.log(p, '0000000000000000000000000');

  const length = Number(p?.dimension_details?.dimensions_in_inches?.length || 0);
  const width = Number(p?.dimension_details?.dimensions_in_inches?.width || 0);
  const height = Number(p?.dimension_details?.dimensions_in_inches?.height || 0);
  const weightOz = Number(p?.weight_details?.weight_in_ounces || 0);
  const weightLb = weightOz / 16;

  return {
    transaction_id: request.transaction_id || "",
    service_code: request.service_code || "D",
    ship_datetime: request.ship_datetime || new Date().toISOString(),
    is_return_label: request.is_return_label || false,
    //is_residential: request.ship_to?.residential || false,
    packages: request.packages || [],
    ship_to: request.ship_to || {},
    ship_from: request.ship_from || {},
    dropoff_location: request.dropoff_location,
    pickup_location: request.pickup_location,
    reference: request.reference || "",
    metadata: request.metadata || {},

    FFUSACourier: {
      action: "Request",
      version: "1.0",
      Requestor: {
        Username: request.bill_shipping_to?.account_number || request.metadata?.username || "",
        Password: request.metadata?.password || "",
        SecurityKey: request.metadata?.securityKey || "",
        AuthorizeCode: request.metadata?.authorizeCode || "",
        AccountNumber: request.bill_shipping_to?.account_number || "",
      },

      Shipments: {
        Shipment: {
          Details: {
            Date: (request.ship_datetime || new Date().toISOString()).substring(0, 10),
            ServiceType: request.service_code || "D",
            ServiceCode: request.service_code || "",
            // CustomerReference: p.label_messages?.reference1 || "",
            ShipmentReference: request.reference || "",
          },

          Billing: {
            ChargesBillToAccountNumber: request.bill_shipping_to?.account_number || "",
            ChargesBillToType: "S",
            DutiesBillToAccountNumber: request.bill_shipping_to?.account_number || "",
            DutiesBillToType: "S",
          },

          Shipper: {
            CompanyName: request.ship_from?.company_name || "",
            ContactName: request.ship_from?.name || "",
            Address1: request.ship_from?.address_lines?.[0] || "",
            Address2: request.ship_from?.address_lines?.[1] || "",
            City: request.ship_from?.city_locality || "",
            StateProvince: request.ship_from?.state_province || "",
            ZipPostal: request.ship_from?.postal_code || "",
            Country: request.ship_from?.country_code || "",
            Phone: request.ship_from?.phone_number || "",
            Email: request.ship_from?.email || "",
            Reference: request.ship_from?.address_lines?.[0] || "",
          },

          Receiver: {
            CompanyName: request.ship_to?.company_name || "",
            ContactName: request.ship_to?.name || "",
            Address1: request.ship_to?.address_lines?.[0] || "",
            Address2: request.ship_to?.address_lines?.[1] || "",
            City: request.ship_to?.city_locality || "",
            StateProvince: request.ship_to?.state_province || "",
            ZipPostal: request.ship_to?.postal_code || "",
            Country: request.ship_to?.country_code || "",
            Phone: request.ship_to?.phone_number || "",
            Email: request.ship_to?.email || "",
            Reference: request.ship_to?.address_lines?.[0] || "",
          },

          Packages: {
            NumberOfPackages: request.packages?.length || 0,
            Package: {
              SequenceNumber: 1,
              PackageType: "P",
              Weight: weightLb.toFixed(2),
              WeightType: "LB",
              Length: length,
              Width: width,
              Height: height,
              DimUnit: "IN",
              // CustomsValue: p.customs?.amount || p.insured_value?.amount || 0,
              Currency: "USD",
              // Content: p.content_description || p.customs?.description || "General Merchandise",
            },
          },

          LabelType: "PDF",
          CommercialInvoice: "False",
        },
      },
    },
  };
};
