import { useDispatch } from 'react-redux'
import { createAnecdote} from '../reducers/anecdoteReducer'
import{ setNotification} from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
  
    const addAnecdote = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''

      dispatch(createAnecdote(content))
      const message = (`You added Anecdote '${content}' `)
      const time = 10
      dispatch(setNotification(message, time))

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