import React, { useMemo } from 'react'
import { isEmpty } from 'lodash'

type Props = {
    /**
     * @description specify the store to be used.
     * 
     * options: 'local', 'session'
     * 
     * @default 'local'
     */
    store: 'local' | 'session'
}

export default function useLocalStore(props?: Props) {
    const { store: defaultStore = 'local' } = props || {}

    const store: Storage = useMemo(() => defaultStore === 'local' ? localStorage : sessionStorage, [])

    const getFromStore = (key: string) => {
        try {
            return JSON.parse(store.getItem(key))
        }
        catch (error) {
            console.error("An error occurred while fetching from local store: ", error)
        }
    }

    const addToStore = <T extends any>(key: string, value: T) => {
        try {
            store.setItem(key, JSON.stringify(value))
        } catch (error) {
            console.error("An error occurred while adding to local store: ", error)
        }
    }

    const clearStore = (keys?: string[]) => {
        if (isEmpty(keys)) {
            store.clear()
        }
        else {
            keys.forEach(key => {
                store.removeItem(key)
            });
        }
    }

    return { getFromStore, addToStore, clearStore }
}