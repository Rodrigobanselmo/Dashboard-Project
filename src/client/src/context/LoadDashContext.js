import React, { useContext, useState } from "react"
import {LoaderDashboard} from '../components/Main/Loader'

const LoaderDashContext = React.createContext()

export function useLoaderDash() {
  return useContext(LoaderDashContext)
}

export default function LoaderDashProvider(props) {
  const [loadDash, setLoadDash] = useState(false)


  return (
    <LoaderDashContext.Provider value={{setLoadDash,loadDash}}>
    {loadDash && <LoaderDashboard open={props.open} load={loadDash}/>}
      {props.children}
    </LoaderDashContext.Provider>
  )
}