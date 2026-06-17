import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { DashboardCard, DashboardCardText, DashboardCardTitle, DashboardGrid } from './Dashboard.styled';

// dashboardCards описує перші операційні зони внутрішньої системи.
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

// Сторінка Dashboard показує короткий огляд першого MVP VS Studio OS.
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
