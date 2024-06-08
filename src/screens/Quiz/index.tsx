import { useEffect, useLayoutEffect, useState } from 'react';
import { Alert, BackHandler, ImageBackground, Text, View } from 'react-native';
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
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Audio } from 'expo-av';
import * as Haptics from 'expo-haptics';

import { styles } from './styles';
import { THEME } from '../../styles/theme';

import { QUIZ } from '../../data/quiz';
import { historyAdd } from '../../storage/quizHistoryStorage';

import { Loading } from '../../components/Loading';
import { Question } from '../../components/Question';
import { QuizHeader } from '../../components/QuizHeader';
import { ConfirmButton } from '../../components/ConfirmButton';
import { OutlineButton } from '../../components/OutlineButton';
import { ProgressBar } from '../../components/ProgressBar';
import { OverlayFeedback } from '../../components/OverlayFeedback';
import { ManageStorage } from '../../services/ManageStorage';
import { ShowAnswerButton } from '../../components/ShowAnswerButton';
import { CancelButton } from '../../components/CancelButton';
import { useFonts } from 'expo-font';
import * as SQLite from 'expo-sqlite';

import { useUserResponse } from "../../models/users_response";
import db from "../../../sqlite/sqlite";
import { useUsers } from '../../models/users';
interface Params {
  id: string;
  userId: number
}

type QuizProps = typeof QUIZ[0];

const CARD_INCLINATION = 10;
const CARD_SKIP_AREA = -200;


