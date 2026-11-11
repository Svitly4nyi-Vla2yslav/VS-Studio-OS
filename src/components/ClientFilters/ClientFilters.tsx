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

/**
 * Приймає поточний пошук, статус, джерело та три callback і повертає контрольовану панель фільтрів.
 * @param search — текст, який input показує без trim або зміни регістру.
 * @param status — конкретний LeadStatus або службове значення all.
 * @param source — конкретний LeadSource або службове значення all.
 * @param onSearchChange — отримує кожне нове текстове значення.
 * @param onStatusChange — отримує типізоване значення status-select.
 * @param onSourceChange — отримує типізоване значення source-select.
 * Значення select звужуються до LeadStatus/LeadSource або 'all';
 * компонент не фільтрує клієнтів, не зберігає локального стану й не виконує зовнішніх запитів.
 */
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
