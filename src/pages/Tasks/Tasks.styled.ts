import styled from 'styled-components';

// TasksStack задає вертикальну структуру task-модуля.
export const TasksStack = styled.div`
  display: grid;
  gap: 18px;
`;

// TaskForm готує базове створення задачі без перевантаження UI.
export const TaskForm = styled.form`
  display: grid;
  gap: 12px;
  border: 1px solid rgba(247, 213, 144, 0.2);
  border-radius: 8px;
  padding: 18px;
  background: rgba(13, 18, 30, 0.88);
`;

// TaskFormGrid розкладає поля задачі адаптивною сіткою.
export const TaskFormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 860px) {
    grid-template-columns: 1fr;
  }
`;

// FieldLabel підписує поле створення задачі.
export const FieldLabel = styled.label`
  display: grid;
  gap: 7px;
  color: #c6d0df;
  font-size: 13px;
`;

// FieldControl стилізує input/select/textarea для задач.
export const FieldControl = styled.input`
  width: 100%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 11px 12px;
  color: #f6f1e8;
  background: rgba(7, 10, 18, 0.82);
`;

// SubmitButton створює нову задачу.
export const SubmitButton = styled.button`
  width: fit-content;
  border: 0;
  border-radius: 8px;
  padding: 11px 14px;
  color: #11131a;
  background: #f7d590;
  font-weight: 800;
`;

// TaskList показує список задач.
export const TaskList = styled.div`
  display: grid;
  gap: 12px;
`;

// StatusText показує службові стани task-модуля.
export const StatusText = styled.p`
  margin: 0;
  color: #aab4c5;
`;
