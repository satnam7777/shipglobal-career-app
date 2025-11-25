import { CarrierAppMetadata } from '@shipengine/connect-carrier-api';

import { Ontrac } from './ontrac';

export const Metadata: CarrierAppMetadata = {
  // DO NOT CHANGE THIS ID AFTER PUBLISHING
  Id: "76573baa-4de8-4dcc-80df-56a683dbcdab",
  Name: "OnTrac",
  Carriers: [Ontrac],
};
