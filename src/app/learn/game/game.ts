import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Question, QuestionsService } from '../services/questions';
import { last, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game implements OnInit {
  private questionsService: QuestionsService = inject(QuestionsService);
  activeQuestionId: number = 0;
  finished: boolean = false;
  questions$!: Observable<Question[]>;

  ngOnInit() {
    this.questions$ = this.questionsService.getQuestions();
  }

  checkAnswer(question: Question, selectedOption: string, lastQuestion: boolean) {
    if (question.completed) return;


    if (selectedOption === question.answer) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }

    const updatedQuestion = { ...question, response: selectedOption, completed: true };
    this.questionsService.updateQuestion(updatedQuestion);

    if (!lastQuestion) this.activeQuestionId++;
  }

  nextQuestion() {
    this.activeQuestionId++;
  }

  previousQuestion() {
    this.activeQuestionId--;
  }
}
