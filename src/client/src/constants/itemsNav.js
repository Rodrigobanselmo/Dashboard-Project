import {TEAM} from '../routes/routesNames'

export const navList = [
  {
    text: "Relatar Erros",
    icon: 'Errors',
    id:Math.random(),
    visible:'all',
  },
  {
    text: "Precisando de Ajuda?",
    icon: 'Help',
    id:Math.random(),
    visible:'all',
  },
  {
    text: "Ultimos Acessos",
    icon: 'RestorePage',
    id:Math.random(),
    visible:'all',
  },
/*   {
    text: "Gerenciar Usuários",
    icon: 'Admin',
    visible:['admin','master'],
    id:Math.random(),
    to: TEAM
  }, */
  {
    text: "Notificações",
    icon: 'Notifications',
    id:Math.random(),
    onClick:()=>{},
    visible:'all',
  },
];
