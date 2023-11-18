import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Permissions, Notifications } from "expo";
import * as Animatable from "react-native-animatable";

import { Card, Title, Button } from "react-native-paper";
import {
  getDecksAction,
  removeDecksAction,
  getDeckAction
} from "../../actions/deckActions";

class Decks extends Component {
  state = {
    decks: []
    };

  registerForPushNotificationsAsync = async () => {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
 if (finalStatus !== "granted") {
      return;
    }

    let myToken;
    await Notifications.getExpoPushTokenAsync()
      .then(token => (myToken = token))
      .catch(err => err);
    return;
  };

  async componentDidMount() {
    await this.props.getDecksAction();
    await this.registerForPushNotificationsAsync();
    await this.sendPushNotifications();
  }

  sendPushNotifications = async() => {
    await Notifications.scheduleLocalNotificationAsync({
      title: "Been busy?",
      body: "We've not seen you around lately! Take a quick quiz!"
    },{time:new Date().getTime()+3000,repeat:"day"})
    .then(res=>{
    })
    .catch(err=>err); 
  };

  componentWillReceiveProps(nextProps) {
    const { decks } = nextProps.decks;
    if (decks) {
      this.setState({ decks });
    }
  }

  onPressCard = title => {
    this.props.getDeckAction(title, this.props.navigation);
  };

  render() {
    const { decks } = this.state;

    let decksContent;

    const CardComponent = Animatable.createAnimatableComponent(Card);

    if (decks.length > 0) {
      decksContent = decks.map((deck, index) => (
        <CardComponent
          style={styles.deckCards}
          key={index}
          ref={(ref) => this.card = ref}
          onPress={() => {
            this.card.bounce(600)
            .then(endState=>{
              this.onPressCard(deck[0]);
            })
            .catch(err=>err);
           
          }}
        >
          <Title style={{ textAlign: "center" }}>{deck[0]}</Title>
          <Title style={{ textAlign: "center" }}>{`${
            JSON.parse(deck[1]).questions.length
          } ${
            JSON.parse(deck[1]).questions.length === 1 ? "card" : "cards"
          }`}</Title>
        </CardComponent>
      ));
    }

    return (
      <ScrollView>
        <Text style={{ textAlign: "center", fontSize: 30 }}>Decks</Text>
        {decksContent}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  deckCards: {
    textAlign: "center",
    textAlignVertical: "top",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#000000"
  }
});

const mapStateToProps = state => ({
  decks: state.decks
});

export default connect(
  mapStateToProps,
  { getDecksAction, removeDecksAction, getDeckAction }
)(Decks);
