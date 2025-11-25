import { TrackingResponse } from "@shipengine/connect-carrier-api";
import {
  StandardizedStatusCodes,
  TrackEvent,
} from "@shipengine/connect-carrier-api/lib/models";
import {
  OntracTrackingResponse,
  TrackingEvent,
  TrackingShipment,
} from "../../api";
const moment = require("moment");

const mapStatus = (status: string): StandardizedStatusCodes => {
  switch (status) {
    case "Pending":
      return StandardizedStatusCodes.Accepted;
    case "In Transit":
    case "Out for Delivery":
      return StandardizedStatusCodes.InTransit;
    case "Delivered":
      return StandardizedStatusCodes.Delivered;
    case "Discarded":
      return StandardizedStatusCodes.Exception;
    default:
      return StandardizedStatusCodes.Unknown;
  }
};

const mapEvent = (trackingEvent: TrackingEvent): TrackEvent => ({
  event_datetime: trackingEvent.EventTime
    ? moment(trackingEvent.EventTime).toISOString()
    : undefined,
  status_code: mapStatus(trackingEvent.Description),
  event_code: trackingEvent.Status || "",
  description: trackingEvent.Description || "",
  state: trackingEvent.State || "",
  postal_code: trackingEvent.Zip || "",
  city: trackingEvent.City || "",
});

const getAllEventsFromShipments = (
  shipments: TrackingShipment[]
): TrackEvent[] => {
  if (!shipments || shipments.length === 0) return [];
  const ret: TrackEvent[] = [];
  shipments.forEach((shipment) => {
    if (shipment.Events && shipment.Events.length) {
      ret.push(...shipment.Events.map(mapEvent));
    }
  });
  return ret;
};
// const getLatestEvent = (events: TrackEvent[]): TrackEvent | undefined => {
//   if (!events) {
//     return undefined;
//   }
//   return events.reduce((a, b) => {
//     return new Date(a.event_datetime) > new Date(b.event_datetime) ? a : b;
//   });
// };

const getLatestEvent = (events: TrackEvent[]): TrackEvent | undefined => {
  if (!events || !events.length) return undefined;
  return events.reduce((a, b) =>
    new Date(a.event_datetime) > new Date(b.event_datetime) ? a : b
  );
};


// export const mapResponse = (
//   response: OntracTrackingResponse
// ): TrackingResponse => {
//   const events = getAllEventsFromShipments(response.Shipments);
//   const latest = getLatestEvent(events);
//   const shipment = response.Shipments[0];
//   return {
//     tracking_info: {
//       tracking_number: shipment.Tracking,
//       events,
//       standardized_status_code: latest
//         ? mapStatus(latest.status_code)
//         : StandardizedStatusCodes.Unknown,
//       service: {
//         code: shipment.Service,
//       },
//       estimated_delivery_datetime: moment(shipment.Exp_Del_Date).toISOString(),
//     },
//   };
// };






export const mapResponse = (response: OntracTrackingResponse): TrackingResponse => {
  const shipment = response.Shipments[0];

  let events: TrackEvent[] = shipment?.Events?.map(mapEvent) || [];

  // If no events, add Result as an event
  if (events.length === 0 && shipment?.Result) {
    events.push({
      event_datetime: new Date().toISOString(),
      status_code: StandardizedStatusCodes.Unknown,
      event_code: shipment.Result.Code,
      description: shipment.Result.Desc,
      state: '',
      postal_code: '',
      city: '',
    });
  }

  return {
    tracking_info: {
      tracking_number: shipment?.Tracking || '',
      events,
      standardized_status_code: StandardizedStatusCodes.Unknown,
      service: {
        code: shipment?.Service || '',
      },
    },
  };
};



