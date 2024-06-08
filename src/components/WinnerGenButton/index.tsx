import { ArrowRight, Check } from 'phosphor-react-native';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';

export function WinnerGenButton({ ...rest }: TouchableOpacityProps) {
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      {...rest}
      onPress={ navigate("sortWinner") }
    >
      <Text style={styles.title}>
        Fazer sorteio
      </Text>

      <ArrowRight
        color={THEME.COLORS.GREEN_0}
        weight="bold"
        size={24}
      />
    </TouchableOpacity>
  );
}