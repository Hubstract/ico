// /**
//  * Create the store with dynamic reducers
//  */

// import { createStore, applyMiddleware, compose } from 'redux';
// import { routerMiddleware } from 'connected-react-router';
// import createSagaMiddleware from 'redux-saga';
// import createReducer from './reducers';
// import thunk from "redux-thunk";

// export default function configureStore(initialState = {}, history) {
//   let composeEnhancers = compose;
//   const reduxSagaMonitorOptions = {};

//   // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
//   /* istanbul ignore next */
//   if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
//     /* eslint-disable no-underscore-dangle */
//     if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
//       composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

//     // NOTE: Uncomment the code below to restore support for Redux Saga
//     // Dev Tools once it supports redux-saga version 1.x.x
//     // if (window.__SAGA_MONITOR_EXTENSION__)
//     //   reduxSagaMonitorOptions = {
//     //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
//     //   };
//     /* eslint-enable */
//   }

//   const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);

//   // Create the store with two middlewares
//   // 1. sagaMiddleware: Makes redux-sagas work
//   // 2. routerMiddleware: Syncs the location/URL path to the state
//   const middlewares = [sagaMiddleware, routerMiddleware(history)];

//   const enhancers = [applyMiddleware(...middlewares, thunk)];

//   const store = createStore(
//     createReducer(),
//     initialState,
//     composeEnhancers(...enhancers)
//   );

//   // Extensions
//   store.runSaga = sagaMiddleware.run;
//   store.injectedReducers = {}; // Reducer registry
//   store.injectedSagas = {}; // Saga registry

//   // Make reducers hot reloadable, see http://mxs.is/googmo
//   /* istanbul ignore next */
//   if (module.hot) {
//     module.hot.accept('./reducers', () => {
//       store.replaceReducer(createReducer(store.injectedReducers));
//     });
//   }

//   return store;
// }

import { applyMiddleware, compose, createStore } from "redux";
import rootReducers from "./reducers";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from "redux-saga";
// import rootSaga from '../sagas/index';

import { persistStore, persistCombineReducers } from "redux-persist";
import storage from "redux-persist/es/storage";
// import rootReducers from 'app/reducers';

const config = {
  key: "root",
  storage,
  whitelist: ['marketPlaceReducer'],
  // debug: true //to get useful logging
};
// -----------------------FROM PREVIOUS-------------------------------//
const history = createBrowserHistory();

// -----------------------FROM PREVIOUS-------------------------------//
const middleware = [];
const sagaMiddleware = createSagaMiddleware();
const routeMiddleware = routerMiddleware(history);
middleware.push(sagaMiddleware);
middleware.push(routeMiddleware);

const reducers = persistCombineReducers(config, rootReducers(history));
const enhancers = [applyMiddleware(...middleware)];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = { enhancers };
//export default function configureStore(initialState) {
const configureStore = () => {
  const store = createStore(
    reducers,
    undefined,
    composeEnhancers(applyMiddleware(...middleware))
  );

  const persistor = persistStore(store, persistConfig, () => {
    // console.log('Test', store.getState());
  });

  // sagaMiddleware.run(rootSaga);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("./reducers", () => {
      const nextRootReducer = require("./reducers");
      store.replaceReducer(nextRootReducer);
    });
  }
  return { persistor, store };
};

export default configureStore;

export { history };
