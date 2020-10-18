import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from "./ArticleProvider"
import { Article } from "./Article.js"
import "./Article.css"
import { useHistory } from "react-router-dom"
import { Button, Checkbox, Divider } from "semantic-ui-react"

export const TunesList = (props) => {
    const {tunes, getTunesByUserId, getCollectionsByUserId } = useContext(ArticleContext)
    const [collections, setCollections] = useState([])
    // const [update, setUpdate] = useState(false)
    const history = useHistory()

    const tabs = [

    ]

    useEffect(() => {
        getTunes()
    }, [])

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