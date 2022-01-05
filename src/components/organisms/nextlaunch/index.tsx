import React from 'react';

import { fromUnixTime, isAfter } from 'date-fns';

import * as Atoms from '@components/atoms';
import * as Molecules from '@components/molecules';
import withAnimatedBox from '@components/withAnimatedBox';
import { useUpcomingLaunches } from '@hooks/index';

import { Timer } from '../timer';

function NextLaunch() {
  const { data: launches } = useUpcomingLaunches();

  if (!launches?.length) {
    return null;
  }

  const isTPlusStage = isAfter(new Date(), fromUnixTime(launches[0].date_unix));

  return (
    <Atoms.Row
      sx={{
        mt: '36px',
        mb: '12px',
        pl: '24px',
        width: '100%',
        justifyContent: 'space-between',
      }}
    >
      <Atoms.Box sx={{ justifyContent: 'space-around' }}>
        <Atoms.Text sx={{ color: 'white', fontWeight: 'bold' }}>
          {launches[0].name}
        </Atoms.Text>

        <Molecules.TCountLabel isTPlusStage={isTPlusStage} />
      </Atoms.Box>

      <Timer unixTime={launches[0].date_unix} />
    </Atoms.Row>
  );
}

export default withAnimatedBox(NextLaunch, 500);
