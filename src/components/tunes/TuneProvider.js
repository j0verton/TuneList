import React, { useState, createContext } from "react"

export const TuneContext = createContext()

export const TuneProvider = props => {
    const [tunes, setTunes] = useState([])
    const [tune, setTune] = useState({})

    // const getTunes = () => {
    //     return fetch('http://localhost:8088/tunes?_expand=user')
    //     .then(response => response.json())
    //     .then(res=> res.reverse())
    //     .then(setTunes)
    // }
    
    // adds new Tunes to database
    const saveTune = tuneObj => {
        return fetch('http://localhost:8088/tunes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tuneObj)
        })
    }
    
    // allows user to edit their Tunes
    const editTune = tuneObj => {
        return fetch(`http://localhost:8088/tunes/${tuneObj.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(tuneObj)
        })
    }
    
    // removes Tune from database
    const deleteTune = tuneId => {
        return fetch(`http://localhost:8088/news/${tuneId}`, {
            method: 'DELETE'
        })
    }

    const getTuneById = id => {
        return fetch(`http://localhost:8088/tunes/${id}`)
            .then(res => res.json())
            .then(setTune)
    }

    const getTunesByUserId = (userId) => {
        return fetch(`http://localhost:8088/tunes/?userId=${userId}`)
            .then(res => res.json())
            // .then(setTunes)
    }

    return (
        <TuneContext.Provider value={{
            tunes, saveTune, deleteTune, editTune, getTuneById, getTunesByUserId
        }}>
            {props.children}
        </TuneContext.Provider>
    )
}