import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./UserProvider";
import { Button, Checkbox, Icon, Divider, Accordion } from "semantic-ui-react"
import "./User.css";
import { TuneCard } from "../tunes/TuneCard";

export const UserList = () => {
    const { users, getUsers } = useContext(UserContext);
    const [activeIndex, setActiveIndex ] = useState(0)
    const [sortedUsers, setSortedUsers] = useState(false)
    const [ modal, showModal ] = useState(false)
    const [ tuneObj,setTuneObj ] = useState({})


    const handleClick = (event, data) => {
        const index = data.index
        const newIndex = activeIndex === index ? 0 : index
        setActiveIndex(newIndex)
    }

    const handleOpen =() =>{
        showModal(true)
    }

    const handleClose =()=>{
        showModal(false)
    } 
    useEffect(() => {
        getUsers()
        .then(()=>{
            setSortedUsers(users.sort((a, b) => {
            return a.name - b.name;
        }))
        })
    }, []);

  return (
    <>
      <div className="usersContainer">
        <div className="usersHeader">
          <h2><Icon name="users" />All Users</h2>
        </div>

        <Divider />
        <Accordion>
        {users.map(user=> {
            return (
            <>
                <Accordion.Title
                    active={activeIndex === user.id}
                    index= {user.id}
                    onClick={event=>{
                        handleOpen()
                        setTuneObj(tune)
                        handleClick()
                    }}
                    >
                <Icon name='dropdown' />
                    {user.name}
                </Accordion.Title>
    
                <Accordion.Content active={activeIndex === user.id}>
                    {user.tunes.sort((a, b) => {
                        return a.name - b.name;
                    }).map(tune=> <p>{tune.name} - {tune.key}/{tune.tuning} {tune.source ? `- ${tune.source}` : null}</p>)
                    }
                </Accordion.Content>
            </>
            )
        })}
        </Accordion>
        {modal ? <><TuneCard id={tuneObj.id} tuneObj={tuneObj} handleOpen={handleOpen} handleClose={handleClose}/></> : null }
    </div>
    </>
  )
}
