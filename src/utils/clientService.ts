import {
  addDoc,
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { Client, ClientMessage, ClientNote } from './types';

// clientsCollection є централізованим посиланням на CRM-колекцію clients у Firestore.
const clientsCollection = collection(db, 'clients');

/**
 * Створює локальний ідентифікатор для вкладених нотаток і повідомлень.
 *
 * @returns UUID браузера або часовий fallback, якщо randomUUID недоступний.
 */
const createId = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;

/**
 * Отримує всі CRM-картки з Firestore, починаючи з найновіших.
 *
 * @returns Масив Client з id відповідного документа.
 * @sideEffects Виконує читання колекції clients у Firestore.
 */
export const getClients = async (): Promise<Client[]> => {
  const clientsQuery = query(clientsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(clientsQuery);

  return snapshot.docs.map((clientDoc) => ({
    id: clientDoc.id,
    ...(clientDoc.data() as Omit<Client, 'id'>),
  }));
};

/**
 * Отримує одного клієнта за ідентифікатором документа.
 *
 * @param id — Firestore id клієнта.
 * @returns Client із доданим id або null, якщо документа немає.
 * @sideEffects Виконує читання документа clients/{id}.
 */
export const getClientById = async (id: string): Promise<Client | null> => {
  const clientRef = doc(db, 'clients', id);
  const clientSnap = await getDoc(clientRef);

  if (!clientSnap.exists()) {
    return null;
  }

  return {
    id: clientSnap.id,
    ...(clientSnap.data() as Omit<Client, 'id'>),
  };
};

/**
 * Створює CRM-картку та додає однакові createdAt і updatedAt.
 *
 * @param data — поля клієнта без id і часових міток.
 * @returns Ідентифікатор нового документа.
 * @sideEffects Записує документ у колекцію clients.
 */
export const createClient = async (
  data: Omit<Client, 'id' | 'createdAt' | 'updatedAt'>,
): Promise<string> => {
  const now = new Date().toISOString();
  const docRef = await addDoc(clientsCollection, {
    ...data,
    createdAt: now,
    updatedAt: now,
  });

  return docRef.id;
};

/**
 * Оновлює вибрані поля CRM-картки та встановлює новий updatedAt.
 *
 * @param id — ідентифікатор клієнта.
 * @param data — часткові поля без id і createdAt.
 * @returns Promise, який завершується після запису.
 * @sideEffects Оновлює документ clients/{id}.
 */
export const updateClient = async (
  id: string,
  data: Partial<Omit<Client, 'id' | 'createdAt'>>,
): Promise<void> => {
  const clientRef = doc(db, 'clients', id);
  await updateDoc(clientRef, {
    ...data,
    updatedAt: new Date().toISOString(),
  });
};

/**
 * Видаляє CRM-картку клієнта.
 *
 * @param id — ідентифікатор клієнта.
 * @returns Promise, який завершується після видалення.
 * @sideEffects Видаляє документ clients/{id}.
 */
export const deleteClient = async (id: string): Promise<void> => {
  const clientRef = doc(db, 'clients', id);
  await deleteDoc(clientRef);
};

/**
 * Створює ручну нотатку й атомарно додає її до масиву notes.
 *
 * @param clientId — ідентифікатор клієнта.
 * @param note — текст нотатки.
 * @returns Створену ClientNote з локальним id і часовою міткою.
 * @sideEffects Оновлює notes та updatedAt у Firestore.
 */
export const addClientNote = async (clientId: string, note: string): Promise<ClientNote> => {
  const clientRef = doc(db, 'clients', clientId);
  const newNote: ClientNote = {
    id: createId(),
    text: note,
    createdAt: new Date().toISOString(),
  };

  await updateDoc(clientRef, {
    notes: arrayUnion(newNote),
    updatedAt: new Date().toISOString(),
  });

  return newNote;
};

/**
 * Створює запис комунікації й атомарно додає його до масиву messages.
 *
 * @param clientId — ідентифікатор клієнта.
 * @param message — повідомлення без id і createdAt.
 * @returns Створений ClientMessage з локальними службовими полями.
 * @sideEffects Оновлює messages та updatedAt у Firestore.
 */
export const addClientMessage = async (
  clientId: string,
  message: Omit<ClientMessage, 'id' | 'createdAt'>,
): Promise<ClientMessage> => {
  const clientRef = doc(db, 'clients', clientId);
  const newMessage: ClientMessage = {
    ...message,
    id: createId(),
    createdAt: new Date().toISOString(),
  };

  await updateDoc(clientRef, {
    messages: arrayUnion(newMessage),
    updatedAt: new Date().toISOString(),
  });

  return newMessage;
};

/**
 * Замінює наступну дію клієнта та оновлює часову мітку картки.
 *
 * @param clientId — ідентифікатор клієнта.
 * @param nextAction — новий текст наступної дії.
 * @returns Promise, який завершується після запису.
 * @sideEffects Оновлює nextAction та updatedAt у Firestore.
 */
export const updateClientNextAction = async (
  clientId: string,
  nextAction: string,
): Promise<void> => {
  const clientRef = doc(db, 'clients', clientId);
  await updateDoc(clientRef, {
    nextAction,
    updatedAt: new Date().toISOString(),
  });
};
