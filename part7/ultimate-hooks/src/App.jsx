import { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const clear = () => {
    setValue('')
  }

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    clear,
    onChange
  }
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])
  const [newInput, setNewInput] = useState(false);

    useEffect(() => {
      axios
       .get(baseUrl)
       .then(response =>{
        setResources(response.data)
        console.log(response)
       })
       .catch(function (error) {
        setResources(error.response)
      })
    }, [baseUrl, newInput])
  
  const create = async (resource) => {

    const response = await axios.post(baseUrl, resource)
    setNewInput(true)
    return response.data
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

const App = () => {
  const {clear: clearContent, ...content} = useField('text')
  const {clear: clearName, ...name} = useField('text')
  const {clear: clearNumber, ...number} = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    clearContent();
  
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    clearName();
    clearNumber();
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App