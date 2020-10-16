import React, { useState, createContext } from "react"

export const TuneContext = props => {
    const [tunes, setTunes] = useState([])

    const getTunes = () => {
        return fetch('http://localhost:8088/news?_expand=user')
        .then(response => response.json())
        .then(res=> res.reverse())
        .then(setTunes)
    }
    
    // adds new Tunes to database
    const saveTune = tuneObj => {
        return fetch('http://localhost:8088/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tuneObj)
        })
    }
    
    // allows user to edit their Tunes
    const editTune = tuneObj => {
        return fetch(`http://localhost:8088/news/${tuneObj.id}`, {
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
        }).then(getTunes)
    }

    const getTuneById = (id) => {
        return fetch(`http://localhost:8088/news/${id}?_expand=user`)
            .then(res => res.json())
    }

    const getTunesByUserId = (userId) => {
        return fetch(`http://localhost:8088/news/${userId}?_expand=tunes`)
            .then(res => res.json())
    }

    return (
        <TuneContext.Provider value={{
            tunes, getTunes, saveTune, deleteTune, editTune, getTuneById, getTunesByUserId
        }}>
            {props.children}
        </TuneContext.Provider>
    )
}