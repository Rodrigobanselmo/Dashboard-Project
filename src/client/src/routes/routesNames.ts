export const HOME = '/';
export const DASHBOARD = '/dashboard';
export const SIGN = '/acesso';
export const NO_AUTH = '/sem-autenticacao';
export const GET_USER_DATA = `${SIGN}/insercao-de-dados`;

// navBar
// ...

// list
export const TEAM = `${DASHBOARD}/gerenciar-usuarios`;
export const TEAM_MODAL_OPEN = `${TEAM}?m=1`;
export const USER = `${DASHBOARD}/user`;
export const COMPANY = `${DASHBOARD}/empresas-cadastradas`;
export const COMPANY_MODAL_OPEN = `${COMPANY}?m=1`;
export const COMPANY_EDIT = `${COMPANY}/:cnpj/:tabId?`;
export const DATA = `${DASHBOARD}/data`;
export const IMPORT = `${DASHBOARD}/importar`;

// checklists
export const CHECKLIST_MANAGER = `${DASHBOARD}/checklist/gerenciar`;

// Fator de Risco
export const RISK_FACTORS = `${DASHBOARD}/fatores-de-risco/:risk/:tabId?`;
export const RISK_FACTORS_SLICE = `${DASHBOARD}/fatores-de-risco`;
export const RISK_FACTORS_FIS = `${RISK_FACTORS_SLICE}/fisicos`;
export const RISK_FACTORS_QUI = `${RISK_FACTORS_SLICE}/quimicos`;
export const RISK_FACTORS_BIO = `${RISK_FACTORS_SLICE}/biologicos`;
export const RISK_FACTORS_ACI = `${RISK_FACTORS_SLICE}/acidentes`;
export const RISK_FACTORS_ERG = `${RISK_FACTORS_SLICE}/ergonomicos`;
export const RISK_FACTORS_PER = `${RISK_FACTORS_SLICE}/periculosidade`;
export const RISK_FACTORS_INS = `${RISK_FACTORS_SLICE}/insalubridade`;
export const RISK_FACTORS_NOC = `${RISK_FACTORS_SLICE}/nocivos`;
export const RISK_FACTORS_AMB = `${RISK_FACTORS_SLICE}/ambientais`;
export const RISK_FACTORS_OTHERS = `${RISK_FACTORS_SLICE}/outros`;
export const RISK_FACTORS_EDIT = `${RISK_FACTORS_SLICE}/risco/:itemId/:tabId?`;

// subList
// ...

export const APP_HOME = 'app';
export const SERVICES_HOME = 'services';
export const ABOUT_HOME = 'about';
export const FAQ_HOME = 'faq';

// testing
export const TESTE = `${DASHBOARD}/teste`;
