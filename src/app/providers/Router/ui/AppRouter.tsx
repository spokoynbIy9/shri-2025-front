import { useCallback } from 'react';
import type { AppRoutesProps } from '../../../../shared/config/routes';
import { Layout } from '../../../../widgets/Layout';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '../config/routeConfig';

const AppRouter = () => {
  const renderWithWrapper = useCallback((route: AppRoutesProps) => {
    const element = route.hasLayout ? (
      <Layout>{route.element}</Layout>
    ) : (
      route.element
    );

    return <Route key={route.path} path={route.path} element={element} />;
  }, []);

  return <Routes>{Object.values(routeConfig).map(renderWithWrapper)}</Routes>;
};

export default AppRouter;
