import { Text, TouchableOpacity, TouchableOpacityProps } from "react-native";
import {
  Canvas,
  Skia,
  Path,
  Circle,
  BlurMask,
  runTiming,
  useValue,
  Easing,
} from "@shopify/react-native-skia";

import { styles } from "./styles";
import { THEME } from "../../styles/theme";
import { useEffect } from "react";

type Props = TouchableOpacityProps & {
  checked: boolean;
  title: string;
  correctAlternative?: number | null;
  isConfirmed?: number | null;
  index?: number | null;
  alternativeSelected?: number | null;
};

const CHECK_SIZE = 28;
const CHECK_STROKE = 2;
const RADIUS = (CHECK_SIZE - CHECK_STROKE) / 2;
const CENTER_CIRCLE = RADIUS / 2;

export function Option({
  checked,
  title,
  correctAlternative,
  isConfirmed,
  index,
  alternativeSelected,
  ...rest
}: Props) {
  const percentage = useValue(0);
  const circle = useValue(0);

  const path = Skia.Path.Make();
  path.addCircle(CHECK_SIZE, CHECK_SIZE, RADIUS);

  useEffect(() => {
    if (checked) {
      runTiming(percentage, 1, { duration: 700 });
      runTiming(circle, CENTER_CIRCLE, { easing: Easing.bounce });
    } else {
      runTiming(percentage, 0, { duration: 700 });
      runTiming(circle, 0, { duration: 300 });
    }
  }, [checked]);



  const getColor = () => {

    if((alternativeSelected == index) && !isConfirmed) return THEME.COLORS.STAR_GREEN;
    // if((alternativeSelected == index) && isConfirmed) return THEME.COLORS.WHITE;
     
    if(!isConfirmed) return THEME.COLORS.WHITE; 
    else if(index == correctAlternative ){
      return THEME.COLORS.STAR_GREEN; 
    }
    else if(alternativeSelected != correctAlternative && alternativeSelected == index ){
      return THEME.COLORS.DANGER_LIGHT;
    }
    else return THEME.COLORS.WHITE;
    
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        checked && styles.checked,
        index == correctAlternative && isConfirmed ? styles.checked : [],
        correctAlternative != index && isConfirmed && alternativeSelected == index ? styles.wrong : [],
      ]}
      {...rest}
    >
      <Canvas style={{ width: CHECK_SIZE * 2, height: CHECK_SIZE * 2 }}>
        <Path
          path={path}
          color={getColor()}
          style="stroke"
          strokeWidth={CHECK_STROKE}
        />

        <Path
          path={path}
          color={
            getColor()
          }
          style="stroke"
          strokeWidth={CHECK_STROKE}
          start={0}
          end={percentage}
        />

        <Circle
          cx={CHECK_SIZE}
          cy={CHECK_SIZE}
          r={circle}
          color={
            getColor()
          }
        >
          <BlurMask blur={4} style="solid" />
        </Circle>
      </Canvas>

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
