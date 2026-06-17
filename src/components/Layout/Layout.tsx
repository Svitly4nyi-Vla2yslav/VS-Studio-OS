import { Outlet } from 'react-router-dom';
import { Header } from '../Header/Header';
import { Sidebar } from '../Sidebar/Sidebar';
import { ContentArea, MainArea, PageShell } from './Layout.styled';

// Компонент Layout відповідає за спільний каркас усіх сторінок VS Studio OS.
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
