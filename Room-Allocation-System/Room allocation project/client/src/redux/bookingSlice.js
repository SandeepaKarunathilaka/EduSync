// bookingSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


export const fetchBookings = createAsyncThunk("booking/fetch", async(_, thunkAPI) => {
    try {
        const res = await axios.get("http://localhost:3000/api/bookings", {
            withCredentials: true, // ✅ VERY IMPORTANT: send cookies
        });
        return res.data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message || "Fetch failed");
    }
});

// ✅ Create booking (user)
export const createBooking = createAsyncThunk("booking/create", async(bookingData, thunkAPI) => {
    try {
        const res = await axios.post("/api/bookings/create", bookingData, {
            withCredentials: true,
        });
        return res.data.booking; // We return the booking object only
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message || "Fetch failed");
    }
});

// ✅ Update booking status (admin)
export const updateBookingStatus = createAsyncThunk("booking/updateStatus", async({ bookingId, status }, thunkAPI) => {
    try {
        const res = await axios.put(`/api/bookings/${bookingId}`, { status }, { withCredentials: true });
        return res.data.booking;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.response.data.message || "Failed to update booking");
    }
});




const bookingSlice = createSlice({
    name: "booking",
    initialState: {
        bookings: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
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

export default bookingSlice.reducer;