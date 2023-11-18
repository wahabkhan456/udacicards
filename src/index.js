import {Image} from 'react-native';
import Decks from './components/decks/Decks';
import AddDeck from './components/add-deck/AddDeck';

import {createBottomTabNavigator,createStackNavigator,createAppContainer} from 'react-navigation';
import AddCard from './components/add-card/AddCard';
import Deck from './components/deck/Deck';
import StartQuiz from './components/start-quiz/StartQuiz';
import DecksIcon from './data-assets/decks-icon.png';
import AddDeckIcon from './data-assets/add-deck-icon.png';
// import Icon from '../assets/icon.png';

const DecksNav=createStackNavigator({
    Decks:{screen:Decks},
    AddDeck:{screen:AddDeck},
    Deck:{screen:Deck},
    AddCard:{screen:AddCard},
    StartQuiz:{screen:StartQuiz}
});

const Tabs=createBottomTabNavigator({
    Decks:{screen:DecksNav},
    AddDeck:{screen:AddDeck}
},{
    navigationOptions:({navigation})=>({

        tabBarIcon:({})=>{
            const {routeName}=navigation.state;
            let iconName;
            if(routeName==='Decks'){
                iconName=DecksIcon;
            }
            else if(routeName==='AddDeck'){
                iconName=DecksIcon;
            }

            return <Image source={iconName} style={{width:100 ,height:100}}/>
        }

    })
});


const AppContainer=createAppContainer(Tabs);


export default AppContainer;