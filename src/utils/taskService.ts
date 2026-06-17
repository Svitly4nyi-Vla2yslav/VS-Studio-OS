import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../firebase';
import { ClientTask } from './types';

// tasksCollection є єдиним посиланням на колекцію задач у Firestore.
const tasksCollection = collection(db, 'tasks');

// getTasks отримує всі задачі з Firestore.
// Функція не приймає параметрів і повертає масив ClientTask.
export const getTasks = async (): Promise<ClientTask[]> => {
  const tasksQuery = query(tasksCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(tasksQuery);

  return snapshot.docs.map((taskDoc) => ({
    id: taskDoc.id,
    ...(taskDoc.data() as Omit<ClientTask, 'id'>),
  }));
};

// createTask створює нову задачу.
// Функція приймає дані задачі без id і дат, додає timestamps та повертає id документа.
export const createTask = async (
  data: Omit<ClientTask, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<string> => {
  const now = new Date().toISOString();
  const docRef = await addDoc(tasksCollection, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return docRef.id;
};

// updateTask оновлює існуючу задачу.
// Функція приймає id задачі та часткові поля ClientTask, повертає Promise після запису.
export const updateTask = async (
  id: string,
  data: Partial<Omit<ClientTask, 'id' | 'createdAt'>>,
): Promise<void> => {
  const taskRef = doc(db, 'tasks', id);
  await updateDoc(taskRef, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
};

// deleteTask видаляє задачу з Firestore.
// Функція приймає id задачі і повертає Promise після видалення.
export const deleteTask = async (id: string): Promise<void> => {
  const taskRef = doc(db, 'tasks', id);
  await deleteDoc(taskRef);
};

// getTasksByClientId отримує задачі, прив'язані до конкретного клієнта.
// Функція приймає clientId і повертає масив ClientTask.
export const getTasksByClientId = async (clientId: string): Promise<ClientTask[]> => {
  const tasksQuery = query(tasksCollection, where('clientId', '==', clientId));
  const snapshot = await getDocs(tasksQuery);

  return snapshot.docs.map((taskDoc) => ({
    id: taskDoc.id,
    ...(taskDoc.data() as Omit<ClientTask, 'id'>),
  }));
};
