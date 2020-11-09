import React, { useContext, useEffect, useState } from "react";
import { PhotoContext } from "../photo/PhotoProvider";
import {Button, Header, Image, Input, Form} from "semantic-ui-react"
import "./Options.css"
import { CollectionContext } from "../collections/CollectionsProvider";
export const OptionsList = () => {
    const {addCustomCollection, editCollection, getCustomCollectionsByUserId} = useContext(CollectionContext)
    const {getPhotosByUserId, addPhoto, deletePhoto} = useContext(PhotoContext)
    
    const [ collection, setCollection ] = useState({})
    const [ images,  setImages] =useState([])
    const [ loading, setLoading ] = useState(false)
    const [ customCollections, setCustomCollections] = useState([])

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
    const handleSave = (e, d) => {
        console.log(d)
    }
    const handleDelete = (e, data) => {
        setLoading(true)
        deletePhoto(data.id)
        .then(()=>{
            setLoading(false) 
        })
    }

    const handleControlledInputChange = (event) => {
        const newCollection = { ...collection }
        newCollection[event.target.name] = event.target.value
        setCollection(newCollection)
    }

    useEffect(()=> {
        getPhotosByUserId(localStorage.getItem("tunes_user"))
        .then(setImages)
    }, [loading])

    useEffect(()=> {
        getCustomCollectionsByUserId(localStorage.getItem("tunes_user"))
        .then(setCustomCollections)
    }, [loading])
    

    return (
        <section className="optionsContainer">
            <Header as="h2">create a custom collection</Header>
            <Form onSubmit={handleSave}>
                <Input 
                    type="text"
                    onChange={handleControlledInputChange}/>
                <Button
                    primary
                    type="submit"
                    id="save"
                    size="medium"
                    className="btn btn-primary save"
                >Save Collection</Button>
                </Form>


            <Header as="h2">upload a backgound photo</Header>
            <Input type="file"
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