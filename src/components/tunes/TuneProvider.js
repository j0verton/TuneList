import React, { useState, createContext } from "react"

export const TuneContext = createContext()

export const TuneProvider = props => {
    const [tunes, setTunes] = useState([])
    const [tune, setTune] = useState({})
    const getTunes = () => {
        return fetch('http://localhost:8088/tunes?_expand=user')
        .then(response => response.json())
        .then(res=> res.reverse())
        .then(setTunes)
    }
    
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
        }).then(getTunes)
    }

    const getTuneById = id => {
        return fetch(`http://localhost:8088/tunes/${id}?_expand=user&_embed=tuneCollections`)
            .then(res => res.json())
            .then(res => {
                console.log("res", res)
                return res
            })
    }

    const getTunesByUserId = (userId) => {
        return fetch(`http://localhost:8088/tunes/${userId}?_embed=tunes&_embed=collections`)
            .then(res => res.json())
    }

    const getCollectionsByUserId = (userId) => {
        return fetch(`http://localhost:8088/collections?userId=${userId}&_embed=tuneCollections`)
            .then(res => res.json())
    }
    http://localhost:8088/collections?userId=1&_embed=tuneCollections
    return (
        <TuneContext.Provider value={{
            tunes, getTunes, saveTune, deleteTune, editTune, getTuneById, getTunesByUserId, getCollectionsByUserId
        }}>
            {props.children}
        </TuneContext.Provider>
    )
}