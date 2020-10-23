import React, { useContext, useEffect, useState, useRef } from "react";
import { Container, Divider, Segment, Header, Icon, Image } from "semantic-ui-react"
import { TuneContext } from "./components/tunes/TuneProvider";
import logo from "./img/TuneListLogo.png"
import "./Home.css"
import { TuneCard } from "./components/tunes/TuneCard";

export const Home = () => {
  const { getStarredTunesByUserId } = useContext(TuneContext)
  const [tunes, setTunes]= useState([])
  const [ modal, showModal ] = useState(false)
  const [ tuneObj,setTuneObj ] = useState({})
  const tuneRef= useRef(null)

  useEffect(()=> {
    getStarredTunesByUserId(localStorage.getItem("tunes_user"))
    .then(allUserTunes => {
        console.log("allUserTunes",allUserTunes)
        setTunes(allUserTunes)})
    }, [])

  const handleOpen =() =>{
    showModal(true)
  }
  const handleClose =()=>{
    showModal(false)
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
          {tunes.map(tune=>{
            return <>
            <Segment 
            raised
            ref={tuneRef}
            key={tune.id}
            onClick={e=>{
              handleOpen()
              setTuneObj(tune)
            }} 
            id={tune.id} 
            className="tuneEntry">
            {tune.name}
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