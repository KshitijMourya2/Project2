import React from 'react';
import User from './user';

export default function Users(params) {
  let users = _.map(params.users, (uu) => <User key={uu.id} user={uu} />);
  return <div>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    { users }
  </div>;
}
