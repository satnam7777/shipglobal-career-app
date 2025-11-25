import {
  Carrier,
  LabelSizesEnum,
  LabelFormatsEnum,
  ShippingOptionEnum,
  ConfirmationTypeEnum,
  CarrierAttributeEnum,
} from "@shipengine/connect-carrier-api";

import { join } from "path";
import { RegistrationFormSchema, SettingsFormSchema } from "./forms";

import { Letter, Package } from "./packaging";

import {
  Ground,
  PalletizedFreight,
  Sunrise,
  SunriseGold,
} from "./shipping-services";

export const Ontrac: Carrier = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "91956bc4-6ed5-45db-b436-960528b021ca",
  Name: "Demo OnTrac",
  Description:
    "OnTrac provides an affordable logistics network that speeds up ground delivery so merchants can save money and delight their customers.",
  PackageTypes: [Letter, Package],
  ShippingServices: [Sunrise, SunriseGold, Ground, PalletizedFreight],
  ShippingOptions: {
    [ShippingOptionEnum.NonMachinable]: {
      Name: "Non-machinable",
      Description: "This shipment is non-machinable",
    },
    [ShippingOptionEnum.CarrierInsurance]: {
      Name: "Ontrac Insurance",
      Description: "Insurance available through the carrier.",
    },
  },
  DefaultSupportedCountries: [
    {
      FromCountry: "US",
    },
  ],
  DefaultLabelSizes: [LabelSizesEnum.Inches4x6, LabelSizesEnum.Inches4x8],
  LabelFormats: [LabelFormatsEnum.PDF],
  DefaultConfirmationTypes: {
    [ConfirmationTypeEnum.None]: "None",
    [ConfirmationTypeEnum.Signature]: "Signature",
    [ConfirmationTypeEnum.Delivery]: "Delivery",
  },
  CarrierAttributes: [CarrierAttributeEnum.Regional],
  TrackingUrl:
    "https://www.ontrac.com/tracking.asp?trackingres=submit&tracking_number={0}",
  CarrierUrl: "https://www.ontrac.com/",
  Images: {
    Logo: join(__dirname, "../../assets/logo.svg"),
    Icon: join(__dirname, "../../assets/icon.svg"),
  },
  AccountModals: {
    RegistrationFormSchema,
    SettingsFormSchema,
  },
};
