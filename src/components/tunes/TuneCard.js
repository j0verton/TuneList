import React, { useContext, useEffect, useState } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Icon, Modal } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { useHistory, useParams } from "react-router-dom"

export const TuneCard = (tuneObj) => {
    //useContext hook allows the use of functions form the tuneProvider
    const { tune, getTunesByUserId, getTuneById, deleteTune } = useContext(TuneContext)

    const history = useHistory()
    const [ modal, showModal ] = useState(false)
    const tuneId = useParams()
    const [open, setOpen] = useState(false)
    useEffect(()=> {
        getTuneById(tuneId)
        console.log("tuneObj",tuneObj)
        console.log("tune",tune)
    }, [])

    //returns an tune in semantic Ui elements, pass as a prop a function that will set modal to false line 31
    return (
        <Modal
        closeIcon
        size="mini"
        open={true}
        onClose={() => showModal(false)}
        onOpen={() => showModal(true)}
        className="tune--container"
        >
                <Modal.Content className="tune--headercontainer">
                <Header as='h3'>{tuneObj.tune.name}</Header>
                <Header as='h4'>{tuneObj.tune.key/tuneObj.tune.tuning}</Header>
                </Modal.Content>
                <p>source: {tuneObj.tune.source}</p>
                <p>{tuneObj.tune.notes}</p>
                <a href={tuneObj.tune.link}>listen</a>
                <Modal.Actions>
                    <Button icon onClick={() => {
                        history.push(`/tunes/edit/${tuneObj?.tune.id}`)
                    }}><Icon name='edit outline' /></Button>
                    <Button color="red" icon id="deleteTune--${tune.id}" className="trashBtn" onClick={
                        () => {
                            deleteTune(tuneObj.tune.id)
                        }}><Icon name='trash alternate outline' /></Button>
                </Modal.Actions>
            </Modal>
    )
}