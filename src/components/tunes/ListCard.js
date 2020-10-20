import React, { useContext, useEffect, useState, useRef } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Icon } from 'semantic-ui-react'
import { TuneContext } from "./TuneProvider"
import { Link, useHistory } from "react-router-dom"
import { TuneCard } from "./TuneCard"

export const ListCard = ({tunesArr}) => {
    const [ modal, showModal ] = useState(false)
    const [ tuneObj,setTuneObj] = useState({})
    const tuneRef= useRef(null)

//this function is 
    function findTuneInArray(id) {
        console.log("id passed to find", id)
        console.log("tuneobj",tuneObj)
        return tunesArr.find(arrTune=>id===arrTune.id)
    }


    return tunesArr[0] ? (
        <>
        {console.log("tunesArr", tunesArr)}
        {tunesArr.map(tune => {
            console.log("tune in list card",tune)
            return <><Button as='h3' 
            ref={tuneRef}
            onClick={e=>{
                console.log("e",e)
                showModal(true)
                setTuneObj(()=>{
                    // console.log("ref?",tuneRef.current.props.id)
                    findTuneInArray(tuneRef.current.props.id)})
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