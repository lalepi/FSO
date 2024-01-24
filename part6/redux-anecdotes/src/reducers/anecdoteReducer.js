import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {


updateVote(state, action) {
  const id = action.payload.id
  const updatedAnecdote = action.payload

      return state.map(anecdotes =>
        anecdotes.id !== id ? anecdotes : updatedAnecdote)
    
},
appendAnecdote(state, action) {
  state.push(action.payload)
},
setAnecdotes(state, action) {
  return action.payload
},
  },
})

export const { updateVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
  const newAnecdote = await anecdoteService.createNew(content)
  dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (content) => {
  const object = {...content, votes: content.votes +1}
  return async dispatch => {
  const newAnecdote = await anecdoteService.update(object)
  dispatch(updateVote(newAnecdote))
  }
}

export default anecdoteSlice.reducer