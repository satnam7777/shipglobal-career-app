import type { CarrierAppDefinition } from '@shipengine/connect-carrier-api';
import {
  Register,
  GetRates,
  CreateLabel,
  VoidLabels,
  Track
} from './methods';
import { Metadata } from './definitions';

export default {
  Metadata,
  Register,
  GetRates,
  CreateLabel,
  VoidLabels,
  Track
} satisfies CarrierAppDefinition;
