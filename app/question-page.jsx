import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import he from 'he'; // This library helps to decode HTML entities since the API returns the questions with HTML entities
import { Link, router } from 'expo-router';

const QuestionScreen = () => {
  const route = useRoute();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0); 
  const [selectedAnswer, setSelectedAnswer] = useState(null); 
  const [isCorrect, setIsCorrect] = useState(null);

 
  // Fetch questions from the API with the ID of the category passed from the Quiz screen
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&category=${route.params.id}&type=multiple`)
      .then(response => response.json())
      .then(data => setQuestions(data.results));
  }, [route.params.id]);

  const handleAnswer = (answer) => {
 
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore(score + 1);
    }
    // Move to the next question
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
    // End of the quiz
    alert(`Quiz finished. Your score is ${score}`);
    router.replace('/quiz');
    }
  };

  // If there are no questions, display a loading message
  // Could be from a rate limit or no internet connection
  // Go back to the previous screen if there are no questions
  if (!questions || questions.length === 0) {
    return (
    <>
      <SafeAreaView className='justify-center items-center h-full'>
        <ActivityIndicator size="large" color="#0000ff" />
        <Link className='mt-4 text-2xl' href='/quiz'>Go Back</Link>
      </SafeAreaView>
    </>
    );
  };

  const currentQuestion = questions[currentQuestionIndex];

  // Combine correct and incorrect answers and shuffle them into a random order
  const answers = [currentQuestion.correct_answer, ...currentQuestion.incorrect_answers];
  answers.sort(() => Math.random() - 0.5);

  const renderAnswer = (answer, index) => {
    return (
    <TouchableOpacity
      key={index}
      style={{ backgroundColor: '#159e75', padding: 10, margin: 5, borderRadius: 10, borderBlockColor: 'black',
        borderBottomLeftRadius: 10, borderBottomRightRadius: 10, borderWidth: 2, marginTop: 20, borderColor: 'black',
        alignItems: 'center', justifyContent: 'center', marginBottom: 10
      }}
      onPress={() => handleAnswer(answer)}
    >
      <Text  className="font-psemibold text-lg">{he.decode(answer)}</Text>
    </TouchableOpacity>
  );
};
  

  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#083344', alignItems: 'center' }}>
        <View>
          <Text className="font-pregular text-center text-3xl text-emerald-100">{he.decode(currentQuestion.question)}</Text>
          {answers.map(renderAnswer)}
        </View>
    </SafeAreaView>
  );
};

export default QuestionScreen;