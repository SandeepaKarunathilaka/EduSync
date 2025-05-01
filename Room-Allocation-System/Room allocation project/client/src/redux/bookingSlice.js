import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import socket from "../socket";

// ✅ Fetch All Bookings (Admin or Authenticated User)
export const fetchBookings = createAsyncThunk("booking/fetch", async(_, thunkAPI) => {
    try {
        const res = await axios.get("http://localhost:3000/api/bookings", {
            withCredentials: true, // Required for cookies
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message || "Fetch failed");
    }
});

// ✅ Create Booking (User)
export const createBooking = createAsyncThunk("booking/create", async(bookingData, thunkAPI) => {
    try {
        const res = await axios.post("http://localhost:3000/api/bookings/create", bookingData, {
            withCredentials: true,
        });
        return res.data.booking;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message || "Create failed");
    }
});

// ✅ Update Booking Status (Admin)
export const updateBookingStatus = createAsyncThunk("booking/updateStatus", async({ bookingId, status }, thunkAPI) => {
    try {
        const res = await axios.put(`http://localhost:3000/api/bookings/${bookingId}`, { status }, {
            withCredentials: true,
        });
        return res.data.booking;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message || "Failed to update booking");
    }
});

// ✅ Listen for Socket Updates
export const listenBookingUpdates = (dispatch) => {
    socket.on("bookingStatusChanged", (data) => {
        dispatch(updateBookingStatusSuccess(data));
    });
};

const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        bookings: [],
        loading: false,
        error: null,
    },
    reducers: {
        updateBookingStatusSuccess: (state, action) => {
            const { bookingId, status } = action.payload;
            const booking = state.bookings.find((b) => b._id === bookingId);
            if (booking) {
                booking.status = status;
            }
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings = action.payload;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createBooking.pending, (state) => {
                state.loading = true;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.loading = false;
                state.bookings.push(action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateBookingStatus.fulfilled, (state, action) => {
                const updated = action.payload;
                const idx = state.bookings.findIndex((b) => b._id === updated._id);
                if (idx !== -1) {
                    state.bookings[idx] = updated;
                }
            });
    },
});

// ✅ Export the reducer and action
export const { updateBookingStatusSuccess } = bookingSlice.actions;
export default bookingSlice.reducer;