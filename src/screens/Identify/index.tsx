import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import { THEME } from "../../styles/theme";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
  interpolate,
  Easing,
  useAnimatedScrollHandler,
  Extrapolate,
  runOnJS,
} from "react-native-reanimated";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInputMask } from "react-native-masked-text";
import { Icon } from "react-native-elements";
import * as Haptics from "expo-haptics";
import { ManageStorage } from "../../services/ManageStorage";

export function Identify() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const { navigate } = useNavigation();
  const shake = useSharedValue(0);

  async function shakeAnimation() {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

    shake.value = withSequence(
      withTiming(3, { duration: 400, easing: Easing.bounce }),
      withTiming(0, undefined, (finished) => {
        "worklet";
      })
    );
  }


  const validateFields = async () => {
    if (!name.trim()) {
      Alert.alert("Alerta", "O campo nome é obrigatório.");
      return false;
    }
    if (!email.trim()) {
      Alert.alert("Alert", "O campo email é obrigatório.");
      return false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert(
        "Alert",
        "Por favor preencha com um endereço de email válido."
      );
      return false;
    }
    let manageStorage =  new ManageStorage('users'); 
    
    // manageStorage.clearAsyncStorage();
    
    let userId = await manageStorage.countData();

    try {
      let newUserData = [{userId:userId , name: name, email: email, phone: phone }];
      manageStorage.addData(newUserData);
    } catch (error) {
      Alert.alert("Error", "Failed to save the data to the storage");
    }

    navigate("quiz", { id: "1", userId:userId });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.headerLogo}>Complete Bari</Text>
        <Text style={styles.subHeader}>QUIZZ</Text>

        <Text
          style={styles.inputLabel}
          aria-label="Label for Name"
          nativeID="labelForName"
        >
          Nome:
        </Text>
        <TextInput
          aria-labelledby="labelForName"
          value={name}
          onChangeText={(text) => setName(text)}
          style={styles.input}
        />

        <Text
          style={styles.inputLabel}
          aria-label="Label for Email"
          nativeID="labelForEmail"
        >
          Email:
        </Text>
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
        />

        <Text
          style={styles.inputLabel}
          aria-label="Label for Phone"
          nativeID="labelForEmail"
        >
          Telefone:
        </Text>
        <TextInputMask
          value={phone}
          onChangeText={(text) => setPhone(text)}
          style={styles.input}
          keyboardType="phone-pad"
          type={"cel-phone"}
          options={{
            maskType: "BRL",
            withDDD: true,
            dddMask: "(99) ",
          }}
        />

        <TouchableOpacity
          onPress={() => validateFields()}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            Iniciar
            <Icon name="arrow-right" size={20} color="white" type="entypo" />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
