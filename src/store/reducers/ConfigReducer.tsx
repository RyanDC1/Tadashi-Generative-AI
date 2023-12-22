import { PayloadAction, SliceCaseReducers, SliceSelectors, createSlice } from "@reduxjs/toolkit";
import { ChatModes } from "../../models";

export type ConfigType = {
    chatMode: ChatModes
}

export const initialState = {
    chatMode: ChatModes.Balanced
}

const configReducer = createSlice<ConfigType, SliceCaseReducers<ConfigType>, string, SliceSelectors<ConfigType>, string>({
    name: 'CONFIG_REDUCER',
    initialState: initialState,
    reducers: {
        setChatModeAction: (state, action: PayloadAction<ChatModes>) => ({ ...state, chatMode: action.payload })
    }
})

export const { setChatModeAction } = configReducer.actions
export default configReducer.reducer