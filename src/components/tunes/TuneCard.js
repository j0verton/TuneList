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
    }, [])

    //returns an tune in semantic Ui elements, pass as a prop a function that will set modal to false line 31
    return (
            <Modal
                size="mini"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={true}
                className="tune--container"
            >
                <Modal.Content className="tune--headercontainer">
                <Header as='h3'>{tune.name}</Header>
                <Header as='h4'>{tune.key/tune.tuning}</Header>
                </Modal.Content>
                <p>source: {tune.source}</p>
                <p>{tune.notes}</p>
                <a href={tune.link}>listen</a>


                {/* <p>
                    Posted by: {tune.user.usename}
                    <Button size='mini' className="addButton"
                        onClick={()=>showModal(true)}
                        >
                        <Icon name="user"></Icon>
                        {tune.user.username}
                    </Button>
                </p> */}
                <Modal.Actions>
                    <Button icon onClick={() => {
                        history.push(`/tunes/edit/${tune?.id}`)
                    }}><Icon name='edit outline' /></Button>
                    <Button color="red" icon id="deleteTune--${tune.id}" className="trashBtn" onClick={
                        () => {
                            deleteTune(tune.id)
                        }}><Icon name='trash alternate outline' /></Button>
                </Modal.Actions>
            </Modal>
    )
}