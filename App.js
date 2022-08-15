import Share from "react-native-share";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Alert} from 'react-native';
import React from "react";
import { useState, useEffect } from 'react';
import Icon from "react-native-vector-icons/FontAwesome";
import * as Speech from "expo-speech";


export default function App(props) {
  const [Quote, setQuote] = useState();
  const [Author, setAuthor] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);


  const randomQuote = () => { 
    setIsLoading(true);
    fetch("https://api.quotable.io/random").then(res => res.json()).then(result => {
      setQuote(result.content);
      setAuthor(result.author);
      setIsLoading(false);
          })
  }

  
  const speak = () => {
    Speech.stop();
    Speech.speak(Quote + "This quote is by" + Author);
  }
  

  useEffect(() => {
    randomQuote();
  }, []);

  const showAlert = () => {
    Alert.alert("Message", "Quote has been copied", [
      {text: "Ok"}
    ])
  }
}
    const onShare = async () => {
      try {
        const result = await Share.share({
          message: 'React Native | A framework for building native apps using React',
        });
        if (result.action === Share.sharedAction) {
          if (result.activityType) {
            // shared with activity type of result.activityType
          } else {
            // shared
          }
        } else if (result.action === Share.dismissedAction) {
          // dismissed
        }
      } catch (error) {
        alert(error.message);
      }
    

  return (
    <ImageBackground
      style={styles.container}
      source={require("./assets/wallpaper.jpeg")}
    >
    <View
        style={{
          marginLeft: 20,
          width: "90%",
          backgroundColor: "#fff",
          borderRadius: 20,
          padding: "10%",
        }}
      >
        <StatusBar barStyle="light-content"/>
        <Text
          style={{
            textAlign: "center",
            fontSize: 26,
            fontWeight: "600",
            color: "#333",
            marginBottom: 12,
            fontWeight: "bold",
            padding: 17,
          }}
        >
          Quote of the Day
        </Text>
        <Icon name="quote-left" style={{ fontSize: 25 }} color="#000" />
        <Text
          style={{
            color: "#000",
            fontSize: 16,
            lineHeight: 26,
            letterSpacing: 1.0,
            fontWeight: "400",
            textAlign: "center",
            marginBottom: 10,
            paddingHorizontal: 30,
            marginTop: -25,
          }}
        >
          {Quote}
        </Text>
        <Icon
          name="quote-right"
          style={{
            fontSize: 25,
            textAlign: "right",
            marginTop: -30,
            marginBottom: 10,
          }}
          color="#000"
        />
        <Text
          style={{
            textAlign: "right",
            fontWeight: "300",
            fontStyle: "italic",
            fontSize: 16,
            color: "#000",
          }}
        >
          ----- {Author}
        </Text>
        <TouchableOpacity
          onPress={randomQuote}
          style={{
            backgroundColor: isLoading ? "#ADD8E6" : "#73c2fb",
            padding: 20,
            borderRadius: 30,
            marginVertical: 20,
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18, textAlign: "center" }}>
            {isLoading ? "Loading..." : "New Quote"}
          </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          <TouchableOpacity
            onPress={speak}
            style={{
              borderWidth: 2,
              borderColor: "#73c2fb",
              borderRadius: 50,
              padding: 15,
              color: isSpeaking ? "#73c2fb" : "#fff" 
            }}
          >
            <Icon name="volume-up" size={22} color={isSpeaking ? "#fff" : "#73c2fb"}> </Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={showAlert}
            style={{
              borderWidth: 2,
              borderColor: "#73c2fb",
              borderRadius: 50,
              padding: 15,
            }}
          >
            <Icon name="copy" size={22} color="#73c2fb"></Icon>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={randomQuote}
            style={{
              borderWidth: 2,
              borderColor: "#73c2fb",
              borderRadius: 50,
              padding: 15,
            }}
          >
            <Icon name="share-alt" size={22} color="#73c2fb"></Icon>
          </TouchableOpacity>
        </View>
      </View>
      </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    justifyContent: "center",
  },
  text:{
    marginTop: 10,
    color: "black",
    padding: 10 
  }
});
