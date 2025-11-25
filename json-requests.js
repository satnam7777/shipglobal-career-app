const GetRates = {
  "accountNumber": "8004806",
  "transaction_id": "550e8400-e29b-41d4-a716-446655440000",
  "ship_datetime": "2025-01-20T12:00:00Z",
  "is_return_label": false,
  "is_residential": false,
  "ship_from": {
    "postal_code": "11520",
    "country_code": "US",
    "address_residential_indicator": "no"
  },
 "ship_to": {
  "postal_code": "K2B7S9",
  "country_code": "CA",
  "address_residential_indicator": "no"
},
  "packages": [
    {
      "package_code": "package",
      "weight_details": { "weight_in_ounces": 32 },
      "dimension_details": { "dimensions_in_inches": { "length": 12, "width": 6, "height": 8 } },
      "insured_value": { "amount": 0, "currency": "USD" }
    }
  ],
  "service_code": "all",
  "advanced_options": { "saturday_delivery": false }
}



const Track = {
  "transaction_id": "550e8400-e29b-41d4-a716-446655440000",
  "metadata": {
    "Username": { "value": "shipglobal" },
    "Password": { "value": "shipglobal@123" },
    "SecurityKey": { "value": "5cc2c6275ae421.92059654" },
    "AuthorizeCode": { "value": "109" },
    "AccountNumber": { "value": "8004806" }
  },
  "identifiers": [
    {
      "type": "tracking_number",
      "value": "FFU23434"
    }
  ]
}


const CreateLabel = {
  "transaction_id": "550e8400-e29b-41d4-a716-446655440000",
  "service_code": "standard_shipping",
  "ship_datetime": "2025-11-20T10:12:00Z",
  "is_return_label": false,
  "is_residential": false,
  "ship_to": {
    "postal_code": "90001",
    "country_code": "US",
    "address_residential_indicator": "no"
  },
  "ship_from": {
    "postal_code": "11520",
    "country_code": "US",
    "address_residential_indicator": "no"
  },
  "packages": [
    {
      "weight": { "value": 1, "unit": "pound" },
      "dimensions": { "unit": "inch", "length": 10, "width": 6, "height": 5 },
      "insured_value": { "amount": "0", "currency": "USD" }
    }
  ]
}





