import {useState} from 'react';

//Esse hook serve para eu poder fazer uma acao onde vai esperar um tempo para realizar outra acao bloqueando o click se quiser

const useWaitAction = (initial) => {

    const [noHandle, setNoHandle] = useState(true);
    const [value, setValue] = useState(initial);

    function onActionTimeOut(beforeValue,nextValue,nextAction,time) {
        if (noHandle === true) {
            setNoHandle(false)
            if (beforeValue) setValue(beforeValue)
            setTimeout(() => {
                if (nextValue) { setValue(nextValue) }
                else if (nextValue === null) {
                    setTimeout(() => {setValue(null)},100)
                }
                if (nextAction) nextAction()
                setNoHandle(true)
            }, time);
        }
    }

    return [noHandle,value,onActionTimeOut]
}

export default useWaitAction