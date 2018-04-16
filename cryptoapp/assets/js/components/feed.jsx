import React from 'react';
import Alert from './alert';

export default function Feed(params) {
  let alerts = _.map(params.alerts, (aa) => <Alert key={aa.id} alert={aa} />);
  return <div>
    { alerts }
  </div>;
}
