import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { combineReducers } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'

import { metricsSwitches } from 'design/pages/VidStats/StatsOld/MetricsSwitches/MetricsSwitches.slice'
import { statsTableColumnsMenu } from 'design/organisms/StatsTable/StatsTableColumnsMenu/StatsTableColumnsMenu.slice'
import { statsDateRange } from 'design/pages/VidStats/StatsOld/DatePicker/statsDateRange.slice'
import { funnelBranchStash } from 'design/pages/Funnel/Branch/funnelBranchStash.slice'
import { videoCompare } from 'design/pages/VidStats/StatsOld/PlayersContainer/videoCompare.slice'
import { videoSettings } from 'design/pages/VidSettings/VidSettings.slice'
import { uploader } from 'design/pages/VideoUpload/uploader.slice'
import { subscription, modalController } from 'design/templates/Modal'
import { modal } from 'design/templates/Modal/ModalTypes/modal.slice'
import { account } from 'design/pages/AccountSettings/account.slice'
import {
    ANALYTICS_SWITCH_KEY,
    analyticsSwitch,
} from 'design/pages/SmartVid/Header/Actions/AnalyticsSwitch/AnalyticsSwitch.slice'

const reducers = combineReducers({
    account,
    funnelBranchStash,
    metricsSwitches,
    statsTableColumnsMenu,
    modal,
    modalController,
    statsDateRange,
    subscription,
    uploader,
    videoCompare,
    videoSettings,
    analyticsSwitch,
})

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'funnelBranchStash',
        'statsDateRange',
        'metricsSwitches',
        'statsTableColumnsMenu',
        'account',
        ANALYTICS_SWITCH_KEY,
    ],
}

const persistedReducer = persistReducer(persistConfig, reducers)

export const appStore = configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV === 'development',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(appStore)

export type RootState = ReturnType<typeof appStore.getState>
export type AppDispatch = typeof appStore.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
