import React from 'react';

import { fromUnixTime } from 'date-fns';
import { Box, Row, Text } from 'native-base';

import useDate from '@hooks/useDate';
import { useUpcomingLaunches } from '@hooks/useLaunches';
import { getTMinus } from '@utils/helpers';

export default function NextLaunch() {
  const { data: launches } = useUpcomingLaunches();

  const date = useDate({
    date: launches?.length ? fromUnixTime(launches[0].date_unix) : new Date(),
  });

  const tMinus = getTMinus(date);

  if (!launches?.length) {
    return null;
  }

  return (
    <Box mt="8" w="100%" py="4" justifyContent="center" pl="4">
      <Text color="white" fontSize="lg" fontWeight={700}>
        {launches[0].name}
      </Text>

      <Row justifyContent="space-between" mt="1">
        <Box borderBottomColor="accent" borderBottomWidth={1}>
          <Text color="white" fontSize="sm" fontWeight={700}>
            T-Minus
          </Text>
        </Box>

        <Row>
          {Number(tMinus.days) >= 1 && (
            <Text color="white" fontSize="sm" fontWeight={700}>
              {Number(tMinus.days) > 1
                ? `${tMinus.days} days `
                : `${tMinus.days} day `}
              <Divider />{' '}
            </Text>
          )}
          <Text color="white" fontSize="sm" fontWeight={700}>
            {tMinus.hours}:{tMinus.minutes}:{tMinus.seconds}
          </Text>
        </Row>
      </Row>
    </Box>
  );
}

const Divider = () => {
  return (
    <Text color="accent" fontSize="sm" fontWeight={700}>
      •
    </Text>
  );
};
