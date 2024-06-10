import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import Animated, { Layout, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';

import { Header } from '../../components/Header';
import { HistoryCard, HistoryProps } from '../../components/HistoryCard';

import { styles } from './styles';
import { Loading } from '../../components/Loading';
import { Text } from 'react-native-elements';
import { useUserResponse } from '../../models/users_response';
import db from '../../../sqlite/sqlite';
import { useUsers } from '../../models/users';

export function History() {
  const { userResponseHistoryData, getAllUsersAnswers, checkUserResponseAlreadyExists, updateResponse, addUserResponse } = useUserResponse();
  const { getAllUsers, checkUserExistsByEmail, updateUserByEmail, addUser } = useUsers();

  const [isLoading, setIsLoading] = useState(true);

  const [history, setHistory] = useState<HistoryProps[]>([]);
  const { navigate } = useNavigation();

  const swipeableRefs = useRef<Swipeable[]>([]);
  

  async function fetchHistory() {
    let history; 
    await userResponseHistoryData(db).then((response:any) => {
      setHistory(response);
    })
    
    setIsLoading(false);
  }

  const pushData = async () => {
    
    await getAllUsers(db).then(async (result:any) => {
      const response = await fetch('https://bariatricasemsofrimento.com.br/system/panel/quizz', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizzUserData: result
        }),
      })
      .then(json => {
        Alert.alert('Sucesso', "Dados atualizados com sucesso.")
      })
      .catch(error => {
        Alert.alert('Alerta', "Não foi possível completar a solicitação.")
      });

    });

    await getAllUsersAnswers(db).then(async (result2:any) => {
      console.log(result2)

      const response2 = await fetch('https://bariatricasemsofrimento.com.br/system/panel/quizz_answer', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          quizzUserData: result2
        }),
      })
      .then(json => {
        // Alert.alert('Sucesso', "Dados atualizados com sucesso.")
      })
      .catch(error => {
        Alert.alert('Alerta', "Não foi possível completar a solicitação.")
      });
    });
    
  };

  const pullData = async () => {        
    Alert.alert('Aviso', "Atualizando dados, por favor aguarde")

    await getAllUsers(db).then(async (result:any) => {
      const response = await fetch('https://bariatricasemsofrimento.com.br/system/panel/quizz', {})
      .then(response => response.json())
      .then(async json => {

        // console.log(json[0].id)
        for await (let element of json) {
          await checkUserExistsByEmail(db, element.email).then(async (hasUser) => {
            if(!hasUser){
              let uid = new Date().getTime();
              await addUser(db, uid, element.name,element.email,element.phone );
              console.log('creates')
            }
            else{
              await updateUserByEmail(db, element.name,element.email,element.phone)
              console.log('updated')
            }
          })
        }
        // Alert.alert('Sucesso', "Dados atualizados com sucesso.")

      })
      .catch(error => {
        Alert.alert('Alerta', "Não foi possível completar a solicitação.")
      });

    });

    await getAllUsersAnswers(db).then(async (result2:any) => {
      const response = await fetch('https://bariatricasemsofrimento.com.br/system/panel/quizz_answer', {})
        .then(response => response.json())
        .then(async json => {
          for await (let element of json) {
            await checkUserResponseAlreadyExists(db, element.userId, element.questionId).then(async (hasResponse) => {
              if(hasResponse){
                console.log('updated')
                await updateResponse(db, element.userId, element.currentQuestion, element.correct)
              }
              else{
                console.log('inserted')
                await addUserResponse(db, element.userId, element.questionId, element.isCorrect)
              }
            })

          }
          Alert.alert('Sucesso', "Dados atualizados com sucesso.")

        })
        .catch(error => {
          Alert.alert('Alerta', "Não foi possível completar a solicitação.")
        });
    });
  };

  function handleRemove(id: string, index: number) {
    swipeableRefs.current?.[index].close();

    Alert.alert(
      'Remover',
      'Deseja remover esse registro?',
      [
        {
          text: 'Sim', onPress: () => remove(id)
        },
        { text: 'Não', style: 'cancel' }
      ]
    );

  }

  useEffect(() => {
    fetchHistory();
  }, []);

  if (isLoading) {
    return <Loading />
  }

  return (
    
    <View style={styles.container}>
    <ImageBackground
        source={require('./../../assets/background.png')} // path to your image
        style={styles.background}
      >
      <Header
        title="Histórico"
        subtitle={`Resultados passados ${'\n'}`}
      />
      
      <TouchableOpacity
          onPress={() => pushData()}
          style={styles.pushDataBtn}
        >
          <Text style={styles.buttonText}>
            Enviar Dados
          </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
          onPress={() => pullData()}
          style={styles.pullDataBtn}
        >
          <Text style={styles.buttonText}>
            Receber Dados
          </Text>
      </TouchableOpacity>
      
      <TouchableOpacity
          onPress={() => navigate('sortWinner')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Sortear Vencedor
          </Text>
      </TouchableOpacity>

      <ScrollView
        contentContainerStyle={styles.history}
        showsVerticalScrollIndicator={false}
      >
        {
          history.map((item, index) => (
            <Animated.View
              key={item.id}
              entering={SlideInRight}
              exiting={SlideOutRight}
              layout={Layout.springify()}
            >
              {/* <Swipeable
                ref={ref => {
                  if (ref) {
                    swipeableRefs.current.push(ref);
                  }
                }}
                // containerStyle={styles.swipeContainer}
                // renderLeftActions={() => (
                //   <View style={styles.swipeRemove}>
                //     <Trash size={32} color={THEME.COLORS.GREY_100} />
                //   </View>
                // )}
                renderRightActions={() => null}
                overshootLeft={false}
                leftThreshold={10}
                onSwipeableOpen={() => handleRemove(item.id, index)}
              > */}
                <HistoryCard data={item} />
              </Swipeable>
            </Animated.View>
          ))
        }
      </ScrollView>
    </ImageBackground>
    </View>
  );
}