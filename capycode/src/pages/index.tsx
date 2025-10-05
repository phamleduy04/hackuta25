import React, { Suspense } from 'react';
const PreLanding = React.lazy(() => import('./pre-landing'));

function Index() {
  return (
    <Suspense fallback={<div />}>
      <PreLanding />
    </Suspense>
  );
}

export default Index;