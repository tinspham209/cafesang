import { History } from 'history';
import appConfig from 'src/appConfig';
import { PATHS } from 'src/appConfig/paths';
import urlJoin from 'url-join';

let _history: History;

const setTopHistory = (history: History) => {
  _history = history;
};

const navigate = (routeName: string, state?) => {
  _history.push(routeName, state);
};

const replace = (routeName: string, state?) => {
  _history.replace(routeName, state);
};

const goBack = (backup = PATHS.home) => {
  var isCannotBack = _history.action === 'POP';
  isCannotBack ? _history.push(backup) : _history.back();
};

const getNextPathInBaseUrl = (nextPath?: string) => {
  const baseURL = appConfig.WEB_URL as string;
  const path = nextPath || _history.location.pathname;
  const url = urlJoin(baseURL, path);

  return url;
};

const jumpToCrossDomain = (subDomain: string, nextPath?: string) => {
  const toUrl = getNextPathInBaseUrl(nextPath);
  const toCrossUrl = toUrl.replace('://', `://${subDomain}.`);
  window.location.href = toCrossUrl;
};

export default {
  setTopHistory,
  navigate,
  goBack,
  replace,
  jumpToCrossDomain,
};