export function Quiz() {
  
  const [points, setPoints] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [quiz, setQuiz] = useState<QuizProps>({} as QuizProps);
  const [alternativeSelected, setAlternativeSelected] = useState<null | number>(null);
  const [statusReply, setStatusReply] = useState(0);
  const [isConfirmed, setIsConfirmed] = useState(0);
  const [correctAlternative, setCorrectAlternative] = useState<number>();
  const shake = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const cardPosition = useSharedValue(0);

  const { navigate } = useNavigation();

  const route = useRoute();
  const { usersResponses, getUsersResponse,addUserResponse, deleteUserResponse, checkUserResponseAlreadyExists, updateResponse, userResponseAlreadyExists } = useUserResponse();
  const { users,getUsers,addUser, user, checkUserExistsByEmail, deleteUser,getUserIdByEmail, updateUserByEmail} = useUsers();

  const { id,userId  } = route.params as Params;

  useLayoutEffect(() => {
    //check local token or something
 // const quizSelected = QUIZ.filter(item => item.id === id)[0];
    getUsersResponse(db)

    const quizSelected = getQuestionsByLevel(QUIZ, 1)[0];

    setQuiz(quizSelected);
    // console.log("ARROBAAAAAA",quiz.questions.length)

    setIsLoading(false);
  }, []);


  
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleStop,
    );

    return () => backHandler.remove();
  }, []);


  async function showResult(){
    if (alternativeSelected === null) {
      setIsConfirmed(isConfirmed => 0);

      return handleSkipConfirm();
    }

    let correct = (quiz.questions[currentQuestion].correct === alternativeSelected) ? 1 : 0; 

    if (correct) {
      setPoints((points) => points+1 );

      setAlternativeSelected(null)
      setIsConfirmed(isConfirmed=>1)
      await setStatusReply(1);      
      
      await storeQuestionAnswer(correct);  
      await setTimeout(async () => {
        await handleNextQuestion();
        console.log("expecting first")
        setIsConfirmed(isConfirmed=>0)
      },1800)
    }
    else{
      setIsConfirmed(isConfirmed=>1)
    }
    
  }

  function handleSkipConfirm() {
    Alert.alert('Pular', 'Deseja realmente pular a questão?', [
      { text: 'Sim', onPress: () => handleNextQuestion() },
      { text: 'Não', onPress: () => { } }
    ]);
  }

  async function handleFinished() {
    await historyAdd({
      id: new Date().getTime().toString(),
      userId: userId,
      title: quiz.title,
      level: quiz.level,
      points,
      questions: quiz.questions.length
    });

    navigate('finish', {
      points: String(points),
      total: String(quiz.questions.length),
    });
  }

  async function handleNextQuestion() {
    if (currentQuestion < quiz.questions.length - 1) {
      await setCurrentQuestion(prevState => prevState + 1)
      console.log("expecting first")
    } else {
      await handleFinished();
    }
  }

  async function storeQuestionAnswer(correct:number){
    if(userResponseAlreadyExists){
      console.log('updated')
      await updateResponse(db, userId, currentQuestion, correct)
    }
    else{
      console.log('inserted')
      await addUserResponse(db, userId, currentQuestion, correct)
    }
  }

  async function handleConfirm() {
    let correct = (quiz.questions[currentQuestion].correct === alternativeSelected) ? 1 : 0; 

    if (!correct) {
      setStatusReply(2);
      shakeAnimation();
    }
    console.log("POIIINTSS",points)

    let manageStorage = new ManageStorage('users_questions');
    await checkUserResponseAlreadyExists(db,userId, currentQuestion);

    await storeQuestionAnswer(correct);
    
    try {
      manageStorage.addData([{userId: userId, questionId :currentQuestion, isCorrect: correct }]); 
    } catch (error) {
      console.error("Error saving users to AsyncStorage", error);
    }
    
    setIsConfirmed(isConfirmed => 0);    
    setAlternativeSelected(null);
  }

  function handleStop() {
    Alert.alert('Parar', 'Deseja parar agora?', [
      {
        text: 'Não',
        style: 'cancel',
      },
      {
        text: 'Sim',
        style: 'destructive',
        onPress: () => navigate('identify')
      },
    ]);

    return true;
  }

  async function shakeAnimation() {
    await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);

    shake.value = withSequence(
      withTiming(3, { duration: 400, easing: Easing.bounce }),
      withTiming(0, undefined, finished => {
        'worklet';

        if (finished) {
          runOnJS(handleNextQuestion)()
        }
      })
    );
  }

  const shakeStyleAnimated = useAnimatedStyle(() => ({
    transform: [{
      translateX: interpolate(
        shake.value,
        [0, 0.5, 1, 1.5, 2, 2.5, 3],
        [0, -15, 0, 15, 0, -15, 0],
      ),
    }]
  }));

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    }
  });

  const fixedProgressBarStyles = useAnimatedStyle(() => ({
    position: 'absolute',
    zIndex: 1,
    paddingTop: 50,
    backgroundColor: THEME.COLORS.GREY_500,
    width: '110%',
    left: '-5%',
    opacity: interpolate(scrollY.value, [50, 90], [0, 1], Extrapolate.CLAMP),
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [50, 100],
          [-40, 0],
          Extrapolate.CLAMP,
        )
      }
    ]
  }));

  const headerStyles = useAnimatedStyle(() => ({
    opacity: interpolate(scrollY.value, [60, 90], [1, 0], Extrapolate.CLAMP),
  }));

  const onPan = Gesture
    .Pan()
    .activateAfterLongPress(200)
    .onUpdate(event => {
      const moveToLeft = event.translationX < 0;

      if (moveToLeft) {
        cardPosition.value = event.translationX;
      }
    })
    .onEnd(event => {
      if (event.translationX < CARD_SKIP_AREA) {
        runOnJS(handleSkipConfirm)();
      }

      cardPosition.value = withTiming(0);
    })


  function getQuestionsByLevel(quiz: any[], numQuestions: number): any[] {
    const questions: any[] = [];
    
    const groupedByLevel = quiz.reduce((acc, curr) => {
        acc[curr.id] = [...(acc[curr.id] || []), ...curr.questions];
        return acc;
    }, {});
    
    for (const level in groupedByLevel) {
        if (Object.prototype.hasOwnProperty.call(groupedByLevel, level)) {
            const levelQuestions = groupedByLevel[level];
            const randomIndices = getUniqueRandomIndices(numQuestions, levelQuestions.length)
            randomIndices.forEach(index => questions.push(levelQuestions[index]));
        }
    }

    let data = [{
      id: '1',
      title: 'QUIZZ COMPLETE BARI',
      level: 1,
      questions: questions

    }]

    return data;
  }

  const dragStyles = useAnimatedStyle(() => {
    const rotateZ = cardPosition.value / CARD_INCLINATION;
    return {
      transform: [
        { translateX: cardPosition.value },
        { rotateZ: `${rotateZ}deg` }
      ]
    }
  });

  function getUniqueRandomIndices(numQuestions:any, levelQuestionsLength:any) {
    // Create an array of indices
    const indices = Array.from({ length: levelQuestionsLength }, (_, index) => index);
  
    // Shuffle the array using Fisher-Yates algorithm
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }


    // Return the first numQuestions indices
    return indices.slice(0, numQuestions);
  }

  if (isLoading) {
    return <Loading />
  }
  return (
    
      <ImageBackground
        source={require('./../../assets/background.png')} // path to your image
        style={styles.background}
      >
        
      <OverlayFeedback status={statusReply} />
      <View style={styles.container}>

        <Animated.View style={fixedProgressBarStyles}>
          <Text style={styles.title}>{quiz.title}</Text>

          <ProgressBar
            total={quiz.questions.length}
            current={currentQuestion + 1}
          />
        </Animated.View>

        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.question}
          onScroll={scrollHandler}
          scrollEventThrottle={16}
        >
          <Animated.View style={[styles.header, headerStyles]}>
            <QuizHeader
              title={quiz.title}
              currentQuestion={currentQuestion + 1}
              totalOfQuestions={quiz.questions.length}
            />
          </Animated.View>

          <GestureDetector gesture={onPan}>
            <Animated.View style={[shakeStyleAnimated, dragStyles]}>
              <Question
                key={quiz.questions[currentQuestion].title}
                question={quiz.questions[currentQuestion]}
                alternativeSelected={alternativeSelected}
                setAlternativeSelected={setAlternativeSelected}
                isConfirmed = {isConfirmed}
                correctAlternative = { quiz.questions[currentQuestion].correct }
                onUnmount={() => setStatusReply(0)}
              />
            </Animated.View>
          </GestureDetector>

          
        </Animated.ScrollView>
        <View style={styles.footer}>
            <CancelButton title="Parar" onPress={handleStop} />

            {(isConfirmed == 0) ? (
              <ShowAnswerButton onPress={ showResult  } />
            ):
            <ConfirmButton onPress={handleConfirm} />
          }
          </View>
      </View >
    </ImageBackground>
  );
}
