import type { RouteObject } from 'react-router-dom';

export type AppRoutesProps = RouteObject & {
  hasLayout?: boolean;
};

export const AppRoutes = {
  Home: 'home',
  AnalyseCSV: 'analyse-csv',
  GeneratorCSV: 'generator-csv',
  History: 'history',
} as const;

export type AppRoutes = keyof typeof AppRoutes;

export const RoutePath: Record<AppRoutes, string> = {
  Home: '/',
  AnalyseCSV: '/analyse-csv',
  GeneratorCSV: '/generator-csv',
  History: '/history',
};
