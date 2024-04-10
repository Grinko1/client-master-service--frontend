export enum AppRoutes {
  MAIN = 'main',
  CLIENTS = "clients",
  MASTERS = "masters",
  VISITS = 'visits',
  // ABOUT = 'about',
  // PROFILE = 'profile',
  // ARTICLES = 'articles',
  // ARTICLE_DETAILS = 'article_details',
  // ARTICLE_CREATE = 'article_create',
  // ARTICLE_EDIT = 'article_edit',
  // ADMIN_PANEL = 'admin_panel',
  // FORBIDDEN_PAGE = 'forbidden_page',
  // SETTINGS_PAGE = 'settings_page',
  // last
  NOT_FOUND = 'not_found',
}
export const getRouteMain = () => '/';
export const getRouteClients = () => '/clients';
export const getRouteMasters = () => '/masters';
export const getRouteVisits = () => '/visits';


export const getRouteAbout = () => '/about';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouterArticleDetails = (id: string) => `/articles/${id}`;
export const getRouteArticles = () => '/articles';
export const getRouteArticleCreate = () => '/articles/new';
export const getRouteArticlesEdit = (id: string) => `/articles/${id}/edit`;
export const getRouteAdmin = () => '/admin';
export const getRouteForbidden = () => '/forbidden';
export const getRouteSettings = () => '/settings';
export const getRouteNotFound = () => '*';

export const AppRouteByPathPattern: Record<string, AppRoutes> = {
  [getRouteMain()]: AppRoutes.MAIN,
  [getRouteClients()]: AppRoutes.CLIENTS,
  [getRouteMasters()]: AppRoutes.MASTERS
  // [getRouteAbout()]: AppRoutes.ABOUT,
  // [getRouteProfile(':id')]: AppRoutes.PROFILE,
  // [getRouterArticleDetails(':id')]: AppRoutes.ARTICLE_DETAILS,
  // [getRouteArticles()]: AppRoutes.ARTICLES,
  // [getRouteArticleCreate()]: AppRoutes.ARTICLE_CREATE,
  // [getRouteArticlesEdit(':id')]: AppRoutes.ARTICLE_EDIT,
  // [getRouteAdmin()]: AppRoutes.ADMIN_PANEL,
  // [getRouteForbidden()]: AppRoutes.FORBIDDEN_PAGE,
  // [getRouteSettings()]: AppRoutes.SETTINGS_PAGE,
};

const RoutePath: Record<AppRoutes, string> = {
  [AppRoutes.MAIN]: getRouteMain(),
  [AppRoutes.CLIENTS]: getRouteClients(),
  [AppRoutes.MASTERS]: getRouteMasters(),
  [AppRoutes.VISITS]: getRouteVisits(),
  // [AppRoutes.ABOUT]: getRouteAbout(),
  // [AppRoutes.PROFILE]: getRouteProfile(':id'), // + :id
  // [AppRoutes.ARTICLES]: getRouteArticles(),
  // [AppRoutes.ARTICLE_DETAILS]: getRouterArticleDetails(':id'), // + :id
  // [AppRoutes.ARTICLE_CREATE]: getRouteArticleCreate(),
  // [AppRoutes.ARTICLE_EDIT]: getRouteArticlesEdit(':id'),
  // [AppRoutes.ADMIN_PANEL]: getRouteAdmin(),
  // [AppRoutes.FORBIDDEN_PAGE]: getRouteForbidden(),
  // [AppRoutes.SETTINGS_PAGE]: getRouteSettings(),
  // последний
  [AppRoutes.NOT_FOUND]: getRouteNotFound(),
};
