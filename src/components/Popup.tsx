import React, {useState } from 'react'

interface PopupProps {
    setPopup: (aBool: boolean)=>void,
    message: string,
    bool: boolean
}

const Popup: React.FC<PopupProps> = ({message, bool, setPopup}) => {

    const handleClose = ():void => {
        setPopup(false)
    }
    if (bool === true){
        return (
            <div className='popup'>
                <div className='popup-content'>
                    <p>{message}</p>
                    <button onClick={handleClose}>Close</button>
                </div>
            </div>
        )
    }
    return (
        <></>
    )
}

export default Popup