export const RegistrationFormSchema = {
    JsonSchema: {
      title: "Connect Your OnTrac Account",
      description:
        '<p>You need an existing OnTrac account to complete this form.</p><p>Don\'t yet have an account?<br /><a href="http://www.ontrac.com/openfreeaccount.asp" target="_blank" rel="noreferrer">Click here to open one now.</a></p><p>Before registering your account, please request a password by emailing<br /><a href="mailto:softwaresupport@ontrac.com?subject=ShipStation Password Request&body=I would like to request a password for use with the ShipStation application. My OnTrac account number is XXXXXX.">softwaresupport@ontrac.com</a></p><br/><p>If you do not yet have a password, send an email to <a rel="noreferrer" href="mailto:apisupport@ontrac.com?subject=ShipStation Password Request&body=I would like to request a password for use with the ShipStation application. My OnTrac account number is XXXXXX.">softwaresupport@ontrac.com.</a></p>',
      type: "object",
      required: ["accountnumber", "password"],
      properties: {
        accountnumber: {
          type: "string",
          title: "Account Number",
          maxLength: 50,
        },
        password: {
          type: "string",
          title: "Password",
          maxLength: 50,
        },
      },
    },
    UiSchema: {
      accountnumber: {
        "ui:autofocus": true,
        "ui:emptyValue": "",
      },
      password: {
        "ui:emptyValue": "",
        "ui:widget": "password",
      },
    },
};

export interface RegistrationData {
  accountnumber: string;
  password: string;
}
