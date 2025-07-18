import { Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { BehaviorSubject, filter, first, map, Observable, Subject, takeUntil } from 'rxjs';

export interface Question {
  id: string,
  text: string,
  image: string,
  options: Array<string>,
  answer: string,
  completed?: boolean,
  response?: string
}

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {
  private questionsCollectionRef: any;
  private questions$: BehaviorSubject<Question[]> = new BehaviorSubject<Question[]>([]);

  constructor(
    private firestore: Firestore
  ) {
    this.questionsCollectionRef = collection(this.firestore, 'questions');
  }

  // TODO: Deal with this subscription
  getQuestions(n: number = 10) {
    collectionData<Question>(this.questionsCollectionRef, { idField: 'id' }).pipe(
      map(questions => {
        const selectedQuestions = this.getRandom(questions, n);
        selectedQuestions.forEach(question => question.completed = false);
        return selectedQuestions;
      })).subscribe(this.questions$);

    return this.questions$.asObservable();
  }

  updateQuestion(updatedQuestion: Question) {
    this.questions$.pipe(
      first(),
      map((questions) => {
        const updatedQuestions = [...questions];
        const indexToUpdate = questions.findIndex((q) => q.id === updatedQuestion.id)
        updatedQuestions[indexToUpdate] = updatedQuestion;
        return updatedQuestions;
      })
    ).subscribe((updatedQuestions) => {
      this.questions$.next(updatedQuestions);
    });
  }

  private getRandom(questions: Question[], n: number) {
    const arr = [...questions];
    const result = new Array(n);
    let len = arr.length;
    const taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      const x = Math.floor(Math.random() * len);
      result[n] = arr[x in taken ? taken[x] : x];
      taken[x] = --len in taken ? taken[len] : len;
    }
    return result;
  }

  // Method to include the data in public/db to firestore
  // async createQuestions() {
  //   const questionsToAdd: Question[] = await firstValueFrom(this.http.get<Question[]>('db/garifuna_questions.json'));
  //   const batch = writeBatch(this.firestore);
  //   const productsCollectionRef = collection(this.firestore, 'questions');

  //   for (const product of questionsToAdd) {
  //     const newProductDocRef = doc(productsCollectionRef);
  //     batch.set(newProductDocRef, product);
  //   }
  //   batch.commit();
  // }
}
