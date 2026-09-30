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

/**
 * Отримує всі задачі з Firestore у порядку від найновіших.
 *
 * @returns Масив задач із id документа.
 * @sideEffects Виконує читання колекції tasks у Firestore.
 */
export const getTasks = async (): Promise<ClientTask[]> => {
  const tasksQuery = query(tasksCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(tasksQuery);

  return snapshot.docs.map((taskDoc) => ({
    id: taskDoc.id,
    ...(taskDoc.data() as Omit<ClientTask, 'id'>),
  }));
};

/**
 * Створює задачу й додає однакові createdAt та updatedAt.
 *
 * @param data — поля задачі без id і часових міток.
 * @returns Ідентифікатор створеного документа.
 * @sideEffects Записує новий документ у колекцію tasks.
 */
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

/**
 * Оновлює вибрані поля задачі та встановлює новий updatedAt.
 *
 * @param id — ідентифікатор документа задачі.
 * @param data — частковий набір полів без id і createdAt.
 * @returns Promise, який завершується після запису.
 * @sideEffects Оновлює документ tasks/{id} у Firestore.
 */
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

/**
 * Видаляє задачу з Firestore.
 *
 * @param id — ідентифікатор документа задачі.
 * @returns Promise, який завершується після видалення.
 * @sideEffects Видаляє документ tasks/{id}.
 */
export const deleteTask = async (id: string): Promise<void> => {
  const taskRef = doc(db, 'tasks', id);
  await deleteDoc(taskRef);
};

/**
 * Отримує задачі, пов'язані з конкретним клієнтом.
 *
 * @param clientId — ідентифікатор клієнта для Firestore-фільтра.
 * @returns Масив знайдених задач із id документа.
 * @sideEffects Виконує фільтрований запит до колекції tasks.
 */
export const getTasksByClientId = async (clientId: string): Promise<ClientTask[]> => {
  const tasksQuery = query(tasksCollection, where('clientId', '==', clientId));
  const snapshot = await getDocs(tasksQuery);

  return snapshot.docs.map((taskDoc) => ({
    id: taskDoc.id,
    ...(taskDoc.data() as Omit<ClientTask, 'id'>),
  }));
};
