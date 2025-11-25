import { VoidLabelsRequest, VoidLabelsResponse} from "@shipengine/connect-carrier-api";
import { VoidRequest, VoidResponse } from "@shipengine/connect-carrier-api/lib/models";

// OnTrac doesn't support voiding labels, but they also don't bill until the item is shipped
// so we can just go ahead and void any labels the platform sends over without calling them.
function mapVoidResponse(request: VoidRequest): VoidResponse {
    return {
        void_request_id: request.void_request_id,
        message: 'Label has been voided.'
    }
}

export const VoidLabels = async (request: VoidLabelsRequest): Promise<VoidLabelsResponse> => {
    return {
        void_responses: request.void_requests.map(mapVoidResponse)
    }
}
