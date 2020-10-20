import React, { useContext, useEffect, useState } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Icon, Modal } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { useHistory, useParams } from "react-router-dom"

export const TuneCard = ({props}) => {
    //useContext hook allows the use of functions form the tuneProvider
    const { tune, getTunesByUserId, getTuneById, deleteTune } = useContext(TuneContext)

    const history = useHistory()
    const [ modal, showModal ] = useState(true)
    const tuneId = useParams()
    const [open, setOpen] = useState(true)
    // function handleModal(event){
    //     props.onClose
    // }
    function handleModal(value)
    const tuneObj = props.tuneObj
    //returns an tune in semantic Ui elements, pass as a prop a function that will set modal to false line 31
    return (
        <Modal
        closeIcon
        value={props.value}
        // onClick={closeModal}
        size="mini"
        open={modal}

        onClose={() => {
            showModal(false)
        }}
        onOpen={() => showModal(true)}
        className="tune--container"
        >
                <Modal.Content className="tune--headercontainer">
                <Header as='h3'>{tuneObj.name}</Header>
                <Header as='h4'>{tuneObj.key}/{tuneObj.tuning}</Header>
                </Modal.Content>
                <p>source: {tuneObj.source}</p>
                <p>{tuneObj.notes}</p>
                <a href={tuneObj.link}>listen</a>
                <Modal.Actions>
                    <Button icon onClick={() => {
                        history.push(`/tunes/edit/${tuneObj?.id}`)
                    }}><Icon name='edit outline' /></Button>
                    <Button color="red" icon id="deleteTune--${tune.id}" className="trashBtn" onClick={
                        () => {
                            deleteTune(tuneObj.id)
                        }}><Icon name='trash alternate outline' /></Button>
                </Modal.Actions>
            </Modal>
    )
}