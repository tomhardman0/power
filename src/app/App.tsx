import React from 'react';
import moment from 'moment';
import polyline from '@mapbox/polyline';

export const App = (activities: any) => {
  const filteredActivities = activities.filter(
    (activity: any) =>
      activity.type === 'Ride' || activity.type === 'VirtualRide'
  );

  return (
    <main>
      {filteredActivities.map((activity: any, i: number) => (
        <div key={i}>
          <h4>
            {activity.name}{' '}
            <span style={{ opacity: 0.6, fontSize: '90%' }}>
              {moment(activity.start_date_local).format(
                'dddd, MMMM Do YYYY, h:mm:ss a'
              )}
            </span>
          </h4>
          <p>Moving Time: {activity.moving_time / 60 / 60} hours</p>
          <p>Total Time: {activity.elapsed_time / 60 / 60} hours</p>
          <p>Distance: {activity.distance / 1000}km</p>
          <p>Elevation: {activity.total_elevation_gain}m</p>
          <p>Power: {activity.average_watts}</p>
          <p>Normalised Power: {activity.weighted_average_watts}</p>
          <p>HR: {activity.average_heartrate}</p>
          <p>{polyline.decode(activity.map.summary_polyline)}</p>
        </div>
      ))}
    </main>
  );
};
