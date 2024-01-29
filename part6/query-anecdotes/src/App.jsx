import { useQuery, useQueryClient, useMutation} from 'react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { updateAnecdote } from './requests'
import { getAnecdotes} from './requests'
import { useNotificationDispatch } from './NotificationContext'
import { setNotification } from './reducers/notificationReducer'

const App = () => {
 const queryClient =  useQueryClient()
 const dispatch = useNotificationDispatch()
  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes+1})
    const message = (`You voted '${anecdote.content}' `)
    const time = 5
    dispatch(setNotification(message))
    setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, time * 1000)
  }

  const updateAnecdoteMutation = useMutation(updateAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
    },
  })

  const result = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
    })

  if ( result.isLoading ) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
