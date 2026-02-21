import {configureStore} from "@reduxjs/toolkit"
import noteReducer from "../redux/noteSlice"; 
export const store = configureStore({
  reducer: {
    notes: noteReducer,
  },
});
export default store;