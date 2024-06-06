import AsyncStorage from '@react-native-async-storage/async-storage';
import { HistoryProps } from '../components/HistoryCard';
import { Alert } from 'react-native';

const HISTORY_COLLECTION = '@ignite_quiz:history';

export async function historyGetAll() {
  try {
    const storage = await AsyncStorage.getItem(HISTORY_COLLECTION);
    const history: HistoryProps[] = storage ? JSON.parse(storage) : [];

    const users = await AsyncStorage.getItem('users');
    let userData  = JSON.parse(users || '{}');


    for(let i = 0 ; i <  history.length ; i++){
      let findFela = userData.map((x:any) => {return x[0]}).find((element:any) => 
        element.userId == history[i].userId
      )
      history[i].userName = findFela.name 
      history[i].email = findFela.email 
      
    }

    console.log(history)

    return history;
  } catch (error) {
    Alert.alert('Opa', 'Não foi possível obter o histórico.');

    return [];
  }
}

export async function historyAdd(newHistory: HistoryProps) {
  try {
    const response = await historyGetAll();
    const storedHistory = response ? response : [];

    const storage = JSON.stringify([...storedHistory, newHistory]);

    await AsyncStorage.setItem(HISTORY_COLLECTION, storage);
  } catch (error) {
    throw error;
  }
}

export async function historyRemove(id: string) {
  try {
    const storage = await historyGetAll();

    const filtered = storage.filter(history => history.id !== id);
    const histories = JSON.stringify(filtered);

    await AsyncStorage.setItem(HISTORY_COLLECTION, histories);
  } catch (error) {
    throw error;
  }
}