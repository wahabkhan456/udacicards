import React, { Component } from "react";
import { View, Text, Button,StyleSheet } from "react-native";
import { Button as PaperButton } from "react-native-paper";
import { connect } from "react-redux";

class StartQuiz extends Component {
  state = {
    deck: {},
    count: 0,
    score: 0,
    showAnswer: false,
    optionButtonsDisabled: false
  };

  onPressCorrect = (questions, answer) => {
    const { count, score, optionButtonsDisabled } = this.state;
    if (answer !== null) {
        return this.setState({
          count: count === questions.length ? count : count + 1,
          score: score + 1
      });
    }
  };

  onPressInCorrect = (questions, answer) => {
    const { count, score } = this.state;
    if (answer !== null) {
      
      return this.setState({
        count: count === questions.length ? count : count + 1
      });
    }
  };

  render() {
    const { deck } = this.props.decks;
    const { count, showAnswer, score, optionButtonsDisabled } = this.state;

    let quizContent;

    if (JSON.parse(deck).questions.length > 0) {
     
      const questions = JSON.parse(deck).questions;
      quizContent = (
        <View>
          <Text style={styles.text}>
            {count < questions.length - 1 || count === questions.length - 1
              ? `Question ${count + 1}/${questions.length}`
              : null}
          </Text>
          
          {count < questions.length || count === questions.length - 1 ? (
           
              <Text style={styles.text}>
          
           { questions[count].question}
              </Text>
            ): null}
          
          {showAnswer && count<=questions.length-1 ? (
            <Text style={styles.text}>{questions[count].answer}
            </Text>
          ) : null}

          {count>questions.length-1?null:<Button
            onPress={() =>
              this.setState(prevState => ({
                showAnswer: !prevState.showAnswer
              }))
            }
            title={showAnswer ? "Hide Answer" : "View Answer"}
          />
          }
          <Button
            disabled={count === questions.length}
            onPress={() =>
              this.onPressCorrect(
                questions,
                count < questions.length - 1 || count === questions.length - 1
                  ? questions[count].answer
                  : null
              )
            }
            title="Correct"
          />
          <Button
            disabled={count === questions.length}
            onPress={() =>
              this.onPressInCorrect(
                questions,
                count < questions.length - 1 || count === questions.length - 1
                  ? questions[count].answer
                  : null
              )
            }
            title="Incorrect"
          />
          {
            count===questions.length?(
              <PaperButton mode="contained" onPress={()=>this.setState({count:0,score:0,showAnswer:false})}>Restart Quiz</PaperButton>
            ):null
          }
          {
            count===questions.length?(
              <PaperButton mode="contained" onPress={()=>this.props.navigation.navigate('Deck')}>Go Back to Deck</PaperButton>
            ):null
          }
          {count === questions.length ? (
            <Text style={{textAlign:'center',textAlignVertical:'bottom',fontSize:20}}>{`Your Score : ${score}/${questions.length}`}</Text>
          ) : null}
        </View>
      );
    }
    else{
      quizContent=(
      <Text style={styles.text}>No Cards! Add one now!</Text>
      )
    }

    return <View>{quizContent}</View>;
  }
}

const styles=StyleSheet.create({
  text:{
    fontSize:20,
    textAlign:'center',
    fontWeight:'400'
  },
  textHeading:{
    fontSize:28,
    textAlign:'center',
    fontWeight:'600'
  }

})

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(
  mapStateToProps,
  {}
)(StartQuiz);
