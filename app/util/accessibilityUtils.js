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
  stepFreeAccess: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" /></svg>,
  escalatorFreeAccess: '',
  audibleSignalsAvailable: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM7.76 16.24l-1.41 1.41C4.78 16.1 4 14.05 4 12c0-2.05.78-4.1 2.34-5.66l1.41 1.41C6.59 8.93 6 10.46 6 12s.59 3.07 1.76 4.24zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm5.66 1.66l-1.41-1.41C17.41 15.07 18 13.54 18 12s-.59-3.07-1.76-4.24l1.41-1.41C19.22 7.9 20 9.95 20 12c0 2.05-.78 4.1-2.34 5.66zM12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" /></svg>,
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
