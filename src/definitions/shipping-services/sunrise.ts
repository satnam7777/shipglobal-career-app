import {
  ShippingService,
  ServiceRequiredPropertiesEnum,
  LabelSizesEnum,
  ServiceGradeEnum,
  ServiceClassEnum,
  ServiceAttributesEnum,
} from "@shipengine/connect-carrier-api";

export const Sunrise: ShippingService = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "db595bcd-c271-4b41-8b18-4a551174c6e4",
  Name: "Sunrise Service",
  Abbreviation: "budget",
  Code: "S",
  International: false,
  RequiredProperties: [ServiceRequiredPropertiesEnum.Weight],
  SupportedLabelSizes: [LabelSizesEnum.Inches4x6, LabelSizesEnum.Inches4x8],
  Class: ServiceClassEnum.OneDayEarly,
  Grade: ServiceGradeEnum.Overnight,
  ServiceAttributes: [ServiceAttributesEnum.Tracking],
};
