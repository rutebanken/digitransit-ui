import React from 'react';

export const accessibilities = [
  'wheelchairAccess',
  'stepFreeAccess',
  'escalatorFreeAccess',
  'audibleSignalsAvailable',
  'liftFreeAccess',
];

export const accessibilityTypes = {
  UNKNOWN: 'UNKNOWN',
  TRUE: 'TRUE',
  FALSE: 'FALSE',
  PARTIAL: 'PARTIAL',
};

export const accessibilityIcons = {
  wheelchairAccess: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="12" cy="4" r="2" /><path d="M19 13v-2c-1.54.02-3.09-.75-4.07-1.83l-1.29-1.43c-.17-.19-.38-.34-.61-.45-.01 0-.01-.01-.02-.01H13c-.35-.2-.75-.3-1.19-.26C10.76 7.11 10 8.04 10 9.09V15c0 1.1.9 2 2 2h5v5h2v-5.5c0-1.1-.9-2-2-2h-3v-3.45c1.29 1.07 3.25 1.94 5 1.95zm-6.17 5c-.41 1.16-1.52 2-2.83 2-1.66 0-3-1.34-3-3 0-1.31.84-2.41 2-2.83V12.1c-2.28.46-4 2.48-4 4.9 0 2.76 2.24 5 5 5 2.42 0 4.44-1.72 4.9-4h-2.07z" /></svg>,
  stepFreeAccess: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="-35 -35 100 125"> <polygon points="27.9,2.1 19.3,2.1 10.7,2.1 10.7,10.7 10.7,19.3 2.1,19.3 -6.5,19.3 -6.5,27.9 -6.5,36.5 -28,36.5 -28,45.1 2.1,45.1 2.1,27.9 19.3,27.9 19.3,10.7 36.5,10.7 36.5,-6.5 58,-6.5 58,-15.1 36.5,-15.1 27.9,-15.1 27.9,-6.5 " id="polygon4" transform="matrix(1.080065,0,0,1.4399178,0.12317705,6.6427586)" /> </svg>,
  escalatorFreeAccess: '',
  audibleSignalsAvailable: '',
  liftFreeAccess: '',
};

export const getAccessibility = (access, type) => {
  if (access.accessibilityAssessment && access.accessibilityAssessment.limitations) {
    return access.accessibilityAssessment.limitations[type];
  }
  return 'UNKNOWN';
};

export const getAccessibilityIcon = accessibility => accessibilityIcons[accessibility];

const accessibilityAssessment = gtfsId =>
  `{
  stopPlace(id: "${gtfsId}") {
    id
    accessibilityAssessment {
      limitations {
        wheelchairAccess
        stepFreeAccess
        escalatorFreeAccess
        audibleSignalsAvailable
        liftFreeAccess
      }
    }
    quays {
      id
      accessibilityAssessment {
        limitations {
          wheelchairAccess
          stepFreeAccess
          escalatorFreeAccess
          audibleSignalsAvailable
          liftFreeAccess
        }
      }
    }
  }
}`;


const postJson = (url, ignore, graphQLParams) => fetch(url,
  {
    method: 'POST',
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
      'ET-Client-Name': 'digitransit-ui',
    },
    body: JSON.stringify(graphQLParams),
  })
  .then(response => response.text())
  .then((body) => {
    try {
      const json = JSON.parse(body);
      if ('data' in json) {
        return json.data;
      }
      return json;
    } catch (error) {
      return body;
    }
  });

export default (gtfsId, config) => postJson(config.URL.TIAMAT, null, {
  operationName: null,
  query: accessibilityAssessment(gtfsId),
  variables: null,
});
