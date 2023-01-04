import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './slice/sliceContact';
import { filterReducer } from './slice/sliceFilter';

export const store = configureStore({
  reducer: {
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
