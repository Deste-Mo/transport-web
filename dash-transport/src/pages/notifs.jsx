import { Helmet } from 'react-helmet-async';

import { NotifsView } from 'src/sections/notifs/view';

// ----------------------------------------------------------------------

export default function NotifsPage() {
  return (
    <>
      <Helmet>
        <title> Notifications || Transport </title>
      </Helmet>

      <NotifsView />
    </>
  );
}
