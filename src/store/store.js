import {createStore,applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import rootReducer from '../reducers/rootReducer';
import thunk from 'redux-thunk';

const middlewares=[thunk];

const preloadedState={};

const store=createStore(rootReducer,preloadedState,compose(
    applyMiddleware(...middlewares))
    )  ;

export default store;
    