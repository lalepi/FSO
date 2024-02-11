import { useState} from 'react'

export const useField = (type) => {
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
    onChange,
    clear
  }
}


// moduulissa voi olla monta nimettyä eksportia

// export const useAnotherHook = () => {
//   // ...
// }