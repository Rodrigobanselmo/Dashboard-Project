import {LogOut} from '../services/firebaseAuth'
import {useLoaderScreen} from '../context/LoaderContext'
import {useLoaderDash} from '../context/LoadDashContext'


export const itemsProfile = [
    {
      text: "Meu Perfil",
      icon: 'Person',
      onClick: ''
    },
    {
      text: "Histórico",
      icon: 'History',
      onClick: ''
    },
    {
      text: "Documentos",
      icon: 'CloudDownload',
      onClick: ''
    },
    {
      text: "Gerenciar Membros",
      icon: 'Group',
      onClick: ''
    },
    {
      text: "Logout",
      icon: 'ExitToApp',
      onClick: 'logout',
    }
  ];