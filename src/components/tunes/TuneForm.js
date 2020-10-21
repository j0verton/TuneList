import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header, Dropdown, Checkbox } from "semantic-ui-react";
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
            console.log(tuneId)
            getTuneById(tuneId)
            .then(tune => {
                console.log("tune",tune)
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
            console.log("edit")
            editTune({
                id: tune.id,
                userId: parseInt(localStorage.getItem("tunes_user")),
                name: tune.name,
                key: tune.key,
                tuning: tune.tuning,
                source: tune.source,
                notes:tune.notes,
                link:tune.link,
                starred:false,
                learning:tune.learning.checked
            })
            .then(() => history.push('/tune'))
        } else {
            console.log("save")
            saveTune({
                userId: parseInt(localStorage.getItem("tunes_user")),
                name: tune.name,
                key: tune.key,
                tuning: tune.tuning,
                source: tune.source,
                notes:tune.notes,
                link:tune.link,
                starred:false,
                learning:tune.learning.checked
            })
            .then(() => history.push('/tune'))
        }

    }

    const handleControlledInputChange = (event) => {
        const newTune = { ...tune }
        newTune[event.target.name] = event.target.value
        setTune(newTune)
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
                <Form.Input
                    required
                    label='Key'
                    placeholder='Enter a Key'
                    id='tuneKey'
                    name='key'
                    onChange={handleControlledInputChange}
                    defaultValue={tune?.key}
                />
                <Dropdown
                    placeholder='Select a Tuning'
                    fluid
                    selection
                    label='Tuning'
                    options={tuningOptions}
                    value={tune?.tuning}
                />
                <Form.Input
                    label='Source'
                    placeholder="What's your source?"
                    id='tuneSource'
                    name='source'
                    onChange={handleControlledInputChange}
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
                <Checkbox 
                    name='learning'
                    label='Still learning this one?'
                    defaultChecked={tune?.learning}
                />
                <Button
                    primary
                    type="submit"
                    className="btn btn-primary"
                    onClick={() => history.push(`/tunes`)}>
                    {tuneId ? <>Save Tune</> : <>Add Tune</>}
                </Button>
                <Button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => history.push(`/tunes`)}>
                Cancel </Button>
                </Form>
            </div>
            </>

    )
}