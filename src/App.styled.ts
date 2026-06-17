import styled from 'styled-components';

// NotFoundPanel показує акуратний стан для неіснуючих маршрутів.
export const NotFoundPanel = styled.div`
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 28px;
  background: rgba(13, 18, 30, 0.88);
`;

// NotFoundTitle є заголовком сторінки 404.
export const NotFoundTitle = styled.h2`
  margin: 0 0 8px;
  color: #fff7e6;
`;

// NotFoundText пояснює, що маршрут не знайдено.
export const NotFoundText = styled.p`
  margin: 0;
  color: #aab4c5;
`;
