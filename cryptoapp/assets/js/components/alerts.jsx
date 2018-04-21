import React from 'react';
import Alert from './alert';

export default function Alerts(params) {
  let alerts = _.map(params.alerts, (aa) => <Alert key={aa.id} alert={aa} />);
  return <div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    { alerts }
  </div>;
}
