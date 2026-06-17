import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Об'єкт firebaseConfig містить публічні налаштування Firebase-проєкту.
// Значення беруться з .env, щоб конфігурацію можна було змінювати без правок коду.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || '',
};

// firebaseApp ініціалізує Firebase SDK для всього фронтенд-застосунку.
export const firebaseApp = initializeApp(firebaseConfig);

// db є єдиним експортом Firestore для сервісних файлів.
// React-компоненти не повинні напряму працювати з Firestore.
export const db = getFirestore(firebaseApp);
