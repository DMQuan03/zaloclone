import { createSlice } from "@reduxjs/toolkit";

export default  createSlice ({
    name : "auth",
    initialState : {
        currentUser : null,
    },

    reducers : {
        loginSuccess : (state , action) => {
            state.currentUser = action.payload
        },  
    }
})
