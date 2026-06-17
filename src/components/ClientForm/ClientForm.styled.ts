import styled from 'styled-components';

// FormPanel обгортає форму створення або редагування клієнта.
export const FormPanel = styled.form`
  display: grid;
  gap: 14px;
  border: 1px solid rgba(247, 213, 144, 0.2);
  border-radius: 8px;
  padding: 18px;
  margin-bottom: 20px;
  background: rgba(13, 18, 30, 0.96);
`;

// FormGrid організовує поля форми у дві колонки на широких екранах.
export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 720px) {
    grid-template-columns: 1fr;
  }
`;

// FieldLabel підписує окреме поле форми.
export const FieldLabel = styled.label`
  display: grid;
  gap: 7px;
  color: #c6d0df;
  font-size: 13px;
`;

// TextInput стилізує input/select/textarea через атрибут as.
export const TextInput = styled.input`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 11px 12px;
  color: #f6f1e8;
  background: rgba(7, 10, 18, 0.82);
  outline: none;

  &:focus {
    border-color: rgba(247, 213, 144, 0.58);
  }
`;

// FormActions групує кнопки збереження і скасування.
export const FormActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

// PrimaryButton є основною дією форми.
export const PrimaryButton = styled.button`
  border: 0;
  border-radius: 8px;
  padding: 11px 14px;
  color: #11131a;
  background: #f7d590;
  font-weight: 800;
`;

// SecondaryButton є другорядною дією форми.
export const SecondaryButton = styled.button`
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 8px;
  padding: 11px 14px;
  color: #f6f1e8;
  background: rgba(255, 255, 255, 0.06);
`;
