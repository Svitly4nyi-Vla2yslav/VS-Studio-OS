import { LeadStatus } from '../../utils/types';
import { Badge } from './ClientStatusBadge.styled';

interface ClientStatusBadgeProps {
  status: LeadStatus;
}

// Компонент ClientStatusBadge відповідає за видиме маркування етапу роботи з клієнтом.
export const ClientStatusBadge = ({ status }: ClientStatusBadgeProps) => (
  <Badge $status={status}>{status}</Badge>
);
