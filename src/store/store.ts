import { configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "@reduxjs/toolkit";
import { CompanyInfoApi } from "./services/Settings";
import { CountriesApi } from "./services/Countries";
import { PackagesApi } from "./services/Packages";
import { HomeApi } from "./services/Home";
import { AuctionsApi } from "./services/Auctions";
import { ProfileApi } from "./services/Auth/Profile";
import { AuthApi } from "./services/Auth/Auth";
import { ProductsApi } from "./services/Products";

// import CustomizeMenuReducer from "@/store/features/CustomizeMenu/CustomizeMenu";

const rootReducer = combineReducers({
  //   userData: userDataReducer,
  // CustomizeMenu: CustomizeMenuReducer,
  [AuthApi.reducerPath]: AuthApi.reducer,
  [ProfileApi.reducerPath]: ProfileApi.reducer,
  [HomeApi.reducerPath]: HomeApi.reducer,
  [CompanyInfoApi.reducerPath]: CompanyInfoApi.reducer,
  [ProductsApi.reducerPath]: ProductsApi.reducer,
  [CountriesApi.reducerPath]: CountriesApi.reducer,
  [AuctionsApi.reducerPath]: AuctionsApi.reducer,
  [PackagesApi.reducerPath]: PackagesApi.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userData", "CustomizeMenu"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      AuthApi.middleware,
      ProfileApi.middleware,
      HomeApi.middleware,
      CountriesApi.middleware,
      PackagesApi.middleware,
      AuctionsApi.middleware,
      ProductsApi.middleware,
      CompanyInfoApi.middleware
    ),
});

export const persistor = persistStore(store);

// Infer the type of makeStore
export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
