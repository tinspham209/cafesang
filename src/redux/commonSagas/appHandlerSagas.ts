function route(action, response, successCallback, errorCallback, networkCallback) {
  if (response.ok) {
    if (response.headers?.['content-type'] === 'text/html;charset=UTF-8') {
      handleError(action, response, errorCallback, networkCallback);
      return;
    }
    handleAppLogic(action, response, successCallback);
  } else {
    handleError(action, response, errorCallback, networkCallback);
  }
}

function handleAppLogic(action, response, successCallback) {
  if (successCallback) {
    successCallback(action, response.data);
  }
}

function handleError(action, response, errorCallback, networkCallback) {
  // NONE             null               200-299       No problems.
  // CLIENT_ERROR     'CLIENT_ERROR'     400-499       Any non-specific 400 series error.
  // SERVER_ERROR     'SERVER_ERROR'     500-599       Any 500 series error.
  // TIMEOUT_ERROR    'TIMEOUT_ERROR'    ---           Server didn't respond in time.
  // CONNECTION_ERROR 'CONNECTION_ERROR' ---           Server not available, bad dns.
  // NETWORK_ERROR    'NETWORK_ERROR'    ---           Network not available.
  // CANCEL_ERROR     'CANCEL_ERROR'     ---           Request has been cancelled. Only possible if `cancelToken` is provided in config, see axios `Cancellation`.

  const error = response.data || {};
  switch (response.problem) {
    case 'CLIENT_ERROR':
      if (response.status === 401) {
        errorCallback(action, response.data);
        // NavigatorService.navigate('Auth');
      } else if (errorCallback) {
        errorCallback(action, response.data);
      }
      break;
    case 'SERVER_ERROR': {
      const message = error.message ? error.message : error.code ? error.code : 'Internal Server Error.';

      errorCallback(action, { message });
      break;
    }
    case 'TIMEOUT_ERROR': {
      errorCallback(action, error);
      break;
    }
    case 'CONNECTION_ERROR': {
      errorCallback(action, error);
      break;
    }
    case 'NETWORK_ERROR': {
      if (networkCallback) {
        networkCallback(action, error);
      } else {
        errorCallback(action, error);
      }
      break;
    }
    case 'CANCEL_ERROR': {
      errorCallback(action, error);
      break;
    }
    default:
      errorCallback(action, {});
      break;
  }
}

export default {
  route,
};
