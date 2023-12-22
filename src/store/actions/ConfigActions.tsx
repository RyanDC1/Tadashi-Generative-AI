import { ChatModes } from "../../models";
import { setChatModeAction } from "../reducers";
import { StoreDispatchType } from "../store";

export const setChatMode = (chatMode: ChatModes) => (dispatch: StoreDispatchType) => dispatch(setChatModeAction(chatMode))