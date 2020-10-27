import React, { useState, createContext } from "react"

export const CollectionContext = createContext()

export const CollectionProvider = props => {

    const [collections, setCollections] = useState([])

    const getCollections = () => {
        return fetch('http://localhost:8088/collections?_expand=user')
        .then(response => response.json())
        .then(setCollections)
    }
    
    // adds new collections to database
    const saveCollection = (tuning, key, collectionName="") => {
        if (collectionName===""){
            if (tuning==="standard"){
                collectionName = key.toUpperCase()
            } else if (tuning !=="standard"){
                collectionName = key.toUpperCase()/tuning
            }
        }        
        return fetch('http://localhost:8088/collections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: localStorage.getItem("tunes_user"),
                name: collectionName
            })
        })
    }
    
    // allows user to edit their collections
    const editCollection = collectionObj => {
        return fetch(`http://localhost:8088/collections/${collectionObj.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(collectionObj)
        })
    }
    
    // removes collection from database
    const deleteCollection = collectionId => {
        return fetch(`http://localhost:8088/news/${collectionId}`, {
            method: 'DELETE'
        }).then(getCollections)
    }

    const getCollectionById = id => {
        return fetch(`http://localhost:8088/collections/${id}?_expand=user&_embed=tuneCollections`)
            .then(res => res.json())
    }
            
    const getCollectionsByUserId = (userId) => {
        return fetch(`http://localhost:8088/collections?userId=${userId}&_embed=tuneCollections`)
        .then(res => res.json())
        .then(res=> {
            console.log("res in get coll", res)
            setCollections(res)
            return collections
        })
    }

    return (
        <CollectionContext.Provider value={{
            collections, getCollections, saveCollection, deleteCollection, getCollectionsByUserId
        }}>
            {props.children}
        </CollectionContext.Provider>
    )
}
