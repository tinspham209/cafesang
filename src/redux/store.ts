import { routerMiddleware } from 'connected-react-router';
// use Redux DevTools instead, use console for different types of message
// https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
import { createBrowserHistory } from 'history';
import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import createRootReducer from './rootReducer';
import rootSaga from './rootSaga';

// creates the store
/* ------------- Redux Configuration ------------- */


/* ------------- Saga Middleware ------------- */
const sagaMiddleware = createSagaMiddleware();

/* ------------- History Middleware ------------- */
const history = createBrowserHistory();
const historyMiddleware = routerMiddleware(history);

/* ------------- Assemble Middleware ------------- */

const rootReducer = createRootReducer(history);

let composeEnhancers = null;

if ((window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
  composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    actionSanitizer: action => {
      const message = action.payload && action.payload.message;
      return (action.type as string).endsWith('FAILURE')
        ? {
            ...action,
            payload: message,
          }
        : action;
    },
  });
} else {
  composeEnhancers = compose;
}

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(
      historyMiddleware,
      //  logger,
      sagaMiddleware,
    ),
  ),
);

sagaMiddleware.run(rootSaga);

export default () => ({
  store,
  history,
});
