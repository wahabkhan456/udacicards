import { GET_DECKS, GET_DECK, SAVE_DECK_TITLE, SAVE_CARD_TO_DECK } from "../actions/types";

const initialState={
    decks:[],
    deck:{}
}

const deckReducer=(state=initialState,action)=>{

    switch (action.type) {
        case GET_DECKS:
            return {
                ...state,
                decks:action.payload
            }

        case GET_DECK :
            return {
                ...state,
                deck:action.payload
            }
        case SAVE_DECK_TITLE:
            return {
                ...state,
                decks:[...state.decks,action.payload]
            }
        
        case SAVE_CARD_TO_DECK :
            return {
                ...state,
                deck:action.payload.deck[1],
                decks:action.payload.decks
            }
                    
            
    
        default:
            return state;
    }
}

export default deckReducer;