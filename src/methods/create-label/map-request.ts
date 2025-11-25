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
import { CreateLabelRequest } from "@shipengine/connect-carrier-api";
import {
  AddressResidentialIndicator,
  ConfirmationTypes,
  DocumentFormat,
  ShipFrom,
  ShipTo,
} from "@shipengine/connect-carrier-api/lib/models";
import { BadRequestError } from "@shipengine/connect-runtime";
import {
  Address,
  CODType,
  CreateShipmentRequest,
  LabelType,
  OnTracShipmentRequest,
  ServiceCode,
} from "../../api";
import { RegistrationData } from "../../definitions/forms";
import { ouncesToPounds, toFixedNumber } from "../shared";
import { PackageCode } from "../../api";


const moment = require("moment");

const mapAddress = (address: ShipFrom | ShipTo): Address => {
  return {
    Name: address?.company_name || address?.name || "",
    Contact: address?.company_name || address?.name || "",
    Addr1: address?.address_lines?.[0] || "",
    Addr2: address?.address_lines?.[1] || "",
    Addr3: address?.address_lines?.[2] || "",
    City: address?.city_locality || "",
    State: address?.state_province || "",
    Zip: (address?.postal_code || "").toString().substr(0, 10), // keep safe length
    Phone: address?.phone_number || "",
  };
};

// const mapLabelFormat = (format: DocumentFormat): LabelType => {
//   switch (format) {
//     case DocumentFormat.Pdf:
//       return LabelType.CROPPED_PDF;
//     case DocumentFormat.Zpl:
//       return LabelType.ZPL;
//     default:
//       throw new BadRequestError("OnTrac only supports PDF and ZPL label formats.");
//   }
// };

const mapOnTracShipmentRequest = (
  request: CreateLabelRequest
): OnTracShipmentRequest => {
  // Accept accountNumber/password from metadata (preferred) OR request body (if provided).
  const meta = (request.metadata || {}) as RegistrationData;
  const accountnumber = meta?.accountnumber || (request as any).accountNumber || "";
  const password = meta?.password || (request as any).password || "";

  // Basic ShipEngine validation guards (fail early with readable error)
  if (!request.transaction_id) throw new BadRequestError("transaction_id is required");
  if (!request.service_code) throw new BadRequestError("service_code is required");
  if (!request.ship_datetime) throw new BadRequestError("ship_datetime is required");
  if (!request.ship_from) throw new BadRequestError("ship_from is required");
  if (!request.ship_to) throw new BadRequestError("ship_to is required");
  if (!request.packages || request.packages.length === 0)
    throw new BadRequestError("packages are required");

  const pckg = request.packages[0];

    const mapPackageCodeValue = (): PackageCode => {
    const code = (pckg.package_code || "").toLowerCase();

    if (code === "letter") return PackageCode.Letter;
    if (code === "package") return PackageCode.Package;

    // fallback default → Package
    return PackageCode.Package;
  };

  const shipDate = moment(request.ship_datetime).format("YYYY-MM-DD");

  

  return {
    OnTracShipmentRequest: {
      Shipments: [
        {
          Shipment: {
            UID: request.transaction_id || "",
            Service: request.service_code as ServiceCode,
            shipper: mapAddress(request.ship_from),
            consignee: mapAddress(request.ship_to),
            SignatureRequired: request.confirmation === ConfirmationTypes.Signature,
            Residential: request.ship_to.address_residential_indicator === AddressResidentialIndicator.Yes,
            SaturdayDel: request.advanced_options?.saturday_delivery === true,
            Declared: Number(pckg.insured_value?.amount || 0),
            COD: 0,
            CODType: CODType.None,
            Weight: ouncesToPounds(Number(pckg.weight_details?.weight_in_ounces || 0)),
            BillTo: Number(accountnumber || 0),
            Instructions: pckg.label_messages?.reference1 || "",
            Reference: pckg.label_messages?.reference1 || "",
            Reference2: pckg.label_messages?.reference2 || "",
            Reference3: pckg.label_messages?.reference3 || "",
            DIM: {
              Length: toFixedNumber(pckg.dimension_details?.dimensions_in_inches?.length || 0, 2),
              Width: toFixedNumber(pckg.dimension_details?.dimensions_in_inches?.width || 0, 2),
              Height: toFixedNumber(pckg.dimension_details?.dimensions_in_inches?.height || 0, 2),
            },
            // LabelType: mapLabelFormat(request.label_format),
            ShipEmail: request.ship_from.email || "",
            DelEmail: request.ship_to.email || "",
            // Letter: (pckg.package_code || "").toUpperCase(),
            Letter: mapPackageCodeValue(),
            ShipDate: shipDate,
            Tracking: "",
          },
        },
      ],
    },
  };
};

export const mapRequest = (request: CreateLabelRequest): CreateShipmentRequest => {
  // Pull metadata values (accountnumber/password) if present, keep them in returned structure
  const meta = (request.metadata || {}) as RegistrationData;
  const accountnumber = meta?.accountnumber || (request as any).accountNumber || "";
  const password = meta?.password || (request as any).password || "";

  return {
    accountNumber: accountnumber,
    password: password,
    request: mapOnTracShipmentRequest(request),
  };
};
