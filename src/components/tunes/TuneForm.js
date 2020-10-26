import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header, Checkbox, Rating } from "semantic-ui-react";
import "./Tune.css"
import { TuneContext } from "./TuneProvider";

export const TuneForm = () => {
    const { saveTune, editTune, getTuneById } = useContext(TuneContext)

    const [ tune, setTune ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)

    const { tuneId } = useParams()

    const history = useHistory()


    const tuningOptions = [
        {
            key: 'D tuning',
            text: 'ADAE / D tuning / High Bass',
            value: 'D/High Bass'
        },
        {
            key: 'Cross tuning',
            text: 'AEAE / Cross-tuning / Sawmill',
            value: 'A/Cross'
        },
        {
            key: 'Standard',
            text: 'GDAE / Standard',
            value: 'Standard'
        }
    ]

    useEffect(() => {
        if(tuneId){
            getTuneById(tuneId)
            .then(tune => {
                setTune(tune)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    const constructNewTune = () => {
        setIsLoading(true)
        if (tuneId) {
            editTune({
                id: tune.id,
                userId: parseInt(localStorage.getItem("tunes_user")),
                name: tune.name,
                key: tune.key,
                tuning: tune.tuning,
                source: tune.source,
                notes:tune.notes,
                link:tune.link,
                starred:tune.starred,
                learning:tune.learning
            })
            // .then(() => history.push('/tunes'))
        } else {
            saveTune({
                userId: parseInt(localStorage.getItem("tunes_user")),
                name: tune.name,
                key: tune.key,
                tuning: tune.tuning ? tune.tuning : "Standard",
                source: tune.source,
                notes:tune.notes,
                link:tune.link,
                starred:tune.starred,
                learning:tune.learning
            })
            .then(() => history.push('/tunes'))
        }
    }

    const handleControlledInputChange = (event) => {
        const newTune = { ...tune }
        newTune[event.target.name] = event.target.value
        setTune(newTune)
    }
    const handleDropdown = (event, data)=> {
        const newTune = { ...tune }
        newTune[data.name] = data.value
        setTune(newTune)
    }
    const handleCheckbox = (event, data)=> {
        const newTune = { ...tune }
        newTune[data.name] = data.checked
        setTune(newTune)
    }
    const handleStar = (event, data)=> {
        const newTune = { ...tune }
        newTune[data.name] = data.rating
        setTune(newTune)
    }

    const handleAddition = (event, data) => {


    }

    return (
        <>
            <div className="tuneFormContainer">
                <Form className="tuneForm"
                        onSubmit={e=> {
                            constructNewTune()
                }}>
                <Header as='h2' className="tuneForm__title">New Tune</Header>
                <Form.Input
                    required
                    label='Name'
                    placeholder='Enter a name'
                    id='tuneName'
                    name='name'
                    onChange={handleControlledInputChange}
                    defaultValue={tune?.name}
                />
                <Rating 
                    name="starred"
                    icon='star'
                    onRate={handleStar}
                    defaultRating={tune?.starred}
                />
                <Form.Input
                    required
                    label='Key'
                    placeholder='Enter a Key'
                    id='tuneKey'
                    name='key'
                    onChange={handleControlledInputChange}
                    defaultValue={tune?.key}
                />
                <Form.Dropdown
                    allowAdditions
                    additionPosition= 'top'
                    additionLabel = "add a Tuning"
                    onAddItem={handleAddition}
                    placeholder='Select a Tuning'
                    className="tuningdropdown"
                    selection
                    search
                    required
                    name='tuning'
                    label='Tuning'
                    options={tuningOptions}
                    defaultValue={tune.tuning}
                    onChange={handleDropdown}
                />
                <Form.Input
                    label='Source'
                    placeholder="What's your source?"
                    id='tuneSource'
                    name='source'
                    onSelect={handleControlledInputChange}
                    defaultValue={tune?.source}
                />
                <Form.TextArea
                    label='Notes'
                    placeholder='Enter Any Notes Here...'
                    id='tuneNotes'
                    name='notes'
                    onChange={handleControlledInputChange}
                    defaultValue={tune?.notes}
                />
                <Form.Input
                    label='Recording Link'
                    placeholder='Enter a link to a recording of the tune'
                    id='tuneLink'
                    name='link'
                    onChange={handleControlledInputChange}
                    defaultValue={tune?.link}
                />
                {tune.learning?                 
                    <Checkbox 
                        name='learning'
                        label='Still learning this one?'
                        onChange={handleCheckbox}
                        defaultChecked
                    />
                     : tune.id ?
                     <Checkbox 
                        name='learning'
                        label='Still learning this one?'
                        onChange={handleCheckbox}
                    /> : null
                }
                <Button
                    primary
                    type="submit"
                    id="save"
                    size="medium"
                    className="btn btn-primary save"
                    // onClick={() => history.push(`/tunes`)}
                    >
                    {tuneId ? <>Save Tune</> : <>Add Tune</>}
                </Button>
                <Button
                    type="button"
                    size="medium"
                    className="btn btn-primary cancel"
                    onClick={() => history.push(`/tunes`)}>
                Cancel </Button>
                </Form>
            </div>
            </>

    )
    
}