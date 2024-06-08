import { ImageBackground, Text, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { Button } from '../../components/Button';
import { Stars } from '../../components/Stars';
import axios from 'axios';
import axiosRetry from 'axios-retry';

import { styles } from './styles';
import { useEffect } from 'react';
import db from "../../../sqlite/sqlite";
import { useUserResponse } from '../../models/users_response';

interface Params {
  total: string;
  points: string;
  userId: number;
}

export function Finish() {
  const route = useRoute();
  const { points, total, userId } = route.params as Params;
  const { responseHistoryDataByUserId, currentUserResponseHistory, userResponseHistoryData, userResponseHistory } = useUserResponse();

  const { navigate } = useNavigation();


  useEffect(() => {
    
    console.log()
    getUserResult()
  
  }, [])
  

  async function getUserResult(){
    await responseHistoryDataByUserId(db, userId)
    await userResponseHistoryData(db)
    console.log('all data', userResponseHistory)
    console.log('userData',currentUserResponseHistory) 
  }

  const sendData = async (url:string, data:any) => {
    try {
      await axios.post(url, data);
      console.log('Data sent successfully');
    } catch (error) {
      console.error('Error sending data', error);
    }
  };

  return (
    
    <ImageBackground
    source={require('./../../assets/background.png')} // path to your image
    style={styles.background}
    >
    <View style={styles.container}>
      <Stars />

      <View style={styles.message}>
        <Text style={styles.title}>
          Parabéns!
        </Text>

        <Text style={styles.subtitle}>
          Você acertou {currentUserResponseHistory['correctCount']} de {total} questões
        </Text>
        <Text style={styles.text}>PARABÉNS,</Text>
        <Text style={styles.text}>
          AO FINALIZAR ESSE QUIZZ VOCÊ GARANTE A SUA PARTICIPAÇÃO NO SORTEIO DE UMA VAGA NA
        </Text>
        <Text style={styles.textBold}>PÓS GRADUAÇÃO EM NUTRIÇÃO BARIÁTRICA DO INSTITUTO BSS.</Text>
        <Text style={styles.textLuck}>BOA SORTE!</Text>
      </View>

      <Button
        title="Encerrar"
        onPress={() => navigate('initQuizz')} 
      />
    </View>
    </ImageBackground>
  );
}