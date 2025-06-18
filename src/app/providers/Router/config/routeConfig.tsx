import { Navigate } from 'react-router-dom';
import { AnalyseCSV } from '../../../../pages/AnalyseCSV';
import { GeneratorCSV } from '../../../../pages/GeneratorCSV';
import { History } from '../../../../pages/History';
import {
  AppRoutes,
  RoutePath,
  type AppRoutesProps,
} from '../../../../shared/config/routes';

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  AnalyseCSV: {
    path: RoutePath.AnalyseCSV,
    element: <AnalyseCSV />,
    hasLayout: true,
  },
  GeneratorCSV: {
    path: RoutePath.GeneratorCSV,
    element: <GeneratorCSV />,
    hasLayout: true,
  },
  History: {
    path: RoutePath.History,
    element: <History />,
    hasLayout: true,
  },
  Home: {
    path: RoutePath.Home,
    element: <Navigate to={RoutePath.AnalyseCSV} replace={true} />,
  },
};
