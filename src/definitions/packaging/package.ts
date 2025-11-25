import {
    PackageAttribute,
    PackageType,
    RequiredToShipEnum,
  } from '@shipengine/connect-carrier-api';

export const Package: PackageType = {
    // DO NOT CHANGE THIS ID AFTER PUBLISHING
    Id: "0149411b-d565-4821-964c-65ba4baef6ba",
    Name: "Package",
    CarrierPackageTypeCode: "0",
    PackageAttributes: [
      PackageAttribute.Domestic,
    ] ,
    RequiredToShip: [RequiredToShipEnum.Weight, RequiredToShipEnum.Dimensions],
  };
