import React, { useState, createContext } from "react"

export const PhotoContext = createContext()

export const PhotoProvider = props => {
    

        const getPhotos = () => {
            return fetch('http://localhost:8088/photos')
            .then(response => response.json())
        }

        
        return (
        <PhotoContext.Provider value={{
            getPhotos
        }}>
            {props.children}
        </PhotoContext.Provider>
    )
}