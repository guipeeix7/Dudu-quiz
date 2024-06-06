// import React, { useState, useRef, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableWithoutFeedback,
//   Animated,
// } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// // Dummy array of numbers
// const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// const HomeScreen = ({ navigation }) => {
//   const [currentNumber, setCurrentNumber] = useState(null);
//   const fadeAnim = useRef(new Animated.Value(0)).current;
//   const scaleAnim = useRef(new Animated.Value(1)).current;

//   const drawNumber = () => {
//     // Draw a random number from the array
//     const randomIndex = Math.floor(Math.random() * numbers.length);
//     const drawnNumber = numbers[randomIndex];
//     setCurrentNumber(drawnNumber);

//     // Reset animations
//     fadeAnim.setValue(0);
//     scaleAnim.setValue(1);

//     // Start animations
//     Animated.sequence([
//       Animated.timing(scaleAnim, {
//         toValue: 1.5,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//       Animated.timing(fadeAnim, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//       Animated.timing(scaleAnim, {
//         toValue: 1,
//         duration: 300,
//         useNativeDriver: true,
//       }),
//     ]).start();
//   };

//   return (
//     <TouchableWithoutFeedback onPress={drawNumber}>
//       <View style={styles.container}>
//         {currentNumber !== null && (
//           <Animated.View
//             style={[
//               styles.numberContainer,
//               {
//                 opacity: fadeAnim,
//                 transform: [{ scale: scaleAnim }],
//               },
//             ]}
//           >
//             <Text style={styles.number}>{currentNumber}</Text>
//           </Animated.View>
//         )}
//         <Text style={styles.instruction}>Tap anywhere to draw a number!</Text>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };