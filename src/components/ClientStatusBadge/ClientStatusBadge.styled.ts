import styled from 'styled-components';
import { LeadStatus } from '../../utils/types';

// statusColors зберігає колірні акценти для різних CRM-статусів.
const statusColors: Record<LeadStatus, string> = {
  'new lead': '#8ab4ff',
  contacted: '#9ed8ff',
  interested: '#9ff0c8',
  'meeting scheduled': '#f7d590',
  'offer sent': '#f3b15b',
  'in progress': '#d7b8ff',
  'waiting for payment': '#ffcf8a',
  completed: '#78e6a8',
  lost: '#ff8f8f',
};

// Badge показує короткий статус клієнта з м'яким кольоровим фоном.
export const Badge = styled.span<{ $status: LeadStatus }>`
  display: inline-flex;
  width: fit-content;
  align-items: center;
  border: 1px solid ${({ $status }) => statusColors[$status]}66;
  border-radius: 999px;
  padding: 5px 10px;
  color: ${({ $status }) => statusColors[$status]};
  background: ${({ $status }) => statusColors[$status]}1a;
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;
`;
