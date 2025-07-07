import {
  ApplicationConfig,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(),
    provideHttpClient(withFetch()),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideFirebaseApp(() => initializeApp({ projectId: "badisai", appId: "1:738467766542:web:0aa980778cb085cc6c375f", storageBucket: "badisai.firebasestorage.app", apiKey: "AIzaSyA_X_KANks4kSNXCsFmu7yyyoAKRIAJjEo", authDomain: "badisai.firebaseapp.com", messagingSenderId: "738467766542", measurementId: "G-6RRRJRHKEH" })), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()),
  ],
};
