import React, { useContext, useEffect, useState } from "react";
import { Container, Divider, Segment, Header, Icon, Rating, Embed } from "semantic-ui-react"
import { TuneContext } from "./components/tunes/TuneProvider";
import "./Home.css"
import { TuneCard } from "./components/tunes/TuneCard";
import { AudioPlayer } from "./components/AudioPlayer";

export const Home = () => {
  const { getStarredTunesByUserId, addStarToTune, removeStarFromTune } = useContext(TuneContext)
  const [tunes, setTunes]= useState([])
  const [ modal, showModal ] = useState(false)
  const [ tuneObj,setTuneObj ] = useState({})
  const [ rating, setRating ] = useState()

  useEffect(()=> {
    getStarredTunesByUserId(localStorage.getItem("tunes_user"))
    .then(allUserTunes => {
        setTunes(allUserTunes)})
    }, [rating])

  const handleOpen =() =>{
    showModal(true)
  }
  const handleClose =()=>{
    showModal(false)
  } 

  const handleStar = (event, data) => {
    console.log("data",data)
    console.log("event", event.target)
    const [prefix, tuneId] = data.id.split("__")
    console.log(tuneId)
    data.rating === 0 ? removeStarFromTune(tuneId).then(()=> {setRating(tuneId)}): addStarToTune(tuneId).then(()=> {setRating(tuneId)})
  }

  return (
    <>
        {/* <Header><Image src={logo} floated="left" size="medium" alt="TuneList logo, a fiddle over 3 sheets of paper" className="LogoHome" />
        </Header> */}
      <div className="homeContainer">
        <div className="homeInfo">
        </div>
        <Divider horizontal>
          <Header as='h4'>
            <Icon name='star'color='yellow' />
            </Header>
        </Divider>
        <Container>
          {tunes.sort((a, b) => a.name.localeCompare(b.name)).map(tune=>{
            return <>
            <Segment 
              raised
              key={tune.id}
              id={tune.id} 
              className="tuneEntry"
            >
              <p
              key={tune.id}
                onClick={e=>{
                  handleOpen()
                  setTuneObj(tune)
                }
                }
              >
                {tune.name}
              </p>
              <div className="buttonContainer">
              {tune.audioUpload ?
                <AudioPlayer className="playButton" url={tune.audioUpload}/>
                : null
              }
              <Rating 
                name="starred"
                icon='star'
                id={`tune__${tune.id}`}
                onRate={handleStar}
                defaultRating={tune?.starred}
              />
              </div>
            </Segment>
          </>
          })
        }
        {modal ? <><TuneCard id={tuneObj.id} tuneObj={tuneObj} handleOpen={handleOpen} handleClose={handleClose}/></> : null }

        </Container>
      </div>
    </>
  )
  
  }