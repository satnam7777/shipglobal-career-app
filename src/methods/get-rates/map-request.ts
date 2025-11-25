// import { GetRatesRequest } from "@shipengine/connect-carrier-api";
// import { AddressResidentialIndicator, Package } from "@shipengine/connect-carrier-api/lib/models";
// import { OntracRatesRequest, Package as OntracPackage, PackageCode, ServiceCode, Shipment } from "../../api";
// import { RegistrationData } from "../../definitions/forms";
// import { ouncesToPounds } from "../shared";

// const mapPackages = (request: GetRatesRequest, pckg: Package): OntracPackage => {
//     return new OntracPackage(
//         request.transaction_id || "",
//         request.ship_from?.postal_code?.substr(0, 5) || "",
//         request.ship_to?.postal_code?.substr(0, 5) || "",
//         request.ship_from?.address_residential_indicator === AddressResidentialIndicator.Yes, // default to true
//         0, // TODO: Figure out if we can get cash on delivery
//         request.advanced_options?.saturday_delivery || false,
//         0, // TODO: Figure out if we have Declared Value
//         ouncesToPounds(pckg.weight_details?.weight_in_ounces || 0),
//         Number(pckg.dimension_details?.dimensions_in_inches?.length || ""),
//         Number(pckg.dimension_details?.dimensions_in_inches?.width || ""),
//         Number(pckg.dimension_details?.dimensions_in_inches?.height || ""),
//         request.service_code as ServiceCode || ServiceCode.All,
//         pckg.package_code as PackageCode || PackageCode.Package
//       );
// }

// export const mapRequest = (request: GetRatesRequest): OntracRatesRequest => {
//     const { accountnumber, password } = request.metadata as RegistrationData;
//     return new OntracRatesRequest(
//         accountnumber || "",
//         password || "",
//         request.transaction_id,
//         request.packages.map(pckg => mapPackages(request, pckg))
//     );
// };


import { GetRatesRequest } from "@shipengine/connect-carrier-api";
import { AddressResidentialIndicator, Package } from "@shipengine/connect-carrier-api/lib/models";
import { 
  OntracRatesRequest, 
  Package as OntracPackage, 
  PackageCode, 
  ServiceCode 
} from "../../api";
import { ouncesToPounds } from "../shared";

const mapPackages = (request: GetRatesRequest, pckg: Package): OntracPackage => {
  const weight = ouncesToPounds(pckg.weight_details?.weight_in_ounces || 0);

  const length = Number(pckg.dimension_details?.dimensions_in_inches?.length || 0);
  const width  = Number(pckg.dimension_details?.dimensions_in_inches?.width || 0);
  const height = Number(pckg.dimension_details?.dimensions_in_inches?.height || 0);

  const shipperZip = request.ship_from?.postal_code?.substring(0, 5) || "";
  const receiverZip = request.ship_to?.postal_code?.substring(0, 5) || "";

  const shipperCountry = request.ship_from?.country_code || "";
  const receiverCountry = request.ship_to?.country_code || "";

  return new OntracPackage(
    request.transaction_id || "",
    shipperZip,
    receiverZip,
    request.ship_from?.address_residential_indicator === AddressResidentialIndicator.Yes,
    0,
    request.advanced_options?.saturday_delivery || false,
    0,
    weight,
    length,
    width,
    height,
    (request.service_code as ServiceCode) || ServiceCode.All,
    (pckg.package_code as PackageCode) || PackageCode.Package,

    shipperZip,
    receiverZip,
    receiverCountry,
    shipperCountry,
    weight,
    length,
    width,
    height
  );
};

export const mapRequest = (request: GetRatesRequest): OntracRatesRequest => {
  const body: any = request;

  const accFromBody = body.accountNumber || body.accountnumber || "";
  const pwdFromBody = body.password || "";

  const metadata = body.metadata || {};
  const accFromMeta = metadata?.accountnumber?.value || metadata?.accountnumber || "";
  const pwdFromMeta = metadata?.password?.value || metadata?.password || "";

  const accountNumber = accFromBody || accFromMeta || "";
  const password = pwdFromBody || pwdFromMeta || "";

  const mappedPackages = request.packages.map((p) => mapPackages(request, p));

  return new OntracRatesRequest(accountNumber, password, request.transaction_id, mappedPackages);
};
