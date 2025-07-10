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
  private questionService: Questions = inject(Questions);
  activeQuestionId: number = 0;
  finished: boolean = false;
  questions$!: Observable<Question[]>;

  ngOnInit() {
    this.questions$ = this.questionService.getQuestions();
  }

  checkAnswer(question: Question, selectedOption: string, lastQuestion: boolean) {
    if (selectedOption === question.answer) {
      alert("Correct!");
      if (lastQuestion) {
        alert("Finished!");
      } else {
        this.activeQuestionId++;
      }
    } else {
      alert("Incorrect!");
    }
  }
}
