import { Text, View } from 'react-native';

import { LevelBars } from '../LevelBars';

import { styles } from './styles';

export type HistoryProps = {
  id: string;
  userId: number;
  title: string;
  points: number;
  questions: number;
  level: number;
}

type Props = {
  data: HistoryProps;
}


export function HistoryCard({ data }: Props) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>
          {data.title}
        </Text>

        <Text style={styles.subtitle}>
          Você acertou {data.points} de {data.questions}
        </Text>
        <Text style={styles.subtitle}>
          User Id {data.userId}
        </Text>
        
      </View>

      <LevelBars level={data.level} />
    </View>
  );
}