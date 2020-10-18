import React, { useState, createContext } from "react"

export const CollectionContext = createContext()

export const CollectionProvider = props => {
    const [collection, setCollection] = useState([])
    const [collection, setcollection] = useState({})
    const getCollections = () => {
        return fetch('http://localhost:8088/collections?_expand=user')
        .then(response => response.json())
        .then(res=> res.reverse())
        .then(setcollections)
    }
    
    // adds new collections to database
    const saveCollection = collectionObj => {
        return fetch('http://localhost:8088/collections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(collectionObj)
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

    const getcollectionById = id => {
        return fetch(`http://localhost:8088/collections/${id}?_expand=user&_embed=collectionCollections`)
            .then(res => res.json())
            .then(res => {
                console.log("res", res)
                return res
            })
    }

    const getCollectionsByUserId = (userId) => {
        return fetch(`http://localhost:8088/collections?userId=${userId}&_embed=collectionCollections`)
            .then(res => res.json())
    }
    http://localhost:8088/collections?userId=1&_embed=collectionCollections
    return (
        <CollectionContext.Provider value={{
            collections, getCollections, saveCollection, deleteCollection, editcollection, getCollectionById, getCollectionsByUserId
        }}>
            {props.children}
        </CollectionContext.Provider>
    )
}