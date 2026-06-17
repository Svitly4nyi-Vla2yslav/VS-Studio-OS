import { SectionTitle } from '../../components/SectionTitle/SectionTitle';
import { FinanceCard, FinanceGrid, FinanceText, FinanceTitle, TaxNotice } from './Finance.styled';

// financeSections описує майбутні фінансові блоки без складної податкової логіки.
const financeSections = [
  'income',
  'expenses',
  'invoices',
  'documents',
  'cashflow',
  'tax reminders',
  'Steuerberater export',
  'audit log',
];

// Сторінка Finance є структурованою заглушкою для майбутнього фінансового модуля.
export const Finance = () => (
  <>
    <SectionTitle
      title="Finance"
      description="Prepared finance structure for income, expenses, invoices, documents, cashflow, and audit history."
    />
    <TaxNotice>
      Ймовірно, це може бути Betriebsausgabe. Перевірити зі Steuerberater перед подачею.
    </TaxNotice>
    <FinanceGrid>
      {financeSections.map((section) => (
        <FinanceCard key={section}>
          <FinanceTitle>{section}</FinanceTitle>
          <FinanceText>
            Placeholder for future financeService logic, document archive, transaction categories, and safe audit trail.
          </FinanceText>
        </FinanceCard>
      ))}
    </FinanceGrid>
  </>
);
