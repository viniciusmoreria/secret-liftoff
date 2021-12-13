import React from 'react';

import { Box, Center, Heading, ScrollView, StatusBar, Text } from 'native-base';
import { TouchableOpacity } from 'react-native';

import NextLaunch from '@components/nextlaunch';
import PastLaunches from '@components/pastlaunches';
import UpcomingLaunches from '@components/upcominglaunches';
import { usePastLaunches, useUpcomingLaunches } from '@hooks/useLaunches';
import { greeting } from '@utils/helpers';

export default function Home() {
  const { isError: errorUpcomingLaunches, refetch: refetchLaunches } =
    useUpcomingLaunches();

  const { isError: errorPastLaunches, refetch: refetchPastLaunches } =
    usePastLaunches();

  const handleRefreshData = React.useCallback(async () => {
    await refetchLaunches();
    await refetchPastLaunches();
  }, [refetchLaunches, refetchPastLaunches]);

  if (errorUpcomingLaunches || errorPastLaunches) {
    return (
      <Center flex={1} bg="background">
        <Heading color="primary" size="sm" mb="4">
          Error loading launches
        </Heading>

        <TouchableOpacity onPress={handleRefreshData}>
          <Text color="white" fontSize="sm" fontWeight={700}>
            Try again
          </Text>
        </TouchableOpacity>
      </Center>
    );
  }

  return (
    <ScrollView flex={1} bg="background" px="4">
      <Box pl="4">
        <StatusBar animated barStyle="light-content" />

        <Heading color="white" fontWeight="500" mt="16">
          {greeting()}
        </Heading>

        <NextLaunch />

        <UpcomingLaunches />

        <PastLaunches />
      </Box>
    </ScrollView>
  );
}
