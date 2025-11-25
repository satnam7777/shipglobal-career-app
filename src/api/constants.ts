import { Package, ServiceCode, PackageCode } from './models';
export const BASE_URL='https://www.shipglobal.us/api';


export const INVALID_CREDENTIALS_ERROR = 'Invalid Username or Password';

export const VALID_PACKAGE = new Package(
  'ID1',
  '90210',
  '94546',  
  true,
  0.0,
  true,
  0.0,
  5,
  4,
  3,
  10,
  ServiceCode.All,
  PackageCode.Package
);

export const DEBUG_LEVELS = {
  NORMAL: '0',
  VERBOSE: '1',
};
