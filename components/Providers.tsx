"use client"

import { useRef } from "react"
import { Provider } from "react-redux"
import { getStore } from "@/store"

const Providers = ({ children }: { children: React.ReactNode }) => {
    const storeRef = useRef<any>(null)

    if (!storeRef.current) {
        storeRef.current = getStore()
    }

    return <Provider store={storeRef.current}>{children}</Provider>
}

export default Providers
