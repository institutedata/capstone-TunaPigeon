

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import "./Quiz.css";
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  // const [isFlipped, setFlipped] = useState(false);

  const handleFlip = (id) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        question.id === id ? { ...question, isFlipped: !question.isFlipped } : question
      )
    );
  };


  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://api.sampleapis.com/avatar/questions');
        setQuestions(response.data);

      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);




  return (
    <div className="App">
      <h1>Questions</h1>
      <Grid container spacing={2}>
        {questions.map((questionData) => (
          <Grid key={questionData.id} item xs={12} sm={6} md={3}>
            <div className="container">
              <div className={`flip-card ${questionData.isFlipped ? "flipped" : ""}`}>
                <div className="flip-card-inner">
                  <div className="flip-card-front">
                    <div className="card-content">
                      <Card>
                        <CardContent>
                          <div>
                            <h2>Question: {questionData.question}</h2>
                            <h3>Possible Answers:</h3>
                            <ul>
                              {questionData.possibleAnsers.map((answer, index) => (
                                <li key={index}>{answer}</li>
                              ))}
                            </ul>
                          </div>
                          <button className="flip-button" onClick={() => handleFlip(questionData.id)}>Flip</button>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                  <div className="flip-card-back">
                    <div className="card-content">
                      <CardContent>
                        <p>Correct Answer: {questionData.correctAnswer}</p>
                      </CardContent>
                    </div>
                    <button className="flip-button" onClick={() => handleFlip(questionData.id)}>Flip</button>
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Quiz;





