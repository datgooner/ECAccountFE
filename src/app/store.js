import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import authReducer from "../features/Auth/AuthSlice";
import accountReducer from "../features/AccManagement/accountSlice";
import chartReducer from "../features/Chart/chartSlice"
const rootReducer = {
  auth: authReducer,
  account: accountReducer,
  chart: chartReducer,
};
export const store = configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: ["account/exportAccountList/fulfilled"],
      
    },
  }),
  reducer: rootReducer,
});
