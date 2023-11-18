import React, { Component } from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import { TextInput } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {saveCardToDeckAction} from '../../actions/deckActions';

class AddCard extends Component {
    state = { 
        question:'',
        answer:'',
        questionContainsText:false,
        answerContainsText:false
     }

     onAddCard=()=>{
         const {deck}=this.props.decks;
         const {question,answer}=this.state;
        this.props.saveCardToDeckAction(deck,question,answer,this.props.navigation);
     }

    render() {

        const {deck}=this.props.decks;
        const {question,answer,questionContainsText,answerContainsText}=this.state;
        return (
            <View>
                <Text style={styles.text}>Add Card to {JSON.parse(deck).title}</Text>
                <TextInput placeholder="Type your question" style={styles.textInput} onChangeText={(question)=>{this.setState({question,questionContainsText:question.length>0})}}/>
                <TextInput placeholder="Type your answer" style={styles.textInput} onChangeText={(answer)=>this.setState({answer,answerContainsText:answer.length>0})}/>
                <Button disabled={!(questionContainsText && answerContainsText)} mode="contained" onPress={this.onAddCard}>Submit</Button>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    textInput:{
        backgroundColor:'#ffffff',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor:'#000000'
    },
    text:{
        fontSize:28,
        textAlign:'center',
        fontWeight:'800'
    }
})

const mapStateToProps=state=>({
    decks:state.decks
});

export default connect(mapStateToProps,{saveCardToDeckAction})(AddCard);