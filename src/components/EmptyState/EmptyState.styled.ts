import styled from 'styled-components';

// EmptyStateBox показує акуратний стан, коли даних ще немає.
export const EmptyStateBox = styled.div`
  border: 1px dashed rgba(247, 213, 144, 0.32);
  border-radius: 8px;
  padding: 32px;
  background: rgba(255, 255, 255, 0.035);
  text-align: center;
`;

// EmptyStateTitle є коротким заголовком порожнього стану.
export const EmptyStateTitle = styled.h3`
  margin: 0 0 8px;
  color: #fff7e6;
  font-size: 18px;
`;

// EmptyStateDescription пояснює, що користувач може зробити далі.
export const EmptyStateDescription = styled.p`
  margin: 0;
  color: #aab4c5;
  line-height: 1.6;
`;
