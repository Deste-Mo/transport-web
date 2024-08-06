import SvgColor from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  { title: 'dashboard', path: '/', icon: icon('ic_analytics') },
  { title: 'Utilisateurs', path: '/user', icon: icon('ic_user') },
  { title: 'Notifications', path: '/notifications', icon: icon('../ic_notification') },
  { title: 'Rapports', path: '/signalement', icon: icon('ic_report') },


  { title: 'Abonnements', path: '/subscriptions', icon: icon('ic_subscription') },
  { title: 'Offres', path: '/offers', icon: icon('ic_offer') },
  { title: 'Messages', path: '/messages', icon: icon('../ic_notification_chat') },
  { title: 'Abonnés', path: '/follows', icon: icon('ic_follow') },
  { title: 'Évaluations', path: '/ratings', icon: icon('ic_rating') },
  { title: 'Offres enregistrées', path: '/saved-offers', icon: icon('ic_save_offer') },
  { title: 'Véhicules', path: '/vehicles', icon: icon('ic_vehicle') },
];

export default navConfig;
