import React, { useContext, useEffect, useState } from "react";
import { Container, Divider, Segment, Header, Icon } from "semantic-ui-react"
import { TuneContext } from "./components/tunes/TuneProvider";
import logo from "./img/"
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
          <div className="homeContainer">
            <div className="homeInfo">
              <img src={logo} alt="IBS logo" className="ibsLogoHome" />
                welcome to TuneList
           

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