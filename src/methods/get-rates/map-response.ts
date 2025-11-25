// import { GetRatesResponse } from "@shipengine/connect-carrier-api";
// import {
//   BillingCategories,
//   BillingLineItem,
//   Rate,
// } from "@shipengine/connect-carrier-api/lib/models";
// import { OntracRatesResponse, Rate as OntracRate } from "../../api";
// const moment = require("moment");

// const getBillingLineItem = (
//   billing_category: BillingCategories,
//   amount: number
// ): BillingLineItem => {
//   return {
//     billing_category,
//     amount: {
//       currency: "USD",
//       amount: amount.toString(),
//     },
//   };
// };
// const mapBillingLineItems = (rate: OntracRate): BillingLineItem[] => {
//   const ret: BillingLineItem[] = [];
//   ret.push(getBillingLineItem(BillingCategories.Shipping, rate.TotalCharge));
//   return ret;
// };

// const mapRates = (rate: OntracRate): Rate | undefined => {
//   if (isNaN(rate.TotalCharge)) {
//     return undefined;
//   }
//   if (rate.TotalCharge === 0) {
//     return undefined;
//   }
//   const ret: Rate = {
//     service_code: rate.Service,
//     estimated_delivery_datetime: moment(
//       rate.ExpectedDeliveryDate,
//       "YYYYMMDD"
//     ).toISOString(),
//     billing_line_items: mapBillingLineItems(rate),
//   };
//   return ret;
// };

// export const mapResponse = (
//   response: OntracRatesResponse
// ): GetRatesResponse => {
//   const rates = response?.Shipments[0]?.Rates;
//   if (!rates) {
//     return {
//       rates: [],
//     };
//   }
//   return {
//     rates: rates.map(mapRates).filter((rate) => rate !== undefined),
//   };
// };







import { GetRatesResponse } from "@shipengine/connect-carrier-api";
import {
  BillingCategories,
  BillingLineItem,
  Rate,
} from "@shipengine/connect-carrier-api/lib/models";
const moment = require("moment");

// Convert one amount to billing item
const toBillingItems = (amount: number): BillingLineItem[] => [
  {
    billing_category: BillingCategories.Shipping,
    amount: {
      amount: amount.toString(),
      currency: "USD",
    },
  },
];

// Convert one ShipGlobal <Charges> object → ShipEngine Rate
const convertChargesToRate = (c: any): Rate | undefined => {
  const total = Number(c.ChargeAmount);
  if (!total || total === 0 || isNaN(total)) return undefined;

  let deliveryDate = null;
  if (c.TransitTime) {
    const match = c.TransitTime.match(/\d+/);
    if (match) {
      deliveryDate = moment().add(Number(match[0]), "days").toISOString();
    }
  }

  return {
    service_code: c.ServiceName,
    estimated_delivery_datetime: deliveryDate,
    billing_line_items: toBillingItems(total),
  };
};

// Final exported function
export const mapResponse = (response: any): GetRatesResponse => {
  const charges = response.Charges || [];

  const rates = charges
    .map((c: any) => convertChargesToRate(c))
    .filter((r: any) => r !== undefined);

  return { rates };
};
