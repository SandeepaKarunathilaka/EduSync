import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

// ✅ Fetch all rooms
export const fetchRooms = createAsyncThunk("room/fetchRooms", async() => {
    const res = await axios.get("http://localhost:3000/api/rooms/getrooms"); // Ensure URL matches Postman
    return res.data;
});

// ✅ Create a new room
export const createRoom = createAsyncThunk("room/createRoom", async(roomData) => {
    const res = await axios.post("/api/rooms/create", roomData);
    return res.data;
});

// ✅ Update Room
export const updateRoom = createAsyncThunk("room/updateRoom", async(roomData, thunkAPI) => {
    try {
        const res = await axios.put(`/api/rooms/updateroom/${roomData.id}`, roomData);
        return res.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});



// ✅ Delete Room
export const deleteRoom = createAsyncThunk("room/deleteRoom", async(roomId, thunkAPI) => {
    try {
        await axios.delete(`/api/rooms/deleteroom/${roomId}`);
        return roomId;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});
const roomSlice = createSlice({
    name: "room",
    initialState: {
        rooms: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRooms.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRooms.fulfilled, (state, action) => {
                state.loading = false;
                state.rooms = action.payload;
            })
            .addCase(fetchRooms.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(createRoom.fulfilled, (state, action) => {
                state.rooms.push(action.payload);
            })
            .addCase(deleteRoom.fulfilled, (state, action) => {
                state.rooms = state.rooms.filter((room) => room._id !== action.payload);
            });
    },
});

export default roomSlice.reducer;