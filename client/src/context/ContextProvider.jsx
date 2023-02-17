import React, { createContext, useContext, useState } from 'react';

const StateContext = createContext({});

const initialAlert = {message: '', type: ''}

export const ContextProvider = ({ children }) => {
    const [showAlert, setShowAlert] = useState(false)
    const [alert, setAlert] = useState(initialAlert)

    const openAlert = (message, type = 'info') => {
        setAlert({ message, type })
        setShowAlert(true)
    }

    const closeAlert = () => {
        setShowAlert(false)
    }

    return (
        <StateContext.Provider
            value={{
                showAlert,
                openAlert,
                closeAlert,
                alert
            }}
        >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);