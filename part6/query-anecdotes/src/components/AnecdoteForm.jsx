import { useMutation, useQueryClient} from 'react-query'
import { createAnecdote} from '../requests'
import { useNotificationDispatch } from '../NotificationContext'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const dispatch = useNotificationDispatch()
  const time = 5

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
    const anecdotes = queryClient.getQueryData('anecdotes')
     queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
   
  },
  onError:(error) => {
    
    dispatch(setNotification(error.response.data.error))
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, time * 1000)
    },
  })  

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({ content, votes: 0 })

    const message = (`You added Anecdote '${content}' `)
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, time * 1000)
  }
    


  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
