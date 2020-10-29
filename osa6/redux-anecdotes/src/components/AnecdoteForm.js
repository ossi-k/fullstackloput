import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import Notification from './Notification'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
    const dispatch = useDispatch()

    const addAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        /*dispatch(createAnecdote(content))*/
        const newAnecdote = await anecdoteService.createNew(content)
        /*Miksi alla oleva toimii, kun on (content), mutta (newAnecdote) 
        aiheuttaa virheen. Sivun refreshin jälkeen uusi anekdootti näkyy.*/
        console.log("new ancedote: ", newAnecdote)
        dispatch(createAnecdote(content))
    }

    return (
        <form onSubmit={addAnecdote}>
            <h2>create new</h2>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
    )
}

export default AnecdoteForm