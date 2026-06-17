import { LEAD_SOURCES, LEAD_STATUSES, LeadSource, LeadStatus } from '../../utils/types';
import { FilterInput, FiltersBar, FilterSelect } from './ClientFilters.styled';

interface ClientFiltersProps {
  search: string;
  status: LeadStatus | 'all';
  source: LeadSource | 'all';
  onSearchChange: (value: string) => void;
  onStatusChange: (value: LeadStatus | 'all') => void;
  onSourceChange: (value: LeadSource | 'all') => void;
}

// Компонент ClientFilters відповідає за пошук і фільтрацію CRM-списку.
export const ClientFilters = ({
  search,
  status,
  source,
  onSearchChange,
  onStatusChange,
  onSourceChange,
}: ClientFiltersProps) => (
  <FiltersBar>
    <FilterInput
      aria-label="Search clients"
      placeholder="Search by name, company, email"
      value={search}
      onChange={(event) => onSearchChange(event.target.value)}
    />
    <FilterSelect
      aria-label="Filter by status"
      value={status}
      onChange={(event) => onStatusChange(event.target.value as LeadStatus | 'all')}
    >
      <option value="all">All statuses</option>
      {LEAD_STATUSES.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </FilterSelect>
    <FilterSelect
      aria-label="Filter by source"
      value={source}
      onChange={(event) => onSourceChange(event.target.value as LeadSource | 'all')}
    >
      <option value="all">All sources</option>
      {LEAD_SOURCES.map((item) => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </FilterSelect>
  </FiltersBar>
);
