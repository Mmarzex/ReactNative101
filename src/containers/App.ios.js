
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';
import {Actions, Scene, Router} from 'react-native-router-flux';
import Home from '../components/Home';
import PokeList from '../components/PokeList';
import PokeDetail from '../components/PokeDetail';

export default class App extends Component {
  render() {
    return (
      <Router>
        <Scene key="root">
            <Scene key="home" hideNavBar={true} component={Home}/>
            <Scene key="pokelist" component={PokeList} title='PokeDex'/>
            <Scene key="pokedetail" component={PokeDetail} title='Detail'/>
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
