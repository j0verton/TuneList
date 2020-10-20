import React, { useContext, useEffect, useState, useRef } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Icon, Modal } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { Link, useHistory } from "react-router-dom"


export const ListCard = ({tunesArr}) => {
    const [open, setOpen] = useState(false)
    const { deleteTune } = useContext(TuneContext)
    const history = useHistory()

    return tunesArr[0] ? (
        <>
        {console.log("tunesArr", tunesArr)}
        {tunesArr.map(tune => {
            console.log("tune in list card",tune)
            return <>
            <Modal
                closeIcon
                size="mini"
                trigger={
                    <Button as='h3'                
                        id={tune.id} 
                        className="tuneEntry"
                    >
                        {tune.name}
                    </Button>}
                open={open}
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                className="tune--container"
                >
                <Modal.Content className="tune--headercontainer">
                <Header as='h3'>{tune.name}</Header>
                <Header as='h4'>{tune.key/tune.tuning}</Header>
                </Modal.Content>
                <p>source: {tune.source}</p>
                <p>{tune.notes}</p>
                <a href={tune.link}>listen</a>
                <Modal.Actions>
                    <Button icon onClick={() => {
                        history.push(`/tunes/edit/${tune.id}`)
                    }}><Icon name='edit outline' /></Button>
                    <Button color="red" icon id="deleteTune--${tune.id}" className="trashBtn" onClick={
                        () => {
                            deleteTune(tune.id)
                        }}><Icon name='trash alternate outline' /></Button>
                </Modal.Actions>
            </Modal>
                </>
            
            })
    }
    </>
    
    ) : null
    
}