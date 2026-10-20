import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { DashboardCard, DashboardCardText, DashboardCardTitle, DashboardGrid } from './Dashboard.styled';

// Статичний каталог описує операційні зони першого MVP; масив не завантажується з Firebase.
const dashboardCards = [
  {
    title: 'CRM clients and leads',
    text: 'Store client details, statuses, sources, notes, messages, and next actions in Firebase.',
  },
  {
    title: 'Manual operations',
    text: 'Tasks, communication notes, documents, and finance are prepared as clean modules for the next MVPs.',
  },
  {
    title: 'AI-ready architecture',
    text: 'AI Assistant is designed to use controlled service functions instead of direct database access.',
  },
];


/**
 * Показує огляд можливостей VS Studio OS із локального dashboardCards.
 * Компонент не обчислює метрики й не виконує запитів: кожна картка є презентаційним описом модуля.
 */
export const Dashboard = () => (
  <>
    <SectionTitle
      title="Dashboard"
      description="Premium internal operating system for managing the first CRM workflows of VS Web Studio."
    />
    <DashboardGrid>
      {dashboardCards.map((card) => (
        <DashboardCard key={card.title}>
          <DashboardCardTitle>{card.title}</DashboardCardTitle>
          <DashboardCardText>{card.text}</DashboardCardText>
        </DashboardCard>
      ))}
    </DashboardGrid>
  </>
);
