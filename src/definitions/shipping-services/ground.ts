import {
  ShippingService,
  ServiceRequiredPropertiesEnum,
  LabelSizesEnum,
  ServiceGradeEnum,
  ServiceClassEnum,
  ServiceAttributesEnum,
} from "@shipengine/connect-carrier-api";

export const Ground: ShippingService = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "02532d49-08e5-4ada-be5f-a202076ca65f",
  Name: "OnTrac Ground Service",
  Abbreviation: "Ground",
  Code: "C",
  International: false,
  RequiredProperties: [ServiceRequiredPropertiesEnum.Weight],
  SupportedLabelSizes: [LabelSizesEnum.Inches4x6, LabelSizesEnum.Inches4x8],
  Class: ServiceClassEnum.Ground,
  Grade: ServiceGradeEnum.Expedited,
  ServiceAttributes: [ServiceAttributesEnum.Tracking],
};
