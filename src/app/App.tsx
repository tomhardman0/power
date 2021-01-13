import React, { useState } from 'react';
import { Header } from './Header';
import { Activities } from './Activities';
import { AppProps } from '../types/state';

import Box from '@material-ui/core/Box';

const predicateMap: { [key: number]: (val: any) => boolean } = {
  0: (activity: any) =>
    activity.type === 'Ride' || activity.type === 'VirtualRide',
  1: (activity: any) => activity.type === 'Ride',
  2: (activity: any) => activity.type === 'VirtualRide'
};

export const AppComponent: React.FunctionComponent<AppProps> = props => {
  const {
    state: { user, activities, authUrl, maps }
  } = props;

  const [rideType, setRideType] = useState(0);

  const filteredActivities = activities?.filter(predicateMap[rideType]);

  return (
    <Box bgcolor="background.default">
      <Header
        rideType={rideType}
        setRideType={setRideType}
        user={user}
        authUrl={authUrl}
      />
      {filteredActivities && (
        <Activities maps={maps} activities={filteredActivities} />
      )}
    </Box>
  );
};
