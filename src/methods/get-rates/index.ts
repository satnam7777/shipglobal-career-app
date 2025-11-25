import { GetRatesRequest, GetRatesResponse } from "@shipengine/connect-carrier-api";
import { getRates } from "../../api";
import { mapRequest } from "./map-request";
import { mapResponse } from "./map-response";

export const GetRates = async (request: GetRatesRequest): Promise<GetRatesResponse> => {
    const mappedRequest = mapRequest(request);
    const response = await getRates(mappedRequest);
    const mappedResponse = mapResponse(response);
    return mappedResponse;
}
