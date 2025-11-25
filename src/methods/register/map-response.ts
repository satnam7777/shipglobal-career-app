import { RegisterResponse } from "@shipengine/connect-carrier-api";
import { AuthRequest } from "../../api";

export const mapResponse = (authRequest: AuthRequest): RegisterResponse => {
    const { accountNumber, password} = authRequest;
    var ret: RegisterResponse = {
        credentials: {
            username: accountNumber,
            password: password
        },
        metadata: {
            accountnumber: accountNumber,
            password: password
        },
    };
    return ret;
}
