import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'


const Anecdote = ({ anecdote, handleClick}) => {
    return(
        <li onClick={handleClick}>
            {anecdote.content}
            has {anecdote.votes} votes
            <button onClick={() => vote(anecdote.id)}>vote</button>
        </li>
    )
}

const Anecdotes = () => {
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state)

    return (
        <ul>
            {anecdotes.map(anecdote =>
                <Anecdote
                    key={anecdote.id}
                    anecdote={anecdote}
                    handleClick={() =>
                        dispatch(vote(anecdote.id))
                    }
                />
            )}
        </ul>
    )
}

export default Anecdotes