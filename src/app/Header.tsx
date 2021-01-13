import React, { SetStateAction, Dispatch } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Slide from '@material-ui/core/Slide';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

import { User } from '../types/state';

interface Props {
  children: React.ReactElement;
}

function HideOnScroll(props: Props) {
  const { children } = props;
  const trigger = useScrollTrigger();
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  title: {
    flexGrow: 1,
    color: theme.palette.secondary.main
  }
}));

interface HeaderProps {
  authUrl: string;
  user?: User;
  rideType: number;
  setRideType: Dispatch<SetStateAction<number>>;
}

export const Header: React.FunctionComponent<HeaderProps> = ({
  authUrl,
  user,
  rideType,
  setRideType
}) => {
  const classes = useStyles();

  const handleChange = (event: React.ChangeEvent<{}>, value: any) => {
    setRideType(value);
  };

  return (
    <div className={classes.root}>
      <HideOnScroll>
        <AppBar color="primary">
          <Toolbar>
            <Grid justify="space-between" alignItems="center" container>
              <Grid item>
                <Typography variant="h4" className={classes.title}>
                  POWR
                </Typography>
              </Grid>

              <Grid item>
                {user && user.name ? (
                  <Grid justify="space-between" alignItems="center" container>
                    <Grid item>
                      <Typography
                        style={{ paddingRight: '8px' }}
                        variant="body1"
                      >
                        {user.name}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Avatar alt={user.name} src={user.image} />
                    </Grid>
                  </Grid>
                ) : (
                  <Button href={authUrl} color="inherit">
                    Authorise Strava
                  </Button>
                )}
              </Grid>
            </Grid>
          </Toolbar>
          <Tabs
            value={rideType}
            variant="fullWidth"
            onChange={handleChange}
            aria-label="Type of ride tabs"
          >
            <Tab label="All" />
            <Tab label="Outdoor" />
            <Tab label="Indoor" />
          </Tabs>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      <Tabs
        value={rideType}
        variant="fullWidth"
        onChange={handleChange}
        aria-label="Type of ride tabs"
      >
        <Tab label="All" />
        <Tab label="Outdoor" />
        <Tab label="Indoor" />
      </Tabs>
    </div>
  );
};
