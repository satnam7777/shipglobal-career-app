import { OntracRatesRequest, getRates } from "./get-rates";
import { UnauthorizedError } from "@shipengine/connect-runtime";
import {
  INVALID_CREDENTIALS_ERROR,
  VALID_PACKAGE,
  DEBUG_LEVELS,
} from "./constants";

export interface AuthRequest {
  accountNumber: string;
  password: string;
  id: string;
  DEBUG?: boolean;
}

export const authenticate = async (request: AuthRequest) => {
  const rateRequest = new OntracRatesRequest(
    request.accountNumber,
    request.password,
    request.id,
    [VALID_PACKAGE]
  );
  try {
    if (process.env.DEBUG_LEVEL === DEBUG_LEVELS.VERBOSE || request.DEBUG) {
      console.log(
        `Trying to authenticate user credentials for Shipglobal account: ${request.accountNumber}`
      );
    }

    const response = await getRates(rateRequest);
    response.Shipments.forEach((shipment) => {
      if (shipment.Error === INVALID_CREDENTIALS_ERROR) {
        if (process.env.DEBUG_LEVEL === DEBUG_LEVELS.VERBOSE || request.DEBUG) {
          console.log(
            `Found invalid credentials inside a shipment error. Error message: ${shipment.Error}`
          );
        }
        throw new UnauthorizedError("Invalid Credentials");
      }
    });

    if (process.env.DEBUG_LEVEL === DEBUG_LEVELS.VERBOSE || request.DEBUG) {
      console.log(
        `Credentials for account: ${request.accountNumber} are authentic.`
      );
    }
    
  } catch (e) {
    if (process.env.DEBUG_LEVEL === DEBUG_LEVELS.VERBOSE || request.DEBUG) {
      console.log(`Caught error during getRate attempt. Error: ${e.message}`);
    }
    throw new UnauthorizedError("Invalid Credentials");
  }
};
