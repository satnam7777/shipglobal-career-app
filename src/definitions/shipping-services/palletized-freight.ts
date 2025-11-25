import {
  ShippingService,
  ServiceRequiredPropertiesEnum,
  LabelSizesEnum,
  ServiceGradeEnum,
  ServiceClassEnum,
  ServiceAttributesEnum,
} from "@shipengine/connect-carrier-api";

export const PalletizedFreight: ShippingService = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "b30ed788-4747-4dab-81fa-bf433c38e281",
  Name: "Palletized Freight Service",
  Abbreviation: "freight",
  Code: "H",
  International: false,
  RequiredProperties: [ServiceRequiredPropertiesEnum.Weight],
  SupportedLabelSizes: [LabelSizesEnum.Inches4x6, LabelSizesEnum.Inches4x8],
  Class: ServiceClassEnum.OneDay,
  Grade: ServiceGradeEnum.Overnight,
  ServiceAttributes: [ServiceAttributesEnum.Tracking],
};
