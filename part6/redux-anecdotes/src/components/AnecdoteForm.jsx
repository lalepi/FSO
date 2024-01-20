import { useDispatch } from 'react-redux'
import { createAnecdote} from '../reducers/anecdoteReducer'
import{ setNotification, hideNotification} from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''

      const newAnecdote = await anecdoteService.createNew(content)
      dispatch(createAnecdote(newAnecdote))
      const message = (`You added Anecdote '${content}' `)
      dispatch(setNotification(message))
      setTimeout(() => {
        dispatch(hideNotification(null))
      
    }, 5000)
    }

    return (
        <div>
    <h2>Create new</h2>
    <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type="submit">create</button>
    </form>
    </div>
      )
    }
    export default AnecdoteForm