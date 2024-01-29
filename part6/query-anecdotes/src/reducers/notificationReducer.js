
const notificationReducer = (state, action) => {

    switch (action.type){
    case "ADD":
        return action.payload
    case "CLEAR":
        return null
    default:
        return null
    }
}

export const setNotification = message => {
    return({
        type: 'ADD',
        payload: message
    })
}

export default notificationReducer