import {useState} from 'react';

const useFade = (initial) => {

    const [fade, seFade] = useState(true);
    const [change, setChange] = useState(initial);

    function fadeInOut(action,next) {
        if (fade === true) {
            action()
            seFade(false)
            setTimeout(() => {
                setChange(next)
                seFade(true)
            }, 650);
        }
    }

    return [fade,change,fadeInOut]
}

export default useFade