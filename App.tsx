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

function App() {
  return (
    <>
      <Provider store={store}>
        <StackNavigation />
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
