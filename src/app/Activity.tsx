import React, { useState } from 'react';
import polyline from '@mapbox/polyline';
import { format } from 'date-fns';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import GridListTile from '@material-ui/core/GridListTile';
import GoogleMapReact from 'google-map-react';
import LinkIcon from '@material-ui/icons/Link';
import MapIcon from '@material-ui/icons/Map';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { mapStyles } from './mapStyles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      maxWidth: 390,
      width: 390,
      marginBottom: theme.spacing(1.5)
    },
    cardHeader: {
      minHeight: '92px',
      alignSelf: 'center'
    },
    cardLarge: {
      height: 430
    },
    cardSmall: {
      height: 200
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    chip: {
      margin: `${theme.spacing(0.5)}px ${theme.spacing(0.25)}px`,
      padding: `0 ${theme.spacing(2)}`
    },
    avatarRide: {
      backgroundColor: theme.palette.secondary.main
    },
    avatarVRide: {
      backgroundColor: theme.palette.secondary.light
    },
    avatarHr: {
      backgroundColor: '#ef476f'
    },
    avatarElevation: {
      backgroundColor: '#118ab2'
    },
    avatarPower: {
      backgroundColor: '#06d6a0'
    },
    avatarNPower: {
      backgroundColor: '#ffd166'
    },
    avatarDistance: {
      backgroundColor: '#073b4c'
    },
    cardContent: {
      flex: 1,
      justifyContent: 'space-around'
    },
    mapBox: {
      height: '250px',
      width: '100%'
    },
    mapBoxWrapper: {
      height: '227px',
      width: '100%',
      overflow: 'hidden'
    }
  })
);

interface Props {
  activity: any;
  i: number;
  maps: {
    apiKey: string;
  };
}

export const Activity: React.FunctionComponent<Props> = ({
  activity,
  i,
  maps: mapsCreds
}) => {
  const classes = useStyles();
  const coords = polyline
    .decode(activity.map.summary_polyline)
    .map(([x, y]) => ({ lat: x, lng: y }));
  const isRide = activity.type === 'Ride';

  const [showMap, changeShowMap] = useState(false);

  const [{ map, maps }, setMaps] = useState<{ map: any; maps: any }>({
    map: null,
    maps: null
  });

  if (map && maps) {
    const path = new maps.Polyline({
      path: coords,
      geodesic: true,
      strokeColor: '#2f9085',
      strokeOpacity: 1.0,
      strokeWeight: 2
    });
    path.setMap(map);
  }

  return (
    <GridListTile cols={1} className={classes.root}>
      <Card
        className={i < 3 || showMap ? classes.cardLarge : classes.cardSmall}
      >
        <CardHeader
          className={classes.cardHeader}
          avatar={
            <Avatar
              className={isRide ? classes.avatarRide : classes.avatarVRide}
              aria-label="power card"
            >
              {isRide ? 'R' : 'VR'}
            </Avatar>
          }
          action={
            <>
              <IconButton
                target="_blank"
                href={`https://www.strava.com/activities/${activity.id}/overview`}
                aria-label="Link to activity on Strava"
              >
                <LinkIcon />
              </IconButton>
              {i >= 3 && (
                <IconButton
                  aria-label="Link to activity on Strava"
                  onClick={() => changeShowMap(!showMap)}
                >
                  <MapIcon />
                </IconButton>
              )}
            </>
          }
          title={activity.name}
          subheader={format(new Date(activity.start_date_local), 'do MMMM y')}
        />
        {(i < 3 || showMap) && (
          <Box className={classes.mapBoxWrapper}>
            <Box className={classes.mapBox}>
              <GoogleMapReact
                options={{ styles: mapStyles, disableDefaultUI: true }}
                bootstrapURLKeys={{
                  key: mapsCreds.apiKey
                }}
                yesIWantToUseGoogleMapApiInternals
                shouldUnregisterMapOnUnmount
                center={coords[Math.floor(coords.length / 4)]}
                zoom={11}
                onGoogleApiLoaded={({ map, maps }) => {
                  setMaps({ map, maps });
                }}
              />
            </Box>
          </Box>
        )}

        {/* <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        /> */}
        <CardContent>
          <Grid justify="space-around" container>
            <Grid item>
              <Chip
                className={classes.chip}
                avatar={<Avatar className={classes.avatarNPower}>NP</Avatar>}
                label={`${activity.weighted_average_watts.toFixed(0)}W`}
              />
            </Grid>
            <Grid item>
              <Chip
                className={classes.chip}
                avatar={<Avatar className={classes.avatarPower}>P</Avatar>}
                label={`${activity.average_watts.toFixed(0)}W`}
              />
            </Grid>

            {activity.average_heartrate && (
              <Grid item>
                <Chip
                  className={classes.chip}
                  avatar={<Avatar className={classes.avatarHr}>HR</Avatar>}
                  label={`${activity.average_heartrate.toFixed(0)}bpm`}
                />
              </Grid>
            )}
            <Grid item>
              <Chip
                className={classes.chip}
                avatar={<Avatar className={classes.avatarDistance}>D</Avatar>}
                label={`${(activity.distance / 1000).toFixed(2)}km`}
              />
            </Grid>
            <Grid item>
              <Chip
                className={classes.chip}
                avatar={<Avatar className={classes.avatarElevation}>E</Avatar>}
                label={`${activity.total_elevation_gain}m`}
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton
            target="_blank"
            href={`https://www.strava.com/activities/${activity.id}/overview`}
            aria-label="share"
          >
            <LinkIcon />
          </IconButton>
        </CardActions>
      </Card>
    </GridListTile>
  );
};

//         <p>Moving Time: {activity.moving_time / 60 / 60} hours</p>
//         <p>Total Time: {activity.elapsed_time / 60 / 60} hours</p>
//         <p>Elevation: {activity.total_elevation_gain}m</p>
