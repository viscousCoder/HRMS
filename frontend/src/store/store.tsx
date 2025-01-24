import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice.tsx";
import hrReducer from "./hrSlice.tsx";
import calenderReducer from "./calenderSlice.tsx";

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
    hr: hrReducer,
    calender: calenderReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
