import React, { useState, createContext } from "react"

export const TuningContext = createContext()

export const TuningProvider = props => {
    const [tunings, setTunings] = useState([])

    const getTunings = () => {
        return fetch('http://localhost:8088/tunings')
        .then(response => response.json())
        .then(setTunings)
    }

    const addTuning = tuning => {
        return fetch("http://localhost:8088/tunings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tuning)
        })
    }
    return (
        <TuningContext.Provider value={{
            tunings, getTunings, addTuning
        }}>
            {props.children}
        </TuningContext.Provider>
    )
}