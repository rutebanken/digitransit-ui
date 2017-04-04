// import { postJson } from './xhrPromise';

const accessibilityAssessment = gtfsId =>
  `{
  stopPlace(id: "${gtfsId}") {
    accessibilityAssessment {
      limitations {
        id
        version
        wheelchairAccess
        stepFreeAccess
        escalatorFreeAccess
        audibleSignalsAvailable
        liftFreeAccess
      }
    }
    quays {
      accessibilityAssessment {
        limitations {
          id
          version
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
