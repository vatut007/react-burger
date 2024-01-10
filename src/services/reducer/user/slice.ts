import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types/user";

export const userSlice = createSlice({
    name: "user",
    reducerPath: "user",
    initialState:{
        user: null as User|null,
        accessToken: null as string|null,
        refreshToken: null as string|null,
    },
    reducers:{
        addUser:{
            reducer(
                state,
                action: PayloadAction<{email:string, name: string}>,
                {
                    state.user = action.payload.user;
                }
            )
        }
    }
})