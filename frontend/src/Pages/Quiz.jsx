

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import "./Quiz.css";
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);


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
        setLoading(false)
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);




  return (
    <div className="App">
      {loading ? (<p>Loading quiz...</p>) : (
        <>
      <h1>Questions</h1>
      <Grid container spacing={2}>
        {questions.map((questionData) => (
          <Grid key={questionData.id} item xs={12} sm={6} md={3}>
            <div className="container">
              <div className={`flip-card ${questionData.isFlipped ? "flipped" : ""}`}>
                <div className="flip-card-inner">
                  <div className="flip-card-front"  onClick={() => handleFlip(questionData.id)}>
                    <div className="card-content" >
                      {/* <Card sx={{ width: 200, height: 200 }} className="flip-card-front"  onClick={() => handleFlip(questionData.id)}>  */}
                        <CardContent >
                          <div>
                            <h2>Question: {questionData.question}</h2>
                            <h3>Possible Answers:</h3>
                            <ul>
                              {questionData.possibleAnsers.map((answer, index) => (
                                <li key={index}>{answer}</li>
                              ))}
                            </ul>
                          </div>
                          
                        </CardContent>
                      {/* </Card> */}
                    </div>
                  </div>
                  <div className="flip-card-back"  onClick={() => handleFlip(questionData.id)}>
                    <div className="card-content" >
                      
                      <CardContent>
                        <p>Correct Answer: {questionData.correctAnswer}</p>
                      </CardContent>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </Grid>
        ))}
      </Grid>
      </>
      )}
    </div>
  );
};

export default Quiz;





