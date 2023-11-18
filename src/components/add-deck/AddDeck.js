import React, { Component } from 'react';
import {View,Text,TextInput,StyleSheet,Button,AsyncStorage} from 'react-native';
import {connect} from 'react-redux';
import {  getDeck } from '../../data-assets/_DATA';
import {saveDeckTitleAction} from '../../actions/deckActions';


class AddDeck extends Component {
    state = { 
        inputContainsText:false,
        text:''
     }

    onChange= async(text)=>{
        await this.setState({text,inputContainsText:text.length>0});
    }

onAddDeck=()=>{

    const {text}=this.state;
    this.props.saveDeckTitleAction(text,this.props.navigation);

}

    render() {

        const {text,inputContainsText}=this.state;

        return (
            <View>
                <Text style={styles.textTitle}>What is the title of your deck?</Text>
                <TextInput
                style={styles.textInput}
                onChangeText={this.onChange}
                value={text}
                name="text"
                placeholder="Type a deck name"
                />
                <Button disabled={!inputContainsText} onPress={this.onAddDeck} title="Add Deck"/>
            </View>
        );
    }
}

const styles=StyleSheet.create({
    textTitle:{
        fontSize:30,
        textAlign:'center',
        textAlignVertical:'top'
    },
    textInput:{
        borderColor:'#000'
    }
})

const mapStateToProps=state=>({
    decks:state.decks
})

export default connect(mapStateToProps,{saveDeckTitleAction})(AddDeck);