import React, { useContext, useState } from "react"
import {LoaderSimple} from '../components/Main/Loader'

const LoaderContext = React.createContext()

export function useLoaderScreen() {
  return useContext(LoaderContext)
}

export default function LoaderProvider(props) {
  const [load, setLoad] = useState(true)


  return (
    <LoaderContext.Provider value={{setLoad,load}}>
    {load && <LoaderSimple load={load}/>}
      {props.children}
    </LoaderContext.Provider>
  )
}