import React, { useContext, useEffect, useState } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Icon } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { Link, useHistory } from "react-router-dom"


export const ListCard = (tunesCollectionsArr) => {

    const { getTunebyId } = useContext(TuneContext)

    useEffect = (() => {

    })
    return (
        tunesCollectionsArr.forEach(tune => {
        <Header as='h3' className="tune">
            <Link to={`/tunes/card/${tune.tuneId}`}></Link>
        </Header>
        })
    )
}