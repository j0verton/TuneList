import React, { useContext, useEffect, useState } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Icon } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { Link, useHistory } from "react-router-dom"
import { TuneCard } from "./TuneCard"


export const ListCard = ({tunesArr}) => {
    const [ modal, showModal ] = useState(false)

    return tunesArr[0] ? (
        <>
        {console.log("tunesArr", tunesArr)}
        {tunesArr.map(tune => {
            return <><Header as='h3' className="tuneEntry">
            <p >{tune.name}</p>
        </Header>
        {modal ? <TuneCard tune={tune} closeModal={()=>showModal(false)}/> : null }
        </>
        })
        }
    </>
    
    ) : null
    
}

// onClick={()=>showModal(true)}