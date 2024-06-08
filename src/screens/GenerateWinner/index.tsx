import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  ImageBackground,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ManageStorage } from '../../services/ManageStorage';

// Dummy array of numbers

export function GenerateWinner (){
  const [currentNumber, setCurrentNumber] = useState(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const [user, setUser] = useState(null);


  const drawNumber = async() => {
    // Draw a random number from the array
    let data
    let manageStorage = new ManageStorage('users');
    try {
      data = await manageStorage.getData(); 
    } catch (error) {
      console.error("Error saving users to AsyncStorage", error);
    }
  

    const randomIndex = Math.floor(Math.random() * data.length);
    const drawnNumber = data.map((x:any) => {return x[0].userId})[randomIndex];
    
    setCurrentNumber(drawnNumber);

    let findFela = data.map((x:any) => {return x[0]}).find((element:any) => 
      element.userId == drawnNumber
    )
    console.log(findFela, drawnNumber)
    setUser(user => findFela)
    // Reset animations
    fadeAnim.setValue(0);
    scaleAnim.setValue(1);

    // Start animations
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 2,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 3000,
        useNativeDriver: true,
      }),
    ]).start();
  };

  return (
    <ImageBackground
        source={require('./../../assets/background.png')} // path to your image
        style={styles.background}
      >
      <TouchableWithoutFeedback onPress={drawNumber}>
        <View style={styles.container}>
          {currentNumber !== null && (
            <Animated.View
              style={[
                styles.numberContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ scale: scaleAnim }],
                },
              ]}
            >
              <Text style={styles.number}>{(user!=null)?user.name: ''}</Text>
              {(user != null) ? 
          
                <View >
                  <Text style={styles.winnerText}>
                    Nome: {user.name}
                  </Text>
                  <Text style={styles.winnerText}>
                    Email: {user.email}
                  </Text>
                  <Text style={styles.winnerText}>
                    Telefone: {user.phone}
                  </Text>
                  
                </View>
              
                : <View></View>  
                
                }
            </Animated.View>
          )}
          <Text style={styles.instruction}>Toque em qualquer lugar para selecionar o novo vencedor!!!!</Text>
          
        </View>
      </TouchableWithoutFeedback>

    </ImageBackground>
    
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#2D3E3D',
  },
  numberContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  number: {
    fontSize: 80,
    marginBottom:36,
    color: 'white',
    fontWeight: 'bold',
  },
  instruction: {
    fontSize: 18,
    color: 'white',
    marginTop: 20,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2D3E3D',
  },
  text: {
    color: 'white',
    fontSize: 18,
  },
  winnerText: {
    color: 'white',
    fontSize: 36,
  },
  
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  }
});


