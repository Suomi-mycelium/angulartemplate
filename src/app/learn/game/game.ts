import { Component } from '@angular/core';

@Component({
  selector: 'app-game',
  imports: [],
  templateUrl: './game.html',
  styleUrl: './game.scss'
})
export class Game {
  activeQuestionId = 0;
  questions = [
    {
      id: 1,
      text: 'What is the capital of France?',
      image: 'images/placeholder.png',
      options: ['Madrid', 'Berlin', 'Paris', 'Rome'],
      answer: 'Paris'
    },
    {
      id: 2,
      text: 'The Earth is flat.',
      image: 'images/placeholder.png',
      options: ['True', 'False'],
      answer: 'False'
    },
    {
      id: 3,
      text: 'Which language is primarily used for web development?',
      image: 'images/placeholder.png',
      options: ['Python', 'HTML', 'C#', 'Java'],
      answer: 'HTML'
    },
    {
      id: 4,
      text: 'Water boils at 100°C at sea level.',
      image: 'images/placeholder.png',
      options: ['True', 'False'],
      answer: 'True'
    },
    {
      id: 5,
      text: 'Which of the following is a JavaScript framework?',
      image: 'images/placeholder.png',
      options: ['React', 'Django', 'Laravel', 'Flask'],
      answer: 'React'
    }
  ]
}
