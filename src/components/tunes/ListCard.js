import React, { useState, useRef } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header } from 'semantic-ui-react'
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
        <><Container
            style={{ 
                display: "flex", 
                flexDirection: "column", 
                textAlign:"left"
            }}
        >
        {tunesArr.filter(tune=> !tune.learning).sort((a, b) => a.name.localeCompare(b.name)).map(tune => {
            return <><Button as='h3' 
            ref={tuneRef}
            key={tune.id}
            style={{ 
                textAlign:"left",
                marginBottom: "2%"
            }}
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
        </Container>
        {tunesArr.filter(tune=> tune.learning).length ? 
        <>
        <Divider horizontal>
            <Header style={{color:"#FFF1D6"}}as='h4'>
                still learning
            </Header>
        </Divider>
        <Container
            style={{ 
                display: "flex", 
                flexDirection: "column", 
                textAlign:"left"
            }}
        >
        {tunesArr.filter(tune=> tune.learning).sort((a, b) => a.name.localeCompare(b.name)).map(tune => {
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
        </Container>
        </>
        : null
    }

    {modal ? <><TuneCard id={tuneObj.id} tuneObj={tuneObj} handleOpen={handleOpen} handleClose={handleClose}/></> : null }
    </>
    ) : null
}