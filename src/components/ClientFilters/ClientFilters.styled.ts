import styled from 'styled-components';

// FiltersBar групує пошук і фільтри клієнтів.
export const FiltersBar = styled.div`
  display: grid;
  grid-template-columns: minmax(220px, 1fr) 220px 220px;
  gap: 12px;
  margin-bottom: 18px;

  @media (max-width: 760px) {
    grid-template-columns: 1fr;
  }
`;

// FilterInput є стилем для текстового пошуку.
export const FilterInput = styled.input`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 14px;
  color: #f6f1e8;
  background: rgba(13, 18, 30, 0.92);
  outline: none;

  &:focus {
    border-color: rgba(247, 213, 144, 0.58);
  }
`;

// FilterSelect є стилем для status/source фільтрів.
export const FilterSelect = styled.select`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px 14px;
  color: #f6f1e8;
  background: rgba(13, 18, 30, 0.92);
  outline: none;
`;
