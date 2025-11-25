import { RegisterRequest } from "@shipengine/connect-carrier-api";
import { AuthRequest } from "../../api";
import { RegistrationData } from "../../definitions/forms";

export const mapRequest = (request: RegisterRequest): AuthRequest => {
  const { accountnumber, password } =
    request.registration_info as RegistrationData;
  return {
    accountNumber: accountnumber,
    password,
    id: request.transaction_id,
  };
};
