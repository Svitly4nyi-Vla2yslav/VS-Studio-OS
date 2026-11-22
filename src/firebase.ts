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

// SDK ініціалізується один раз під час імпорту модуля; відсутні env-значення стають порожніми рядками
// й проявляться як помилка конфігурації Firebase під час фактичного використання, а не як вбудовані секрети.
export const firebaseApp = initializeApp(firebaseConfig);

// db є спільним екземпляром Firestore для сервісних файлів.
// React-компоненти не повинні напряму працювати з Firestore, щоб межа доступу до даних лишалася централізованою.
export const db = getFirestore(firebaseApp);
