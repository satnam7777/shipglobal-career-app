import {
  ShippingService,
  ServiceRequiredPropertiesEnum,
  LabelSizesEnum,
  ServiceGradeEnum,
  ServiceClassEnum,
  ServiceAttributesEnum,
} from "@shipengine/connect-carrier-api";

export const SunriseGold: ShippingService = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "e98407a6-2138-4912-8c99-647fea8cc7fc",
  Name: "Sunrise Gold Service",
  Abbreviation: "Gold",
  Code: "G",
  International: false,
  RequiredProperties: [ServiceRequiredPropertiesEnum.Weight],
  SupportedLabelSizes: [LabelSizesEnum.Inches4x6, LabelSizesEnum.Inches4x8],
  Class: ServiceClassEnum.OneDayEarlyAm,
  Grade: ServiceGradeEnum.Overnight,
  ServiceAttributes: [ServiceAttributesEnum.Tracking],
};
