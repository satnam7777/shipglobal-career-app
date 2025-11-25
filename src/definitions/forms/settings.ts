export const SettingsFormSchema = {
    JsonSchema: {
      title: "OnTrac Settings",
      description: "Your OnTrac account information is shown below",
      type: "object",
      properties: {
        account_number: {
          type: "string",
          title: "Account Number",
        },
      },
    },
    UiSchema: {
      account_number: {
        "ui:readonly": true,
      },
    },
};
