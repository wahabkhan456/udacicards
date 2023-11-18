import {combineReducers} from 'redux';
import deckReducer from './deckReducer';

const rootReducer=combineReducers({
    decks:deckReducer
});

export default rootReducer;