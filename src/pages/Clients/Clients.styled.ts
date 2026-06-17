import styled from 'styled-components';

// PageStack задає вертикальний ритм CRM-сторінки.
export const PageStack = styled.div`
  display: grid;
  gap: 18px;
`;

// ClientGrid розкладає картки клієнтів адаптивною сіткою.
export const ClientGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

// PrimaryAction є головною кнопкою сторінки Clients.
export const PrimaryAction = styled.button`
  border: 0;
  border-radius: 8px;
  padding: 11px 14px;
  color: #11131a;
  background: #f7d590;
  font-weight: 800;
`;

// StatusText показує технічний стан завантаження або помилки.
export const StatusText = styled.p`
  margin: 0;
  color: #aab4c5;
`;
