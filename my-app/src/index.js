import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from "redux";
import reduxThunk from "redux-thunk";

import { PersistGate } from "redux-persist/lib/integration/react";

import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducers";

import App from "./App";
import './index.css';

const persistConfig = {
	key: "root",
	storage: storage,
	blacklist: ["error"],
};

const pReducer = persistReducer(persistConfig, rootReducer);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(pReducer, composeEnhancers(applyMiddleware(reduxThunk)));

const persistor = persistStore(store, {});

ReactDOM.render(<Provider store={store} >
	<PersistGate persistor={persistor}><App /></PersistGate>
</Provider>, document.querySelector("#root"));
