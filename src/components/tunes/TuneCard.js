import React, { useContext, useEffect, useState } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Icon } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { useHistory } from "react-router-dom"

export const Tune = ({ tune }) => {
    //useContext hook allows the use of functions form the tuneProvider
    const { getTunesByUserId } = useContext(TuneContext)

    const history = useHistory()
    const [ modal, showModal ] = useState(false)

    useEffect(()=> {
        getTunesByUserId()
    }, [])

    //returns an tune in semantic Ui elements, pass as a prop a function that will set modal to false line 31
    return (
        <>
            <Container className="tune--container">
                <Container className="tune--headercontainer">
                <Header as='h3'>{tune.name}</Header>
                <Header as='h4'>{tune.key/tune.tuning}</Header>
                </Container>

                {/* <p>
                    Posted by: {tune.user.usename}
                    <Button size='mini' className="addButton"
                        onClick={()=>showModal(true)}
                        >
                        <Icon name="user"></Icon>
                        {tune.user.username}
                    </Button>
                </p> */}

                <p>{tune.synopsis}</p>
                <div className="tune--actions">
                    <a href={tune.url} target="_blank">
                        Read More
                </a>
                    <div className="formBtns">
                        {/* if the tune was posted by the current user it renders buttons for edit or delete */}
                        {tune.user.id === parseInt(localStorage.getItem("nutty_user")) ?
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