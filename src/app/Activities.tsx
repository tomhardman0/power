import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import { Activity } from './Activity';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2)
    },
    gridList: {
      justifyContent: 'space-around'
    }
  })
);

interface Props {
  activities: any[];
  maps: {
    apiKey: string;
  };
}

export const Activities: React.FunctionComponent<Props> = ({
  activities,
  maps
}) => {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <GridList cols={2} spacing={3} className={classes.gridList}>
        {activities.map((activity: any, i: number) => (
          <Activity maps={maps} activity={activity} key={i} i={i} />
        ))}
      </GridList>
    </Container>
  );
};
