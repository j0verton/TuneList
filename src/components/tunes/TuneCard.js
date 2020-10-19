import React, { useContext, useEffect, useState } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Icon } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { useHistory, useParams } from "react-router-dom"

export const Tune = () => {
    //useContext hook allows the use of functions form the tuneProvider
    const { tune, getTunesByUserId, getTuneById, deleteTune } = useContext(TuneContext)

    const history = useHistory()
    const [ modal, showModal ] = useState(false)
    const tuneId = useParams()

    useEffect(()=> {
        getTuneById(tuneId)
    }, [])

    //returns an tune in semantic Ui elements, pass as a prop a function that will set modal to false line 31
    return (
        <>
            <Container className="tune--container">
                <Container className="tune--headercontainer">
                <Header as='h3'>{tune.name}</Header>
                <Header as='h4'>{tune.key/tune.tuning}</Header>
                </Container>
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
                <div className="tune--actions">
                    <div className="formBtns">
                        {/* if the tune was posted by the current user it renders buttons for edit or delete */}
                        {tune.userid === parseInt(localStorage.getItem("tunes_user")) ?
                            <>
                                <Button icon onClick={() => {
                                    history.push(`/tunes/edit/${tune?.id}`)
                                }}><Icon name='edit outline' /></Button>
                                <Button color="red" icon id="deleteTune--${tune.id}" className="trashBtn" onClick={
                                    () => {
                                        deleteTune(tune.id)
                                    }}><Icon name='trash alternate outline' /></Button>
                            </>
                            : null}
                    </div>
                </div>
            </Container>

            <Divider />
        </>
    )
}