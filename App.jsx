/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import StackNavigation from './navigation/StackNavigation';
import { Provider } from 'react-redux';
import { store } from './store';
import { UserContext } from './UserContext';

function App() {
  return (
    <>
      <Provider store={store}>
        <UserContext>
          <StackNavigation />
        </UserContext>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
