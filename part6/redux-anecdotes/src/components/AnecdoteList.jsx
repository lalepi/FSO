import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {

  const anecdotes = useSelector(({filter, anecdotes}) => {

console.log('anecdotes', anecdotes)

console.log('filter', filter)
     if ( filter === 'NONE' ) {
       console.log('anecdotes', anecdotes)
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

  return (
    <div>
      {sortedAnecdotes.map(anecdote =>
      <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={() => 
          dispatch(vote(anecdote.id))}>vote</button>
      </div>
    </div>
      )}
    </div>
  )
}
export default AnecdoteList