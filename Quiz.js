import React, {useState} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';

const questions = [
    {
        question: "Who is Luke Skywalker's father?",
        answers: ['Obi-Wan Kenobi', 'Emperor Palpatine', 'Darth Vader', 'Yoda'],
        correct: 2
    },
    {
        question: 'Which planet is the home of the Wookiees?',
        answers: ['Endor', 'Hoth', 'Kashyyyk', 'Tatooine'],
        correct: 2
    },
    {
        question: 'Who is the Princess that later played a key leadership role in the Resistance?',
        answers: ['Leia Organa', 'Padmé Amidala', 'Rey', 'Ahsoka Tano'],
        correct: 0
    },
    {
        question: 'Who said "It’s a trap!"?',
        answers: ['Luke Skywalker', 'Admiral Ackbar', 'Han Solo', 'Lando Calrissian'],
        correct: 1
    },
    {
        question: 'Which order led to the Jedi being greatly outnumbered?',
        answers: ['Order 65', 'Order 77', 'Order 99', 'Order 66'],
        correct: 3
    },
    {
        question: 'Who trained Luke Skywalker?',
        answers: ['Darth Vader', 'Leia Organa', 'Obi-Wan Kenobi', 'Padmé Amidala'],
        correct: 2
    },
    {
        question: 'Which character shot first in the Mos Eisley Cantina?',
        answers: ['Luke Skywalker', 'Boba Fett', 'Han Solo', 'Greedo'],
        correct: 2
    }
];

export default function Quiz() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);

    const currentQuestion = questions[currentIndex];

    function handleAnswer(index) {
        setSelectedAnswer(index);
        if (index === currentQuestion.correct) {
            setScore(score + 1);
        }

        setTimeout(function () {
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
                setSelectedAnswer(null);  // Reset for the next question
            } else {
                setCurrentIndex(questions.length);
            }
        }, 500);
    };

    if (currentIndex === questions.length) {
        return (
            <View style={styles.container}>
                {/*Score display is a function below*/}
                <ScoreDisplay score={score} total={questions.length} onRestart={function () {
                    setCurrentIndex(0);
                    setScore(0);
                    setSelectedAnswer(null);  // Reset selection when restarting
                }}/>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/*Question display is a function below*/}
            <QuestionDisplay text={currentQuestion.question}/>
            {/*Answers is a function below*/}
            <Answers answers={currentQuestion.answers} selectedAnswer={selectedAnswer} onAnswerSelected={handleAnswer}/>
        </View>
    );
}

function QuestionDisplay(props) {
    return (
        <Text style={styles.questionText}>{props.text}</Text>
    );
}

function ScoreDisplay(props) {
    return (
        <View>
            <Text style={styles.scoreText}>Your Score: {props.score} out of {props.total}</Text>
            <Button title="Restart" color="#f39c12" onPress={props.onRestart}/>
        </View>
    );
}

function Answers(props) {
    const answerButtons = [];

    for (let i = 0; i < props.answers.length; i++) {
        const answer = props.answers[i];
        const isSelected = i === props.selectedAnswer;

        const button = (
            <AnswerButton
                key={i}
                answer={answer}
                isSelected={isSelected}
                onPress={function () {
                    props.onAnswerSelected(i);
                }}
            />
        );

        answerButtons.push(button);
    }

    return (
        <View>
            {answerButtons}
        </View>
    );
}


function AnswerButton(props) {
    const buttonStyle = props.isSelected ? styles.selectedButton : styles.button;
    return (
        <View style={styles.buttonContainer}>
            <Button title={props.answer} color={buttonStyle.color} onPress={props.onPress}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    questionText: {
        fontSize: 20,
        color: '#ecf0f1',
        marginBottom: 20,
    },
    scoreText: {
        fontSize: 24,
        color: '#ecf0f1',
        marginBottom: 20,
    },
    buttonContainer: {
        width: '100%',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    button: {
        color: '#f39c12',
    },
    selectedButton: {
        color: '#27ae60',
    }
});
