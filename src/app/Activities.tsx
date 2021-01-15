import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import GridList from '@material-ui/core/GridList';
import RefreshIcon from '@material-ui/icons/Refresh';
import TickIcon from '@material-ui/icons/DoneAllOutlined';
import { Activity } from './Activity';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2.5)
    },
    gridList: {
      justifyContent: 'space-around'
    },
    hiddenIconContainer: {
      margin: `0 auto ${theme.spacing(3)}px`,
      textAlign: 'center'
    },
    '@keyframes rotation': {
      from: {
        transform: 'rotate(0deg)'
      },
      to: {
        transform: 'rotate(359deg)'
      }
    },
    hiddenIcon: {
      animation: '$rotation 1s infinite linear'
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
  const [touchPageY, setTouchPageY] = useState<number | null>(null);
  const [reloading, setReload] = useState(false);

  return (
    <Container
      onTouchStart={event => {
        const touch = event.touches[0];
        const vertThreshold = window.innerHeight * 0.9;
        if (touch.pageY >= vertThreshold) {
        } else {
          setTouchPageY(touch.pageY);
        }
      }}
      onTouchMove={event => {
        if (
          touchPageY &&
          !reloading &&
          event.touches[0].pageY >= touchPageY + 150
        ) {
          setReload(true);
          window.location.reload();
        }
      }}
      onTouchEnd={() => setTouchPageY(null)}
      className={classes.root}
    >
      <div className={classes.hiddenIconContainer}>
        {reloading ? (
          <TickIcon fontSize="large" />
        ) : (
          <RefreshIcon className={classes.hiddenIcon} fontSize="large" />
        )}
      </div>
      <GridList cols={2} spacing={3} className={classes.gridList}>
        {activities.map((activity: any, i: number) => (
          <Activity maps={maps} activity={activity} key={i} i={i} />
        ))}
      </GridList>
    </Container>
  );
};
