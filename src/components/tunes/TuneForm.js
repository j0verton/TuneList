import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header } from "semantic-ui-react";
import "./Article.css"
import { ArticleContext } from "./TuneProvider";

export const TuneForm = () => {
    const { saveTune, editTune, GetTuneById } = useContext(TuneConext)

    const { tune, setTune } = useState({})
    const [ isLoading, setIsLoading ] = useState(true)
    const { tuneId } = useParams()

    const history = useHistory()

    const handleControlledInputCHnage = (event) => {
        const newTune = { ...tune }
        newTune[event.target.name] = event.target.value
        setTune(newTune)
    }

    useEffect(() => {
        if(tuneId){
            GetTuneById(tuneId)
            .then(tune => {
                setTune(tune)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    const constructNewArticle = () => {
        setIsLoading(true)
        if (tuneId) {
            editTune({
                id: tune.id,
                userId: parseInt(localStorage.getItem("tunes_user")),
                name: "",
                key: "",
                tuning: "",
                source: "",
                notes:"",
                link:""
            })
            .then(() => history.push('/tune'))
        } else {
            saveTune({
                userId: parseInt(localStorage.getItem("tunes_user")),
                name: "",
                key: "",
                tuning: "",
                source: "",
                notes:"",
                link:""
            })
            .then(() => history.push('/tune'))
        }

    }

    return (
        <>
            <div className="tuneFormContainer">
                <Form className="tuneForm"
                    onSubmit={e=> {
                        e.preventDefault()
                        contructNewTune()
                    }}>
            <Header as='h2' className="tuneForm__title">New Tune</Header>
            <Form.Input
                required
                label='Tune Title'
                placeholder='Tune Title'
                id='tuneTitle'
                name='title'
                onChange={handleControlledInputChange}
                defaultValue={tune.title}
            />
            <Form.Input
                required
                label='Tune Key'
                placeholder='Tune Key'
                id='tuneKey'
                name='key'
                onChange={handleControlledInputChange}
                defaultValue={tune.key}
            />
            <Form.Input
                required
                label='Tune Tuning'
                placeholder='Tune Tuning'
                id='tuneTuning'
                name='tuning'
                onChange={handleControlledInputChange}
                defaultValue={tune.tuning}
            />
            <Form.Input
                required
                label='Tune Key'
                placeholder='Tune Key'
                id='tuneKey'
                name='key'
                onChange={handleControlledInputChange}
                defaultValue={tune.key}
            />
            <Form.Input
                required
                label='Tune Key'
                placeholder='Tune Key'
                id='tuneKey'
                name='key'
                onChange={handleControlledInputChange}
                defaultValue={tune.key}
            />



            </div>

    )
}