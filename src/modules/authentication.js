let authErrorDict;

/*
 * Takes in an object of groups of error messages, iterates through each message of each group,
 * and returns the error message with the highest priority.
 *
 * Each key of jsonResponse is an object that maps to an array of errors related to that object. For example:
 * jsonResponse = {
                  "username": 
                    [
                      "A user with that username already exists.", 
                    ]
                  "email":
                    [
                      "A user is already registered with this e-mail address."
                    ]
                  "password1":
                    [
                      "This field is required."
                    ]
                  "password2":
                    [
                      "This field is required."
                    ]
                  }
 */
export default function getMostSignificantError(jsonResponse) {
  let mostSignificantError = {
    text: 'There was a problem logging in', // default error message
    priority: -1, // any other error from jsonResponse will override this message
  };
  const errorMessageGroups = Object.keys(jsonResponse);

  // iterate over each group
  for (let i = 0; i < errorMessageGroups.length; i += 1) {
    // array of errors for one group
    const group = jsonResponse[errorMessageGroups[i]];

    for (let j = 0; j < group.length; j += 1) {
      // iterate over each message in the array of error messages
      let errorFromServer = {
        text: group[j],
        priority: 0,
      };
      if (errorFromServer.text in authErrorDict)
        errorFromServer = authErrorDict[errorFromServer.text];
      if (errorFromServer.priority > mostSignificantError.priority)
        mostSignificantError = errorFromServer;
    }
  }
  return mostSignificantError.text;
}

/*
 * Maps each error message from the back-end into a custom error message, and assigns
 * a priority to each of those messages. A higher integer value for priority means a higher importance.
 */
authErrorDict = {
  // Username
  'A user with that username already exists.': {
    text: 'The username you provided is already registered', // Please use it to log in',
    priority: 5,
  },
  // Email
  'A user is already registered with this e-mail address.': {
    text: 'The email address you provided is already registered', // Please use it to log in',
    priority: 5,
  },
  'Enter a valid email address.': {
    text: 'Please enter a valid email address',
    priority: 4,
  },
  'Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.': {
    text: 'Please enter a username with valid characters',
    priority: 4,
  },
  // Password1
  'This password is too short. It must contain at least 8 characters.': {
    text: 'Your password must contain at least 8 characters',
    priority: 3,
  },
  'This password is too common.': {
    text: 'Your password is too common',
    priority: 3,
  },
  // Non_Field Errors
  'Unable to log in with provided credentials.': {
    text: 'Your username or password is invalid',
    priority: 4,
  },
  "The two password fields didn't match.": {
    text: 'Your two passwords did not match',
    priority: 4,
  },
  'Must include "username" and "password".': {
    text: 'Please fill out all required fields',
    priority: 3,
  },
  // General
  'This field may not be blank.': {
    text: 'Please fill out all required fields',
    priority: 3,
  },
  'This field is required.': {
    text: 'Please fill out all required fields',
    priority: 3,
  },
  'This field may not be null.': {
    text: 'Please fill out all required fields',
    priority: 3,
  },
};
