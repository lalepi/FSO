import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import{ setNotification } from '../reducers/notificationReducer'
const AnecdoteList = () => {

  const anecdotes = useSelector(({filter, anecdotes}) => {

     if ( filter === 'NONE' ) {
       return anecdotes
     }
     else {
         filter = anecdotes.filter((anecdotes) => 
         anecdotes.content.toLowerCase().includes(filter.toLowerCase()))
        return filter
     }
  })
  
  const dispatch = useDispatch()

  const sortedAnecdotes = anecdotes.sort((a, b) => {
    if (a.votes < b.votes) return 1
    if (a.votes > b.votes) return -1
    return 0
  })

  const handleClick = (anecdote) => {
    dispatch(vote(anecdote))
      const message = (`You voted '${anecdote.content}' `)
      const time = 10
      
      dispatch(setNotification(message, time))
  }
 
  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote)}>vote</button>
      </div>
    </div>
      )}
    </div>
  )
}
export default AnecdoteList