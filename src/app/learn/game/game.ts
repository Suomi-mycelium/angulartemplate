import { Component, inject, OnInit } from '@angular/core';
import { Question, Questions } from '../services/questions';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game implements OnInit {
  private questionService: Questions = inject(Questions);
  activeQuestionId: number = 0;
  finished: boolean = false;
  questions$!: Observable<Question[]>;

  ngOnInit() {
    this.questions$ = this.questionService.getQuestions();
    this.questions$.subscribe((q) => console.log(q));
  }

  checkAnswer(question: Question, selectedOption: string, lastQuestion: boolean) {
    const updatedQuestion = { ...question, response: selectedOption };
    if (selectedOption === question.answer) {
      alert("Correct!");
      updatedQuestion.completed = true;
      if (lastQuestion) {
        alert("Finished!");
      } else {
        this.activeQuestionId++;
      }
    } else {
      alert("Incorrect!");
    }
    this.questionService.updateQuestion(updatedQuestion);
  }

  nextQuestion() {
    this.activeQuestionId++;
  }

  previousQuestion() {
    this.activeQuestionId--;
  }
}
