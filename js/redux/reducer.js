const initialState = {
         id: 0,
         user_id: 0,
	       items: [],
	       tasks: [],
         audio: ''
       }

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case 'CHOOSE_AUDIO':
    console.log("In reducer! ", action.payload)
      return {
        ...state,
        audio: action.payload
      }

     default:
       return state
   }
}

export default reducer
