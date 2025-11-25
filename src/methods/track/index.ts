import { TrackingRequest, TrackingResponse } from "@shipengine/connect-carrier-api";
import { OntracTrackingRequest, track } from "../../api";
import { mapRequest } from "./map-request";
import { mapResponse } from "./map-response";

export const Track = async (request: TrackingRequest): Promise<TrackingResponse> => {
    //console.log(request, '00000000')
    const mappedRequest: OntracTrackingRequest = mapRequest(request);
   
    const response = await track(mappedRequest);
    console.log( '2 00000000')
    const mappedResponse: TrackingResponse = mapResponse(response);
    console.log( '3 00000000')
    return mappedResponse;
}
