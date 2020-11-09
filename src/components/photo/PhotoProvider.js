import React, { createContext } from "react"

export const PhotoContext = createContext()

export const PhotoProvider = props => {
    
    const addPhoto =(url)=> {
        return fetch('http://localhost:8088/photos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    userId:parseInt(localStorage.getItem("tunes_user")),
                    url:url
                }
            )
        })
        .then(res=> res.json())
    }

        const getPhotos = () => {
            return fetch('http://localhost:8088/photos')
            .then(response => response.json())
        }

        const getPhotosByUserId = (userId) => {
            return fetch(`http://localhost:8088/photos/?userId=${userId}`)
            .then(response => response.json())
        }
        const deletePhoto = photoId => {
            return fetch(`http://localhost:8088/photos/${photoId}`, {
                method: 'DELETE'
            })
        }
        

        return (
        <PhotoContext.Provider value={{
            getPhotos, getPhotosByUserId, addPhoto, deletePhoto
        }}>
            {props.children}
        </PhotoContext.Provider>
    )
}