import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'Utilisateurs',
    path: '/user',
    icon: icon('ic_user'),
  },
  {
    title: 'Notifications',
    path: '/notifs',
    icon: icon('bell-bing-bold-duotone'),
  },
  {
    title: 'signalement',
    path: '/signalement',
    icon: icon('ic_signalement'),
  },
  {
    title: 'Deconnexion',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
