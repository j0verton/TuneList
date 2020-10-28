import React, { useContext } from "react"
import "./Tune.css"
import { Button, Header, Icon, Modal, Rating, Image } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { useHistory, useParams } from "react-router-dom"

export const TuneCard = (props) => {
    //useContext hook allows the use of functions form the tuneProvider
    const { saveTune, deleteTune, addStarToTune, removeStarFromTune } = useContext(TuneContext)
    const history = useHistory()

    const handleStar = (event, data) => {
        console.log("data",data)
        console.log("event", event.target)
        const [prefix, tuneId] = data.id.split("__")
        console.log(tuneObj.id)
        data.rating === 0 ? removeStarFromTune(tuneId): addStarToTune(tuneId)
    }

    const tuneObj = props.tuneObj
    //returns an tune in semantic Ui elements, pass as a prop a function that will set modal to false line 31
    return (
        <Modal
        closeIcon
        // value={props.value}
        // onClick={closeModal}
        size="mini"
        open={props.handleOpen} 
        onClose={props.handleClose} 

        className="tune--container"
        >
                <Modal.Content className="tune--headercontainer">
                <Header as='h3'>{tuneObj.name}</Header>
                <Header as='h4'>{tuneObj.key}/{tuneObj.tuning}</Header>
                <Rating 
                icon='star'
                id={`tune__${tuneObj.id}`}
                defaultRating={tuneObj.starred}
                onRate={handleStar}
                />

                </Modal.Content>
                <Modal.Content>
                <p>source: {tuneObj.source}</p>
                <p>{tuneObj.notes}</p>
                {tuneObj.link ? <a href={tuneObj.link}>listen</a>: null}
                {tuneObj.audioUpload ?
                <audio controls>
                  <source src={tuneObj.audioUpload} type="audio/mpeg" />
                </audio>
                : null
              }
              {tuneObj.imageUpload ?
               <Image src={tuneObj.imageUpload} size='small' />
                : null
              }
                </Modal.Content>
                <Modal.Actions>
                    <Button icon onClick={() => {
                        history.push(`/tunes/edit/${tuneObj?.id}`)
                    }}><Icon name='edit outline' /></Button>
                    <Button color="red" icon id="deleteTune--${tune.id}" className="trashBtn" onClick={
                        () => {
                            deleteTune(tuneObj.id)
                            .then(history.push(`/tunes`))}}>
                        <Icon name='trash alternate outline' /></Button>
                        { tuneObj.userId !== parseInt(localStorage.getItem("tunes_user")) ? 
                        <Button icon id="addTune--${tune.id}" className="addTune" onClick={
                            () => {
                                let newTuneObj = {...tuneObj}
                                newTuneObj.userId = parseInt(localStorage.getItem("tunes_user"))
                                delete newTuneObj.id
                                newTuneObj.notes = ""
                                saveTune(newTuneObj)
                                .then(history.push(`/users`))}}>
                            <Icon name='add circle' /></Button> : null
                        }
                </Modal.Actions>
            </Modal>
    )
}