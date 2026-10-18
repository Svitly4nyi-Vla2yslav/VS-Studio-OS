import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { ContentArea, MainArea, PageShell } from './Layout.styled';

/**
 * Формує спільний каркас VS Studio OS із Sidebar, Header та областю дочірнього маршруту.
 * Outlet повертає активну сторінку React Router; власного стану чи побічних ефектів компонент не має.
 */
export const Layout = () => (
  <PageShell>
    <Sidebar />
    <MainArea>
      <Header />
      <ContentArea>
        <Outlet />
      </ContentArea>
    </MainArea>
  </PageShell>
);
