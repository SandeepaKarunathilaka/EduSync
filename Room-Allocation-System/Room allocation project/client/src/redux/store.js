import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice.js';
import roomReducer from "./roomSlice";
import bookingReducer from "./bookingSlice"; // Import the bookingReducer
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // Using localStorage for persistence

// ✅ Combine reducers
const rootReducer = combineReducers({
    user: userReducer, // User data
    room: roomReducer, // Room management data
    booking: bookingReducer, // Booking data (added bookingReducer)
});

// ✅ Persist Configuration
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

// ✅ Apply persistReducer to rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// ✅ Configure Store
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false, // Disable serializable check for non-serializable data (e.g., functions)
        }),
});

// ✅ Persistor for storing Redux state across refreshes
export const persistor = persistStore(store);