import React, { useContext, useEffect, useState } from "react";
import { Container, Divider, Segment, Header, Icon, Rating, Embed } from "semantic-ui-react"
import { TuneContext } from "./components/tunes/TuneProvider";
import "./Home.css"
import { TuneCard } from "./components/tunes/TuneCard";
import { AudioPlayer } from "./components/AudioPlayer";
import { PhotoContext } from "./components/photo/PhotoProvider";

export const Home = () => {
  const { getTunes, getStarredTunesByUserId, addStarToTune, removeStarFromTune } = useContext(TuneContext)
  const {getPhotos} = useContext(PhotoContext)
  const [tunes, setTunes]= useState([])
  const [ modal, showModal ] = useState(false)
  const [ tuneObj,setTuneObj ] = useState({})
  const [ rating, setRating ] = useState()
  const [ background, setBackground] = useState({})
  const [ tuneOfTheDay, setTuneOfTheDay] = useState({})

  useEffect(()=> {
    getStarredTunesByUserId(localStorage.getItem("tunes_user"))
    .then(allUserTunes => {
        setTunes(allUserTunes)})
    }, [rating])

    useEffect(()=> {
      getPhotos()
      .then(response=> {
        let num = Math.floor(Math.random() * response.length)
        setBackground(response[num])
      })
      getTunes()
      .then(response=> {
        let num = Math.floor(Math.random() * response.length)
        setTuneOfTheDay(response[num])
      })
    }, [])

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
      <div className="homeContainer" style={{backgroundImage: `url(${background.url})`}}>
        <div className="homeInfo">
          <div className="totdHeader">
            <h3 className="totdH3">Tune of the Day</h3>
          <p
              raised
              key={tuneOfTheDay.id}
              id={tuneOfTheDay.id} 
              className="tuneEntry totd"
              >
              <p
              key={tuneOfTheDay.id}
                onClick={e=>{
                  handleOpen()
                  setTuneObj(tuneOfTheDay)
                }
                }
              >
                {tuneOfTheDay.name}
              </p>
              <Divider />
              <p>posted by: {tuneOfTheDay?.user?.username}</p>
              <div className="buttonContainer">
              {tuneOfTheDay.link ?
                <a className="playButton" target="_blank" href={tuneOfTheDay.link}>link</a>
                : null
              }
              {tuneOfTheDay.audioUpload ?
                <AudioPlayer className="playButton" url={tuneOfTheDay.audioUpload}/>
                : null
              }
              </div>
            </p>
            </div>
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
              {tune.link ?
                <a className="playButton" target="_blank" href={tune.link}>link</a>
                : null
              }
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