import { useEffect, useRef, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, ScrollView, Alert, ImageBackground, TouchableOpacity } from 'react-native';
import { HouseLine, Trash } from 'phosphor-react-native';
import Animated, { Layout, SlideInRight, SlideOutRight } from 'react-native-reanimated';
import { Swipeable } from 'react-native-gesture-handler';

import { Header } from '../../components/Header';
import { HistoryCard, HistoryProps } from '../../components/HistoryCard';

import { styles } from './styles';
import { historyGetAll, historyRemove } from '../../storage/quizHistoryStorage';
import { Loading } from '../../components/Loading';
import { THEME } from '../../styles/theme';
import { Button } from '../../components/Button';
import { WinnerGenButton } from '../../components/WinnerGenButton';
import { Text } from 'react-native-elements';

export function History() {
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<HistoryProps[]>([]);
  const { navigate } = useNavigation();

  const swipeableRefs = useRef<Swipeable[]>([]);
  

  async function fetchHistory() {
    const response = await historyGetAll();
    setHistory(response);
    setIsLoading(false);
  }

  async function remove(id: string) {
    await historyRemove(id);

    fetchHistory();
  }


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
              <Swipeable
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
              >
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