// LeadSource описує канал, з якого прийшов клієнт або лід.
export type LeadSource =
  | 'Instagram'
  | 'Facebook'
  | 'Google Maps'
  | 'Recommendation'
  | 'Fiverr'
  | 'Kleinanzeigen'
  | 'Website'
  | 'Other';

// LeadStatus описує поточний етап роботи з лідом або клієнтом.
export type LeadStatus =
  | 'new lead'
  | 'contacted'
  | 'interested'
  | 'meeting scheduled'
  | 'offer sent'
  | 'in progress'
  | 'waiting for payment'
  | 'completed'
  | 'lost';

// LEAD_SOURCES зберігає всі доступні джерела лідів для форм і фільтрів.
export const LEAD_SOURCES: LeadSource[] = [
  'Instagram',
  'Facebook',
  'Google Maps',
  'Recommendation',
  'Fiverr',
  'Kleinanzeigen',
  'Website',
  'Other',
];

// LEAD_STATUSES зберігає всі доступні статуси клієнта або ліда.
export const LEAD_STATUSES: LeadStatus[] = [
  'new lead',
  'contacted',
  'interested',
  'meeting scheduled',
  'offer sent',
  'in progress',
  'waiting for payment',
  'completed',
  'lost',
];

// ClientNote описує ручну нотатку, яку команда додає до картки клієнта.
export interface ClientNote {
  id: string;
  text: string;
  createdAt: string;
}

// ClientMessage описує запис ручної комунікації з клієнтом.
export interface ClientMessage {
  id: string;
  channel: 'email' | 'phone' | 'instagram' | 'facebook' | 'linkedin' | 'meeting' | 'other';
  text: string;
  createdAt: string;
}

// Client описує основну CRM-сутність: клієнта або ліда VS Web Studio.
export interface Client {
  id?: string;
  name: string;
  company: string;
  phone: string;
  email: string;
  website?: string;
  instagram?: string;
  facebook?: string;
  linkedin?: string;
  source: LeadSource;
  status: LeadStatus;
  notes: ClientNote[];
  messages: ClientMessage[];
  nextAction?: string;
  createdAt?: string;
  updatedAt?: string;
}

// ClientTask описує задачу, яка може бути пов'язана з конкретним клієнтом.
export interface ClientTask {
  id?: string;
  clientId?: string;
  title: string;
  description?: string;
  dueDate?: string;
  status: 'open' | 'in progress' | 'done' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  createdAt?: string;
  updatedAt?: string;
}

// FinanceEntry описує майбутній фінансовий запис для доходів або витрат.
export interface FinanceEntry {
  id?: string;
  type: 'income' | 'expense';
  amount: number;
  category: string;
  description?: string;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
}

// AiRecommendation описує безпечну рекомендацію AI без прямого доступу до Firebase.
export interface AiRecommendation {
  nextAction: string;
  reason: string;
  suggestedMessage?: string;
  createdAt?: string;
}
