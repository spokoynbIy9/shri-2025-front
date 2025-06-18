import type { FC, ReactNode } from 'react';
import { Header } from '../../Header';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <div className="page-wrapper">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
