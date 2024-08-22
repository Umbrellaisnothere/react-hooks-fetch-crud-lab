import React, { useState, useEffect } from 'react';
import QuestionItem from './QuestionItem';

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // Fetch questions from API
      fetch("http://localhost:4000/questions")
      .then(response => response.json())
      .then((questions) => {setQuestions(questions);
      });
  }, []);
  

  function handleDeleteClick(id) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        const newQuestions = questions.filter((quiz) => quiz.id !== id);
        setQuestions(newQuestions);
      });
  }

  function handleAnswerChange(id, correctIndex) {
    fetch(`http://localhost:3000/questions/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    })

      .then((response) => response.json())
      .then((newQuestion) => {

        const newQuestions = questions.map((quiz) => {
          if (quiz.id === newQuestion.id) 
            return newQuestion;
            return quiz;
        });

        setQuestions(newQuestions);
      });
  }

  const questionItems = questions.map((quiz) => (
    <QuestionItem
      key={quiz.id}
      question={quiz}
      onDeleteClick={handleDeleteClick}
      onAnswerChange={handleAnswerChange}
    />
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}


export default QuestionList;