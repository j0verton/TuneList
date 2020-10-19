import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from "./ArticleProvider"
import { Article } from "./Article.js"
import "./Article.css"
import { useHistory } from "react-router-dom"
import { Button, Checkbox, Divider } from "semantic-ui-react"
import { CollectionContext } from "../collections/CollectionsProvider"
import { TuneContext } from "./TuneProvider"

export const TunesList = (props) => {
    const {tunes, getTunesByUserId, getTuneById } = useContext(TuneContext)
    const {collections, getCollectionsByUserId} = useContext(CollectionContext)
    const [ userCollections, setUserCollections ] = useState([])
    // const [update, setUpdate] = useState(false)
    const history = useHistory()

    const makeTabs = () => {

    }
    const tabs = collections.map(collection => {
        return { menuItem: collection.name, render: () => <Tab.Pane>{ListCard(collection.tuneCollections)}</Tab.Pane>}
    })

    useEffect(() => {
        getCollectionsByUserId()
        .then(res => {
            res.map(collection => {
                return collection.tuneCollections.map(tune=>{    
                    return getTuneById(tune.tuneId)
                })
            })
        })
        .then(setUserCollections)
    }, [])
    useEffect(() => {
        getTunesByUserId(localStorage.getItem("tunes_user")
    }

    return (
        <>
            <div className="tunesContainer">
                <div className="tunesHeader">
                    {/* <Button primary onClick={() => history.push("/tunes/create")}>
                        Add a Tune
                    </Button> */}
{/* 
                    <Checkbox toggle
                        onChange={() => setUpdate(!update)}
                        label={update ? "Disable real-time updates" : "Allow real-time updates"}
                    /> */}
                </div>

                <Divider />

                <div className="tunes">
                    {
                        tunes?.map(tune => <Tune key={tune.id} tune={tune} />)
                    }
                </div>
            </div>
        </>
    )
}