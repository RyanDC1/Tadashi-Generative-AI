import { ConfigType } from '../../store/reducers/ConfigReducer'
import { ChatModes } from '../../models'
import { setChatMode } from '../../store/actions/ConfigActions'
import { StoreReducerType } from '../../store'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export default function useConfig() {
    const config = useSelector<StoreReducerType, ConfigType>(s => s.configReducer)
    const dispatch = useDispatch()

    const setChatModeState = (value: ChatModes) => setChatMode(value)(dispatch)

    return {
        ...config,
        setChatModeState
    }
}