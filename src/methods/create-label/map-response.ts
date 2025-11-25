// import { CreateLabelResponse } from "@shipengine/connect-carrier-api";
// import { BillingCategories, DocumentFormat, DocumentType } from "@shipengine/connect-carrier-api/lib/models";
// import { ExternalServerError } from "@shipengine/connect-runtime";
// import { OnTrackShipmentResponse } from "../../api";
// const moment = require('moment');

// export const mapResponse = (
//   response: OnTrackShipmentResponse,
//   labelFormat: DocumentFormat,
//   transactionId: string,
// ): CreateLabelResponse => {
//   const shipment = response.Shipments[0];
//   if (!shipment) {
//     throw new Error("No Shipment returned");
//   }
//   if (shipment.Error) {
//     throw new ExternalServerError(shipment.Error);
//   }

  
//   const ret: CreateLabelResponse = {
//       tracking_number: shipment.TrackingNumber,
//       billing_line_items: [
//           {
//               billing_category: BillingCategories.Delivery,
//               amount: {
//                   currency: "USD",
//                   amount: (shipment.ServiceChrg || 0).toString(),
//               },
//           },
//           {
//               billing_category: BillingCategories.FuelCharge,
//               amount: {
//                   currency: "USD",
//                   amount: (shipment.FuelChrg || 0).toString(),
//               },
//           },
//       ],
//       estimated_delivery_datetime: moment(shipment.ExpectedDeliveryDate, 'YYYYMMDD').toISOString(),
//       documents: [
//           {
//               type: [DocumentType.Label],
//               data: labelFormat === DocumentFormat.Pdf
//                   ? shipment.Label
//                   : Buffer.from(shipment.Label, "utf-8").toString('base64'),
//               format: labelFormat,
//           }
//       ],
//       transaction_id: transactionId,
//       alternative_identifiers: [{
//           type: 'UID',
//           value: shipment.UID
//       }]
//   };
//   return ret;
// };


// src/methods/create-label/map-response.ts

import { CreateLabelResponse, BillingCategories } from "@shipengine/connect-carrier-api";
import moment = require("moment");

export const mapResponse = (response: any): CreateLabelResponse => {
  const shipment =
    response?.FFUSACourier?.Shipments?.Shipment ||
    response?.Shipment ||
    {};

  const tracking = shipment?.TrackingNumber || "";
  const label = shipment?.Label || "";
  const charge = Number(shipment?.ServiceCharge || 0);
  const transit = shipment?.TransitTime || "";

  let estimatedDate = null;

  const match = transit?.match?.(/\d+/);
  if (match) {
    estimatedDate = moment()
      .add(Number(match[0]), "days")
      .toISOString();
  }

  // Extract transaction_id from response or fallback to empty string
  const transactionId = response?.transaction_id || "";

  return {
    transaction_id: transactionId, // ✅ still required
    tracking_number: tracking,
    label_download: {
      label_data: label,
      // label_format: "pdf",
    },
    billing_line_items: [
      {
        billing_category: BillingCategories.Shipping,
        amount: {
          currency: "USD",
          amount: charge.toString(),
        },
      },
    ],
    estimated_delivery_datetime: estimatedDate,
  };
};
