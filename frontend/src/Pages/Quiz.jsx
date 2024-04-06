

import { useState, useEffect } from 'react';
import axios from 'axios';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import "./Quiz.css";
const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

// flips the clicked card by the id
  const handleFlip = (id) => {
    setQuestions(prevQuestions =>
      prevQuestions.map(question =>
        // if else statement - if it matches with id
        question._id === id ? { ...question, isFlipped: !question.isFlipped } : question
      )
    );
  };

  // grabs all the questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('http://localhost:8080/database/questions');
        setQuestions(response.data);
        console.log(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };

    fetchQuestions();
  }, []);




  return (
    <div className="App" >
      {loading ? (<p>Loading quiz...</p>) : (
        <>
      <h1>Quiz</h1>
      <p>Test your knowledge on the original series!</p>
        {/* uses grids to layout the cards */}
      <Grid container spacing={2} style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)',  border: '1px solid black', paddingBottom: '56px'}}>
      <Grid item xs={12}>
      *only questions from the original show (Avatar: The Last Airbender)
      </Grid>
        {questions.map((questionData) => (
          <Grid key={questionData._id} item xs={12} sm={6} md={3}>
            <div className="container">
              {/* using css animation in combination with these divs to create a flipping card */}
              <div className={`flip-card ${questionData.isFlipped ? "flipped" : ""}`}>
                <div className="flip-card-inner">
                  <div className="flip-card-front"  onClick={() => handleFlip(questionData._id)}>
                    <div className="card-content" >
                        <CardContent >
                          <div>
                            <h2>Question: {questionData.question}</h2>
                            <h3>Possible Answers:</h3>
                            <ul>
                              {questionData.possibleAnswers.map((answer, index) => (
                                <li key={index}>{answer}</li>
                              ))}
                            </ul>
                          </div>
                          
                        </CardContent>
                    </div>
                  </div>
                  <div className="flip-card-back"  onClick={() => handleFlip(questionData._id)}>
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





