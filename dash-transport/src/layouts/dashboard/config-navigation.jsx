import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  { title: 'Dashboard', path: '/', icon: icon('ic_analytics') },
  { title: 'Utilisateurs', path: '/user', icon: icon('ic_user') },
  { title: 'Notifications', path: '/notifications', icon: icon('../ic_notification') },
  { title: 'Alerts', path: '/signalement', icon: icon('ic_report') },


  { title: 'Abonnements', path: '/subscriptions', icon: icon('ic_subscription') },
];

export default navConfig;
