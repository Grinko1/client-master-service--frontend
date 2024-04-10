import { RouteProps } from 'react-router-dom';

import {
  AppRoutes,
  getRouteAbout,
  getRouteAdmin,
  getRouteArticleCreate,
  getRouteArticles,
  getRouteArticlesEdit,
  getRouteClients,
  getRouteForbidden,
  getRouteMain,
  getRouteNotFound,
  getRouteProfile,
  getRouteSettings,
  getRouterArticleDetails,
} from '@/shared/const/router';
import { Main } from '@/pages/main/Main';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ClientsPage } from '@/pages/clientsPage/ClientsPage';


export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  // roles?: UserRole[];
};

export const routeConfig: Record<AppRoutes, AppRoutesProps> = {
  [AppRoutes.MAIN]: {
    path: getRouteMain(),
    element: <Main />,
  },
  [AppRoutes.CLIENTS]: {
    path: getRouteClients(),
    element: <ClientsPage />,
  },
  // [AppRoutes.ABOUT]: {
  //   path: getRouteAbout(),
  //   element: <AboutPage />,
  // },
  // [AppRoutes.FORBIDDEN_PAGE]: {
  //   path: getRouteForbidden(),
  //   element: <ForbiddenPage />,
  // },
  // [AppRoutes.PROFILE]: {
  //   path: getRouteProfile(':id'),
  //   element: <ProfilePage />,
  //   authOnly: true,
  // },
  //  [AppRoutes.SETTINGS_PAGE]: {
  //   path: getRouteSettings(),
  //   element: <SettingsPage />,
  //   authOnly: true,
  // },
  // [AppRoutes.ARTICLES]: {
  //   path: getRouteArticles(),
  //   element: <ArticlesPage />,
  //   authOnly: true,
  // },
  // [AppRoutes.ADMIN_PANEL]: {
  //   path: getRouteAdmin(),
  //   element: <AdminPanelPage />,
  //   authOnly: true,
  //   roles: [UserRole.ADMIN, UserRole.ADMIN],
  // },
  // [AppRoutes.ARTICLE_DETAILS]: {
  //   path: getRouterArticleDetails(':id'),
  //   element: <ArticleDetailsPage />,
  //   authOnly: true,
  // },
  // [AppRoutes.ARTICLE_CREATE]: {
  //   path: getRouteArticleCreate(),
  //   element: <ArticleEditPage />,
  //   authOnly: true,
  // },
  // [AppRoutes.ARTICLE_EDIT]: {
  //   path: getRouteArticlesEdit(':id'),
  //   element: <ArticleEditPage />,
  //   authOnly: true,
  // },
  // last
  [AppRoutes.NOT_FOUND]: {
    path: getRouteNotFound(),
    element: <NotFoundPage />,
  },
};
