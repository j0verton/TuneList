import React, { useState, useRef, useContext } from "react"
import "./Tune.css"
import { Button, Container, Divider, Header, Rating } from 'semantic-ui-react'
import { TuneCard } from "./TuneCard"
import { TuneContext } from "./TuneProvider"

export const ListCard = ({tunesArr, parentCallback}) => {
    const [ modal, showModal ] = useState(false)
    const [ tuneObj,setTuneObj ] = useState({})
    const { addStarToTune, removeStarFromTune } = useContext(TuneContext)
    const tuneRef= useRef(null)

    const handleOpen =() =>{
        showModal(true)
    }

    const handleClose =()=>{
        showModal(false)
        parentCallback()
    } 

    const handleStar = (event, data) => {
        console.log(tunesArr)
        console.log("data",data)
        console.log("event", event.target)
        const [prefix, tuneId] = data.id.split("__")
        console.log(tuneId)
        data.rating === 0 ? removeStarFromTune(tuneId): addStarToTune(tuneId)
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
            id={tune.id} 
            className="tuneEntry">
            <p
            className="tuneP"             
            onClick={e=>{
                handleOpen()
                setTuneObj(tune)
            }} >
                {tune.name}
            </p>
            <Rating 
                name="starred"
                icon='star'
                className="rating"
                id={`tune__${tune.id}`}
                onRate={handleStar}
                defaultRating={tune?.starred}
            />
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
                id={tune.id} 
                className="tuneEntry">
            <p             
            onClick={e=>{
                handleOpen()
                setTuneObj(tune)
            }} >
                {tune.name}
            </p>
                <Rating 
                    name="starred"
                    icon='star'
                    id={`tune__${tune.id}`}
                    onRate={handleStar}
                    defaultRating={tune?.starred}
                />
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