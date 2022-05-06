import { ConnectedRouter } from 'connected-react-router';
import 'react-awesome-lightbox/build/style.css';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import MainAppNavigator from './containers';
import createStore from './redux/store';
import './scss/styles.scss';
const { store, history } = createStore();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Router>
        <Route component={MainAppNavigator} />
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// workbox.register();
