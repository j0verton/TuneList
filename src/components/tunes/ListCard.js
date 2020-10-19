import React, { useContext, useEffect, useState } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Icon } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { Link, useHistory } from "react-router-dom"
import { TuneCard } from "./TuneCard"


export const ListCard = (tunesArr) => {
    const [ modal, showModal ] = useState(false)

    return (
        <>
         {tunesArr.forEach(tune => {
            return <> <Header as='h3' className="tuneEntry">
            <p onClick={()=>showModal(true)}>{tune.name}</p>
        </Header>
        {modal ? <TuneCard tune={tune} closeModal={()=>showModal(false)}/> : null }
        </>

    })}
    </>
    )
    
}