import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { setUserType, userStateType } from "./types"

const initialState: userStateType = {
   userName: "",
   userEmail: "",
   uid: "",
}

const userSlice = createSlice({
   name: "user",
   initialState,
   reducers: {
      setUser(state, action: PayloadAction<setUserType>) {
         state.userEmail = action.payload.userEmail
         state.userName = action.payload.userName
         state.uid = action.payload.uid
      },
      clearUser(state) {
         state.userEmail = ""
         state.userName = ""
         state.uid = ""
      },
   },
})

export const { setUser, clearUser } = userSlice.actions

export default userSlice.reducer
