import React, { useContext, useEffect, useState, useRef } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Icon } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { Link, useHistory } from "react-router-dom"
import { TuneCard } from "./TuneCard"

export const ListCard = ({tunesArr}) => {
    const [ modal, showModal ] = useState(false)
    const [ tuneObj,setTuneObj ] = useState({})
    const tuneRef= useRef(null)


    const handleOpen =() =>{
        showModal(true)
    }
    const handleClose =()=>{
        showModal(false)
    } 
    return tunesArr[0] ? (
        <>
        {tunesArr.map(tune => {
            return <><Button as='h3' 
            ref={tuneRef}
            key={tune.id}
            onClick={e=>{
                handleOpen()
                setTuneObj(tune)
            }} 
                id={tune.id} 
                className="tuneEntry">
                {tune.name}
                </Button>
                </>
            })
    }
    {modal ? <><TuneCard id={tuneObj.id} tuneObj={tuneObj} handleOpen={handleOpen} handleClose={handleClose}/></> : null }
    </>
    
    ) : null
    
}