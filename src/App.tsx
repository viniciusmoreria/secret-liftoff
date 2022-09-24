import { RootStackNavigator } from '@navigation/root-stack-navigator';
import { AppProviders } from '@providers/app-providers';
import { enableFreeze, enableScreens } from 'react-native-screens';

enableFreeze(true);
enableScreens(true);

export default function App() {
  return (
    <AppProviders>
      <RootStackNavigator />
    </AppProviders>
  );
}
