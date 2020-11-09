import React, { useContext, useEffect, useState } from "react";
import { PhotoContext } from "../photo/PhotoProvider";
import {Button, Header, Image} from "semantic-ui-react"
import "./Options.css"
export const OptionsList = () => {

    const {getPhotosByUserId, addPhoto, deletePhoto} = useContext(PhotoContext)
    const [ images,  setImages] =useState([])
    const [ loading, setLoading ] = useState(false)

    const uploadImage = async e => {
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', "tunelist")
        setLoading(true)
        const response = await fetch(
            'https://api.cloudinary.com/v1_1/banjo/image/upload',
            {
                method: 'POST',
                body: data
            }
        )
        const responseImage = await response.json()
        await addPhoto(responseImage.url)
        // let photos = await getPhotosByUserId(localStorage.getItem("tunes_user")) 
        // setImages(photos)
        setLoading(false) 
    }
    const handleDelete = (e, data) => {
        setLoading(true)
        deletePhoto(data.id)
        .then(()=>{
            setLoading(false) 
        })
    }

    useEffect(()=> {
        getPhotosByUserId(localStorage.getItem("tunes_user"))
        .then(setImages)
    }, [loading])


    return (
        <section className="optionsContainer">
            <Header as="h2">create a custom collection</Header>
            <Header as="h2">upload a backgound photo</Header>
            <input type="file"
                name="file"
                placeholder="upload an Image"
                onChange={uploadImage}
            />
            <div>
                <Header as="h3" id="photoUploadsHeader">Current Background Photos </Header>
            {
            images.length ? loading ? (
                <h3>Loading...</h3>
            ): 
            images.map(imageObj=>  {
            console.log(imageObj)
            return <div className="imageWrapper"><Image className="backgroundPhoto" src={imageObj.url} style={{width : "300px"}} />
            <Button id={imageObj.id} onClick={handleDelete} className="imageDelete">delete</Button></div>}) 
                    : <p>Add photos for a custom background on the Home page!</p>
            }
            </div>

        </section>
    )}