import React, { useContext, useEffect, useState } from "react";
import { Divider } from "semantic-ui-react"
// import logo from "../img/logo_words.png"
import "./Home.css"

export const Home = () => {

    return (
        <>
          <div className="homeContainer">
            <div className="homeInfo">
              {/* <img src={logo} alt="IBS logo" className="ibsLogoHome" /> */}
                welcome to TuneList
              <Divider />
    
            </div>
          </div>
        </>
      )
    
    }