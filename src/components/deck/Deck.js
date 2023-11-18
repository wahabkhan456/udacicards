import React, { Component } from 'react';
import {ScrollView,Text,StyleSheet} from 'react-native';
import {Button, Card} from 'react-native-paper';
import { connect } from "react-redux";

class Deck extends Component {
    state = { 
        deck:{}
     }

    componentDidMount(){
        const {deck}=this.props.decks;
        if(deck){
         
            const deckObject=JSON.parse(deck);
            this.setState({deck:deckObject});
        }
    }

    componentWillReceiveProps(nextProps){
        const {deck}=nextProps.decks;
        if(deck){
            const deckObject=JSON.parse(deck);
            this.setState({deck:deckObject});
        }
    }


    render() {

        const {deck}=this.state;

        let deckContent;

        if(Object.keys(deck).length>0){
            deckContent=(
                <Card style={styles.deckCard}>

                    <Text style={{textAlign:'center',fontSize:20}}>{deck.title}</Text>
                    <Text style={{textAlign:'center',fontSize:20}}>{`${deck.questions.length} ${deck.questions.length===1?'card':'cards'}`}</Text>
                </Card>
            )
        }

        return (
            <ScrollView>
               {deckContent}
              
                <Button style={styles.addCardButton} mode="contained" onPress={()=>{this.props.navigation.navigate('AddCard')}} >
                    Add Card
                </Button>
                    <Button style={styles.startQuizButton} mode="contained" onPress={()=>{this.props.navigation.navigate('StartQuiz')}}>
                    Start Quiz
                        </Button>
              </ScrollView>
        );
    }
}

const styles=StyleSheet.create({
    addCardButton:{
        height:40
    },
    startQuizButton:{
        height:40
    },
    deckCard:{
        textAlign: "center",
        textAlignVertical: "center",
        borderColor:'#000',
        borderRadius: 4,
        borderWidth: 0.5,
        height:200,
        borderColor: '#000000',
    }

})

const mapStateToProps=state=>({
    decks:state.decks
})

export default connect(mapStateToProps,{})(Deck);