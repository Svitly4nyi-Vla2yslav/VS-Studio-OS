import { LeadStatus } from '../../utils/types';
import { Badge } from './ClientStatusBadge.styled';

interface ClientStatusBadgeProps {
  status: LeadStatus;
}

/**
 * Відображає типізований етап роботи з клієнтом як стилізований badge.
 * status одночасно визначає видимий текст і $status для вибору кольорів;
 * компонент не змінює дані та не має побічних ефектів.
 */
export const ClientStatusBadge = ({ status }: ClientStatusBadgeProps) => (
  <Badge $status={status}>{status}</Badge>
);

