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
  "service_code": "5b2a5fdd4fff9",
  "ship_datetime": "2024-11-25T10:00:00Z",
  "is_return_label": false,
  "is_residential": false,
  "FFUSACourier": {
    "action": "Request",
    "version": "1.0",
    "Requestor": {
      "Username": "shipglobal",
      "Password": "shipglobal@123",
      "SecurityKey": "5cc2c6275ae421.92059654",
      "AuthorizeCode": "109",
      "AccountNumber": "8004806"
    },
    "Shipments": {
      "Shipment": {
        "Details": {
          "Date": "2024-11-25",
          "ServiceType": "D",
          "ServiceCode": "5b2a5fdd4fff9",
          "CustomerReference": "Test Order",
          "ShipmentReference": "5b2a5fdd4fff9"
        },
        "Billing": {
          "ChargesBillToAccountNumber": "8004806",
          "ChargesBillToType": "S",
          "DutiesBillToAccountNumber": "8004806",
          "DutiesBillToType": "S"
        },
        "Shipper": {
          "CompanyName": "Test Sender",
          "ContactName": "Test Sender",
          "Address1": "123 Test St",
          "Address2": "",
          "City": "Beverly Hills",
          "StateProvince": "CA",
          "ZipPostal": "90210",
          "Country": "US",
          "Phone": "1234567890",
          "Email": "shipper@test.com",
          "Reference": "Shipper Ref"
        },
        "Receiver": {
          "CompanyName": "Test Receiver",
          "ContactName": "Test Receiver",
          "Address1": "456 Test Ave",
          "Address2": "",
          "City": "New York",
          "StateProvince": "NY",
          "ZipPostal": "10001",
          "Country": "US",
          "Phone": "1234567890",
          "Email": "receiver@test.com",
          "Reference": "Receiver Ref"
        },
        "packages": {
          "NumberOfPackages": 1,
          "Package": {
            "SequenceNumber": 1,
            "PackageType": "P",
            "Weight": 10.0,
            "WeightType": "LB",
            "Length": 12,
            "Width": 10,
            "Height": 8,
            "DimUnit": "IN",
            "CustomsValue": 0,
            "Currency": "USD",
            "Content": "General Merchandise"
          }
        },
        "LabelType": "PDF",
        "CommercialInvoice": false
      }
    }
  }
}


