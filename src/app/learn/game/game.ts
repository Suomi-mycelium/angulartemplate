import { Component, inject, OnInit } from '@angular/core';
import { Question, Questions } from '../services/questions';
import { firstValueFrom, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game',
  imports: [CommonModule],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game implements OnInit {
  private questionService = inject(Questions);
  activeQuestionId = 0;
  questions$!: Observable<Question[]>;

  ngOnInit() {
    this.questions$ = this.questionService.getQuestions();
  }

  checkAnswer(question: Question, selectedOption: string) {
    if (selectedOption === question.answer) {
      alert("Correct!");
    } else {
      alert("Incorrect!");
    }
  }
}
