import { Alert, BackHandler, ImageBackground, Text, TouchableHighlight, View, Image} from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import { styles } from './styles';

import { QUIZ } from '../../data/quiz';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { Button } from '../../components/Button';
// import { Image } from 'react-native-elements';
interface Params {
  id: string;
  userId: number
}

type InitQuiz = typeof QUIZ[0];

const CARD_INCLINATION = 10;
const CARD_SKIP_AREA = -200;

export function InitQuizz() {

  const { navigate } = useNavigation();
  

  return (
    <ImageBackground source={require('./../../assets/init.png')} style={styles.container}>
      <TouchableWithoutFeedback 
          style={{
            width: 9999,
            height: 9999
          }}
          onPress={() => {navigate('identify')}}>
        </TouchableWithoutFeedback>
    </ImageBackground>
  );
}
