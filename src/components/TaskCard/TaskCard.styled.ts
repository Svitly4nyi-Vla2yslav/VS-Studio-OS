import styled from 'styled-components';

// TaskArticle показує одну задачу у списку.
export const TaskArticle = styled.article`
  display: grid;
  gap: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 8px;
  padding: 16px;
  background: rgba(13, 18, 30, 0.88);
`;

// TaskHeader вирівнює назву задачі та пріоритет.
export const TaskHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
`;

// TaskTitle показує коротку назву задачі.
export const TaskTitle = styled.h3`
  margin: 0;
  color: #fff7e6;
  font-size: 17px;
`;

// TaskDescription показує додатковий опис задачі.
export const TaskDescription = styled.p`
  margin: 0;
  color: #aab4c5;
  line-height: 1.55;
`;

// TaskMeta містить статус, дедлайн і прив'язаного клієнта.
export const TaskMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

// TaskPill показує коротке службове значення задачі.
export const TaskPill = styled.span`
  border: 1px solid rgba(247, 213, 144, 0.22);
  border-radius: 999px;
  padding: 5px 9px;
  color: #dce3ef;
  background: rgba(255, 255, 255, 0.05);
  font-size: 12px;
`;
