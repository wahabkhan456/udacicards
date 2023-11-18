import {AsyncStorage} from 'react-native'
import { GET_DECKS, SAVE_DECK_TITLE,REMOVE_DECKS, GET_DECK,SAVE_CARD_TO_DECK } from "./types";
import { getDecks, saveDeckTitle, getDeck,saveCardToDeck, removeDecks } from "../data-assets/_DATA";



export const getDecksAction=()=>dispatch=>{

    getDecks()
        .then(decks=>{
            AsyncStorage.multiGet(decks)
                .then(deckValues=>{
                    return dispatch({
                        type:GET_DECKS,
                        payload:deckValues
                    })
                })
                .catch(err=>err);
        })
        .catch(err=>err);

}

export const getDeckAction=(title,navigation)=>dispatch=>{
    getDeck(title)
        .then(deck=>{
            return dispatch({
            type:GET_DECK,
            payload:deck
        })})
        .then(deck=>
            navigation.navigate("Deck"))
        .catch(err=>err);
}

export const saveDeckTitleAction=(title,navigation)=>dispatch=>{

    saveDeckTitle(title)
       .then(res=>{
           getDeck(title)
            .then(deck=>{
                
                return dispatch({
                    type:SAVE_DECK_TITLE,
                    payload:[title,deck]
                })
            })
            .then(res=>navigation.navigate('Decks'))
            .catch(err=>err);
       })
       .catch(err=>err)
        
}

export const removeDecksAction=()=>dispatch=>{

  getDecks()
    .then(decks=>{
        AsyncStorage.multiRemove(decks)
            .then(decks=>{
                return dispatch({
                    type:REMOVE_DECKS,
                    payload:{}
                })
            })
            .catch(err=>err);
    })
    .catch(err=>err);

}

export const saveCardToDeckAction=(deck,question,answer,navigation)=>dispatch=>{
    saveCardToDeck(deck,question,answer).then(res=>{
        
        const title=JSON.parse(deck).title;
        
        AsyncStorage.getItem(title)
            .then(deck=>{
            
                AsyncStorage.getAllKeys()
                    .then(decks=>{
                        AsyncStorage.multiGet(decks)
                .then(deckValues=>{
                        return dispatch({
                            type:SAVE_CARD_TO_DECK,
                            payload:{
                                deck:[title,deck],
                                decks:deckValues
                            }
                            
                        });
                    })
                    .catch(err=>err);
                    })
                    .catch(err=>err);
        })
        .catch(err=>err);
       
    })
    .then(res=>navigation.navigate('Deck'))
    .catch(err=>err);
}
