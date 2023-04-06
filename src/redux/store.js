import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../redux/Slice/sliceUser"
import chatslice from "./Slice/chatslice";
const store = configureStore({
    reducer : {
        auth : userSlice.reducer,
        chat: chatslice.reducer
    }
})

export default store