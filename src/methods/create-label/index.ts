import { CreateLabelRequest, CreateLabelResponse } from "@shipengine/connect-carrier-api";
import { createLabel } from "../../api";
import { mapRequest } from "./map-request";
import { mapResponse } from "./map-response";

export const CreateLabel = async (request: CreateLabelRequest): Promise<CreateLabelResponse> => {
    const mappedRequest = mapRequest(request);
    const response = await createLabel(mappedRequest);
    const mappedResponse = mapResponse(response, request.label_format, request.transaction_id);
    return mappedResponse;
}
