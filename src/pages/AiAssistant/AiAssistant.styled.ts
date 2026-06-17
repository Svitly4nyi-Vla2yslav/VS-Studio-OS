import styled from 'styled-components';

// AssistantPanel містить форму AI-інструкції і результат.
export const AssistantPanel = styled.section`
  display: grid;
  gap: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 20px;
  background: rgba(13, 18, 30, 0.88);
`;

// AssistantInput приймає інструкцію користувача для майбутнього AI.
export const AssistantInput = styled.textarea`
  width: 100%;
  min-height: 120px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 14px;
  color: #f6f1e8;
  background: rgba(7, 10, 18, 0.82);
  resize: vertical;
`;

// AnalyzeButton запускає локальну placeholder-рекомендацію.
export const AnalyzeButton = styled.button`
  width: fit-content;
  border: 0;
  border-radius: 8px;
  padding: 11px 14px;
  color: #11131a;
  background: #f7d590;
  font-weight: 800;
`;

// ExampleList показує приклади майбутніх AI-інструкцій.
export const ExampleList = styled.ul`
  margin: 0;
  padding-left: 20px;
  color: #dce3ef;
  line-height: 1.8;
`;

// ResultBlock показує контрольований placeholder-результат AI.
export const ResultBlock = styled.pre`
  white-space: pre-wrap;
  margin: 0;
  border: 1px solid rgba(247, 213, 144, 0.22);
  border-radius: 8px;
  padding: 16px;
  color: #f6f1e8;
  background: rgba(7, 10, 18, 0.84);
  line-height: 1.6;
`;
