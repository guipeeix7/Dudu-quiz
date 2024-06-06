import { Text, Dimensions } from 'react-native';
import Animated, { Keyframe, runOnJS } from 'react-native-reanimated';

import { Option } from '../Option';
import { styles } from './styles';
import { useEffect } from 'react';

type QuestionProps = {
  title: string;
  alternatives: string[];
}

type Props = {
  question: QuestionProps;
  alternativeSelected?: number | null;
  setAlternativeSelected?: (value: number) => void;
  onUnmount: () => void;
  isConfirmed?:number|null;
  correctAlternative?:number|null;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

export function Question({
  question,
  alternativeSelected,
  setAlternativeSelected,
  onUnmount,
  isConfirmed,
  correctAlternative
}: Props) {
  const enteringKeyframe = new Keyframe({
    0: {
      opacity: 0,
      transform: [
        { translateX: SCREEN_WIDTH },
        { rotate: '90deg' }
      ],
    },
    70: {
      opacity: 0.3,
    },
    100: {
      opacity: 1,
      transform: [
        { translateX: 0 },
        { rotate: '0deg' }
      ],
    }
  });

  const exitingKeyframe = new Keyframe({
    from: {
      opacity: 1,
      transform: [
        { translateX: 0 },
        { rotate: '0deg' }
      ],
    },
    to: {
      opacity: 0,
      transform: [
        { translateX: -SCREEN_WIDTH },
        { rotate: '-90deg' }
      ],
    }
  });


  useEffect(() => {    

    console.log("CURRENT STATE", correctAlternative);
  }, []);

  return (
    <Animated.View
      style={styles.container}
      entering={enteringKeyframe.duration(400)}
      exiting={exitingKeyframe.duration(400).withCallback(finished => {
        'worklet';

        if (finished) {
          runOnJS(onUnmount)();
        }
      })}
    >
      <Text style={styles.title}>
        {question.title}
      </Text>

      {
        question.alternatives.map((alternative, index) => (
          <Option
            key={index}
            title={alternative}
            isConfirmed={isConfirmed}
            correctAlternative = {correctAlternative}
            checked={alternativeSelected === index}
            alternativeSelected={alternativeSelected}
            index = {index}
            onPress={() => {
              if(!isConfirmed )
              setAlternativeSelected && setAlternativeSelected(index)
            }}
          />
        ))
      }
    </Animated.View>
  );
}
