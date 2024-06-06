import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

const CircleOfDots = () => {
  const dots = [];
  const numDots = 14;
  const radius = 50; // Radius of the circle of dots
  const dotRadius = 5; // Radius of each dot

  for (let i = 0; i < numDots; i++) {
    const angle = (i * 2 * Math.PI) / numDots;
    const x = radius + radius * Math.cos(angle);
    const y = radius + radius * Math.sin(angle);
    dots.push(<Circle key={i} cx={x} cy={y} r={dotRadius} fill="white" />);
  }

  return (
    <View style={styles.container}>
      <Svg  height="100" width="100">
        {dots}
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor:'transparent', // Dark background color
  },
});

export default CircleOfDots;