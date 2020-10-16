import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header } from "semantic-ui-react";
import "./Article.css"
import { ArticleContext } from "./TuneProvider";

export const TuneForm = () => {
    const { saveTune, editTune, GetTuneById } = useContext(TuneConext)
}