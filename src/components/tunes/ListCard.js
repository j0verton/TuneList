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

    const [ knownTunes, setKnownTunes] = useState([])
    const [ learningTunes, setLearningTunes] = useState([])

    const learningTunesArray = tunesArr.filter(tune=> tune.learning)
    const knownTunesArray = tunesArr.filter(tune=> !tune.learning)
    
    const handleOpen =() =>{
        showModal(true)
    }
    const handleClose =()=>{
        showModal(false)
    } 
    
    useEffect(() => {
        setKnownTunes(tunesArr.filter(tune=> !tune.learning))
        console.log("learning", learningTunes)
        setLearningTunes(tunesArr.filter(tune=> tune.learning))
        console.log("known", knownTunes)
    }, [])

    return knownTunes[0] ? (
        <>
        {knownTunes.map(tune => {
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
        {learningTunes ? 
        <>
        <Divider horizontal>
            <Header as='h4'>
                still learning
            </Header>
        </Divider>
        {learningTunes.map(tune => {
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
        </>
        : null
    }

    {modal ? <><TuneCard id={tuneObj.id} tuneObj={tuneObj} handleOpen={handleOpen} handleClose={handleClose}/></> : null }
    </>
    
    ) : null
    
}