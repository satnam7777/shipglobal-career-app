const CreateLabel = require('./lib/methods/create-label');


const request = {
  shipment: {
    service_code: "priority",
    ship_to: {
      name: "John Doe",
      address_line1: "123 Main St",
      city: "Austin", 
      state: "TX",
      postal_code: "78701",
      country: "US"
    },
    packages: [
      {
        weight: {
          value: 1.5,
          unit: "pound"
        }
      }
    ]
  }
};

const configuration = {
  // Your carrier API configuration
  apiKey: "app_8x1fnd8DKM6MfxZZuzZjne",
  baseURL: "https://connect.shipengine.com"
};

// Call the function directly
CreateLabel(request, configuration)
  .then(label => {
    console.log('Label created:', label);
  })
  .catch(error => {
    console.error('Error creating label:', error);
  });