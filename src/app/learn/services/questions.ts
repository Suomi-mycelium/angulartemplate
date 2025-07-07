import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

export interface Question {
  id?: string,
  text: string,
  image: string,
  options: Array<string>,
  answer: string
}

@Injectable({
  providedIn: 'root'
})
export class Questions {
  private http = inject(HttpClient);
  private questionsCollectionRef: any;
  private questions$: Observable<Question[]>;

  constructor(
    private firestore: Firestore
  ) {
    this.questionsCollectionRef = collection(this.firestore, 'questions');
    this.questions$ = collectionData<Question>(this.questionsCollectionRef)
  }

  getQuestions(n: number = 10) {
    return this.questions$.pipe(
      map(questions => {
        let selectedQuestions = this.getRandom(questions, n);
        return selectedQuestions;
      })
    );
  }

  private getRandom(arr: any, n: number) {
    var result = new Array(n),
      len = arr.length,
      taken = new Array(len);
    if (n > len)
      throw new RangeError("getRandom: more elements taken than available");
    while (n--) {
      var x = Math.floor(Math.random() * len);
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
