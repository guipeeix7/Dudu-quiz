import { ArrowRight, Check } from 'phosphor-react-native';
import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';
import { THEME } from '../../styles/theme';

export function ConfirmButton({ ...rest }: TouchableOpacityProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      {...rest}
    >
      <Text style={styles.title}>
        Próxima
      </Text>

      <ArrowRight
        color={THEME.COLORS.WHITE}
        weight="bold"
        size={24}
      />
    </TouchableOpacity>
  );
}