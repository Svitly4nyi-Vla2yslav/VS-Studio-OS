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

// createId створює локальний ідентифікатор для нотаток і ручних повідомлень.
const createId = () => crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`;

// getClients отримує всі CRM-картки з Firestore.
// Функція не отримує параметрів і повертає масив Client, відсортований за датою створення.
export const getClients = async (): Promise<Client[]> => {
  const clientsQuery = query(clientsCollection, orderBy('createdAt', 'desc'));
  const snapshot = await getDocs(clientsQuery);

  return snapshot.docs.map((clientDoc) => ({
    id: clientDoc.id,
    ...(clientDoc.data() as Omit<Client, 'id'>),
  }));
};

// getClientById отримує одного клієнта за Firestore id.
// Функція приймає id клієнта і повертає Client або null, якщо документа немає.
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

// createClient створює нову CRM-картку клієнта або ліда.
// Функція приймає дані без id і дат, додає createdAt/updatedAt та повертає id нового документа.
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

// updateClient оновлює існуючу CRM-картку.
// Функція приймає id клієнта та часткові дані Client, повертає Promise після запису у Firestore.
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

// deleteClient видаляє CRM-картку клієнта.
// Функція приймає id клієнта і повертає Promise після видалення документа.
export const deleteClient = async (id: string): Promise<void> => {
  const clientRef = doc(db, 'clients', id);
  await deleteDoc(clientRef);
};

// addClientNote додає ручну нотатку до масиву notes клієнта.
// Функція приймає id клієнта і текст нотатки, повертає створений об'єкт ClientNote.
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

// addClientMessage додає ручний запис комунікації до масиву messages клієнта.
// Функція приймає id клієнта та повідомлення без id/createdAt, повертає створений ClientMessage.
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

// updateClientNextAction оновлює наступну дію для конкретного клієнта.
// Функція приймає id клієнта і текст nextAction, повертає Promise після оновлення Firestore.
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
