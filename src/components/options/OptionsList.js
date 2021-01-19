import React, { useContext, useEffect, useState } from "react";
import { PhotoContext } from "../photo/PhotoProvider";
import { Button, Header, Image, Input, Form, Modal } from "semantic-ui-react"
import "./Options.css"
import { CollectionContext } from "../collections/CollectionsProvider";
export const OptionsList = () => {
    const { addCustomCollection, editCollection, getCustomCollectionsByUserId } = useContext(CollectionContext)
    const { getPhotosByUserId, addPhoto, deletePhoto } = useContext(PhotoContext)
    const [alert, showAlert] = useState(false)
    const [button, showButton] = useState(false)
    const [collection, setCollection] = useState({})
    const [images, setImages] = useState([])
    const [loading, setLoading] = useState(false)
    const [customCollections, setCustomCollections] = useState([])

    const handleAlert = () => {
        showAlert(false)
    }
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
        console.log(d, e)
        console.log(collection)
        addCustomCollection(collection.name)
    }
    const handleDelete = (e, data) => {
        setLoading(true)
        deletePhoto(data.id)
            .then(() => {
                setLoading(false)
            })
    }

    const handleControlledInputChange = (event) => {
        const newCollection = { ...collection }
        newCollection[event.target.name] = event.target.value
        setCollection(newCollection)
        showButton(true)
    }

    useEffect(() => {
        getPhotosByUserId(localStorage.getItem("tunes_user"))
            .then(setImages)
    }, [loading])

    useEffect(() => {
        getCustomCollectionsByUserId(localStorage.getItem("tunes_user"))
            .then(setCustomCollections)
    }, [loading, collection])


    return (
        <section className="optionsContainer">
            <Header as="h2">Create a Custom Collection</Header>
            <Form onSubmit={() => {
                handleSave()
                showAlert(true)
            }}>
                <Input
                    onChange={handleControlledInputChange}
                    name='name'
                    type="text"
                />
                {button ?
                    <Button
                        primary
                        type="submit"
                        id="save"
                        size="medium"
                        className="btn btn-primary save"
                    >Save Collection</Button>
                    : null}
            </Form>
            <Modal
                open={alert}
                size="large"
                onClose={handleAlert}>
                <Header className="alert"> Collection Added</Header>
            </Modal>
            <section>
                <h2>Custom Collections</h2>
                {customCollections.length ?
                    customCollections.map(collection => {
                        console.log("collection", collection)
                        return <p>{collection.name}</p>
                    })
                    : null
                }
            </section>
            <Header as="h2">Upload a Backgound Photo</Header>
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
                    ) :
                        images.map(imageObj => {
                            console.log(imageObj)
                            return <div className="imageWrapper"><Image className="backgroundPhoto" src={imageObj.url} style={{ width: "300px" }} />
                                <Button id={imageObj.id} onClick={handleDelete} className="imageDelete">delete</Button></div>
                        })
                        : <p>Add photos for a custom background on the Home page!</p>
                }
            </div>

        </section>
    )
}