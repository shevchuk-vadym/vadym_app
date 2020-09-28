import { combineReducers, compose, createStore, applyMiddleware } from "redux";

export interface AppState {}
// @ts-ignore
const composeEnchancers =
  process.env.NODE_ENV !== "production" &&
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // @ts-ignore
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

export default function configureStore(history: History, InitialState = {}) {
  const rootReducer = combineReducers<AppState>({});
  return createStore(
    rootReducer,
    InitialState,
    composeEnchancers(applyMiddleware())
  );
}
