import React, { useContext, useEffect, useState } from "react";
import { Container, Divider, Segment, Header, Icon, Image } from "semantic-ui-react"
import { TuneContext } from "./components/tunes/TuneProvider";
import logo from "./img/TuneListLogo.png"
import "./Home.css"

export const Home = () => {
  const { getStarredTunesByUserId } = useContext(TuneContext)
  const [tunes, setTunes]= useState([])

  useEffect(()=> {
    getStarredTunesByUserId(localStorage.getItem("tunes_user"))
    .then(allUserTunes => {
        console.log("allUserTunes",allUserTunes)
        setTunes(allUserTunes)})
    }, [])

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
              <Segment raised></Segment>

            </Container>
          </div>
        </>
      )
    
    }