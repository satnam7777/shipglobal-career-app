// import { TrackingRequest } from "@shipengine/connect-carrier-api";
// import { BadRequestError } from "@shipengine/connect-runtime";
// import { OntracTrackingRequest } from "../../api";
// import { RegistrationData } from "../../definitions/forms";

// export const mapRequest = (request: TrackingRequest): OntracTrackingRequest => {
//   const { accountnumber, password } = request.metadata as RegistrationData;
//   const trackingNumber = request.identifiers?.find(p => p.type === 'tracking_number');
//   if(!trackingNumber) {
//       throw new BadRequestError(`Unable to find tracking_number in identifiers: ${JSON.stringify(request.identifiers)}`);
//   }
//   return {
//     accountNumber: accountnumber,
//     password,
//     useSandbox: false,
//     trackingNumber: trackingNumber.value
//   };
// };




import { TrackingRequest } from "@shipengine/connect-carrier-api";
import { BadRequestError } from "@shipengine/connect-runtime";
import { OntracTrackingRequest } from "../../api";

export const mapRequest = (request: TrackingRequest): OntracTrackingRequest => {
  const metadata = request.metadata as any;

  if (!metadata) {
    throw new BadRequestError("Missing metadata in tracking request");
  }

  const trackingNumberObj = request.identifiers?.find(i => i.type === "tracking_number");
  if (!trackingNumberObj) {
    throw new BadRequestError("Tracking number not found in identifiers");
  }

  return {
    username: metadata.Username.value,
    password: metadata.Password.value,
    securityKey: metadata.SecurityKey.value,
    authorizeCode: metadata.AuthorizeCode.value,
    accountNumber: metadata.AccountNumber.value,
    trackingNumber: trackingNumberObj.value,
  };
};

