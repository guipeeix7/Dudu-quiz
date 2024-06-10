import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Alert,
  ImageBackground,
} from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import Animated, {
  useSharedValue,
  withSequence,
  withTiming,
  Easing,
} from "react-native-reanimated";

import { TextInputMask } from "react-native-masked-text";
import * as Haptics from "expo-haptics";
import { useUsers } from "../../models/users";
import db from "../../../sqlite/sqlite";
import { useUserResponse } from "../../models/users_response";

export function Identify() {
  const { users,getUsers,addUser, user, checkUserExistsByEmail, deleteUser,getUserIdByEmail, updateUserByEmail} = useUsers();
  const { clearUsersQuestions} = useUserResponse();
  
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

  function isAdmin(){
    if(name == 'admin' && email == 'admin@gmail.com'){
      return 1; 
    }
  }

  const validateFields = async () => {
    // return navigate("quiz", { id: "1", userId:1 });

    if(isAdmin()){
      return navigate("history");
    }

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

    // const phoneRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const cleaned = phone.replace(/\D/g, '')
    const phoneRegex = /^(\d{2})(\d{8,9})$/;
    const match = cleaned.match(phoneRegex);

    if (!match) {
      Alert.alert(
        "Alert",
        "Por favor preencha com um número de telefone válido"
      );
      return false;
    }
    await checkUserExistsByEmail(db, email).then((hasUser) => {
      if(!hasUser){
        let uid = new Date().getTime();
        console.log(uid)
        addUser(db, uid, name,email,phone );
      }
      else{
        updateUserByEmail(db, name,email,phone)
        console.log('updated')
      }
    })
    .then(()=>{
      let userId; 
      getUserIdByEmail(db, email).then((result:any) => {
        userId = result.userId;        
        clearUsersQuestions(db, userId)

        navigate("quiz", { id: "1", userId:Number(userId) });
      })
    })
  };

  useEffect(() => {
    getUsers(db);
  }, []);

  return (
    <ImageBackground
        source={require('./../../assets/background.png')} // path to your image
        style={styles.background}
      >

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
                {/* <Icon name="arrow-right" size={20} color="white" type="entypo" /> */}
              </Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ImageBackground>
  );
}
