import React, { createContext, useContext } from 'react';

import * as Notifications from 'expo-notifications';

import type { LaunchProps } from '@types';

interface NotificationContextData {
  scheduleNotification: (launch: LaunchProps) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextData>(
  {} as NotificationContextData,
);

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const NotificationProvider: React.FC = ({ children }) => {
  async function scheduleNotification(launch: LaunchProps) {
    await Notifications.cancelAllScheduledNotificationsAsync();

    const { status } = await Notifications.getPermissionsAsync();

    if (status !== 'granted') {
      return;
    }

    const launchTime = new Date(launch.date_local).getTime() / 1000;

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Upcoming Launch',
        body: `${launch.name} will attempt launch from ${launch.launchpad.locality} - ${launch.launchpad.region} in 24 hours`,
      },
      trigger: {
        // 24 hours before launch
        seconds: launchTime - 24 * 60 * 60,
      },
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Upcoming Launch',
        body: `${launch.name} will attempt launch from ${launch.launchpad.locality} - ${launch.launchpad.region} in 1 hour`,
      },
      trigger: {
        // 1 hour before launch
        seconds: launchTime - 60 * 60,
      },
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${launch.name}: T-Minus 10 minutes`,
        body: `Flight #${launch?.flight_number} ready for launch at ${launch.launchpad.locality}`,
      },
      trigger: {
        // 10 minutes before launch
        seconds: launchTime - 600,
      },
    });

    await Notifications.scheduleNotificationAsync({
      content: {
        title: `${launch.name} aboard ${launch.rocket.name}`,
        body: `Liftoff in T-Minus 5 minutes`,
      },
      trigger: {
        // 5 minutes before launch
        seconds: launchTime - 300,
      },
    });
  }

  return (
    <NotificationContext.Provider
      value={{
        scheduleNotification,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

function useNotification(): NotificationContextData {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error(
      'useNotification must be used within an NotificationProvider',
    );
  }

  return context;
}

export { NotificationProvider, useNotification };
