import { RegisterRequest, RegisterResponse} from "@shipengine/connect-carrier-api";
import { authenticate, AuthRequest } from "../../api";
import { mapRequest } from "./map-request";
import { mapResponse } from "./map-response";

export const Register = async (request: RegisterRequest): Promise<RegisterResponse> => {
    const mappedRequest: AuthRequest = mapRequest(request);
    await authenticate(mappedRequest);
    const mappedResponse: RegisterResponse = mapResponse(mappedRequest);
    return mappedResponse;
}
