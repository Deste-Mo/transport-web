import { Helmet } from 'react-helmet-async';

import { SignalementView } from 'src/sections/signalement/view';

// ----------------------------------------------------------------------

export default function SignalementPage() {
  return (
    <>
      <Helmet>
        <title> Signalement | Transport </title>
      </Helmet>

      <SignalementView />
    </>
  );
}
