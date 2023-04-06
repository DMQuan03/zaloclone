import { createSlice } from "@reduxjs/toolkit";

export default createSlice({
    name : "chat",
    initialState : {
        idSearch : "",
        infoChatRoom : [],
    },
    reducers : {
        idRoom : (state , actions ) => {
            state.idSearch = actions.payload
        },
        getRoomSucees : (state , actions) => {
            state.infoChatRoom.shift()
            state.infoChatRoom.push(actions.payload)
        }
    }
})