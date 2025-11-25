import {
  PackageAttribute,
  PackageType,
} from '@shipengine/connect-carrier-api';

export const Letter: PackageType = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "b98b5ccc-5f58-4adc-a6dd-c528b6e915aa",
  Name: "Letter",
  CarrierPackageTypeCode: "1",
  PackageAttributes: [
    PackageAttribute.Domestic,
  ],
  RequiredToShip: [],
};
