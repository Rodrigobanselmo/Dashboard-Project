
import { useState } from 'react'

function useTimeOut() {
    
    const [state, setState] = useState(null)

    function onTimeOut(action,time) {
        clearTimeout(state);
        setState(setTimeout(() => {action()}, time))
    }

    function onClearTimeOut() {
        clearTimeout(state);
    }


    return [onTimeOut,onClearTimeOut]
}

export default useTimeOut


