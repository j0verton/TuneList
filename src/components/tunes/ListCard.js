import React, { useContext, useEffect, useState } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Icon } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { Link, useHistory } from "react-router-dom"
import { TuneCard } from "./TuneCard"

export const ListCard = ({tunesArr}) => {
    const [ modal, showModal ] = useState(false)
    const [ tuneObj,setTuneObj] = useState({})

    function findTuneInArray(id) {
        return tunesArr.find(arrTune=>id===arrTune.id)
    }
    return tunesArr[0] ? (
        <>
        {console.log("tunesArr", tunesArr)}
        {tunesArr.map(tune => {
            console.log("tune in list card",tune)
            return <><Button as='h3' 
            onClick={e=>{
                console.log("e",e)
                showModal(true)
                setTuneObj(findTuneInArray(e.target.id))
            }} 
                id={tune.id} 
                className="tuneEntry">
                {tune.name}
                </Button>
                </>
            
            })
    }
    {modal ? <TuneCard id={tuneObj.id} tuneObj={tuneObj} closeModal={()=>showModal(false)}/> : null }
    </>
    
    ) : null
    
}