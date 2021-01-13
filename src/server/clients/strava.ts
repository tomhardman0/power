import axios from 'axios';

export const getActivities = async (token: string) => {
  const res = await axios.get(
    `https://www.strava.com/api/v3/athlete/activities`,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return res.data;
};

export const stravaClient = {
  getActivities
};
