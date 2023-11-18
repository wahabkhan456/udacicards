import {AsyncStorage} from 'react-native';

export const getDecks=()=>{
    return AsyncStorage.getAllKeys();
}

export const getDeck=(title)=>{

    return AsyncStorage.getItem(title.toString());
        

}

export const saveDeckTitle=(title)=>{

    const initialDeck={
        title,
        questions:[]
}


return AsyncStorage.setItem(title,JSON.stringify(initialDeck));

}

export const addCardToDeck=(question,answer,title)=>{

    const card={
        question,
        answer
    }

    return AsyncStorage.mergeItem(title,JSON.stringify(card));


}


export const saveCardToDeck=(deck,question,answer)=>{
    const deckObject=JSON.parse(deck);
    
    const newDeck={
        ...deckObject,
        questions:[...deckObject.questions,{
            question,
            answer
        }]
    }

    return AsyncStorage.mergeItem(deckObject.title,JSON.stringify(newDeck));

}