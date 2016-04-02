import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  ScrollView,
  View
} from 'react-native';
import {
  Cell,
  CustomCell,
  Section,
  TableView
} from 'react-native-tableview-simple';
import {Actions} from 'react-native-router-flux';

export default class PokeList extends Component {
  constructor(props) {
    super(props);
    this.state = {isFetching: true};
    // this.setState({isFetching: true});
  }
  componentDidMount() {
    fetch('http://pokeapi.co/api/v2/pokedex/2')
    .then(r => r.json())
    .then(r => {
      console.log(r);
      this.setState({isFetching: false, pokedex: r});
    });
  }
  render() {
    var pokemonTable;
    if(this.state.isFetching) {
      pokemonTable = (
        <View>
          <Text style={styles.instructions}>
            Loading!
          </Text>
        </View>
      )
    } else {
      const { pokedex } = this.state;
      var innerTable = pokedex.pokemon_entries.map(p => {
        return (
          <CustomCell
            key={p.entry_number}
            style={{width: 32, height: 32}}
            onPress={() => {
              // console.log("You selected!". p.pokemon_species.name);
              Actions.pokedetail({pokeid: p.entry_number});
            }}>
            <Text style={{flex: 1, fontSize: 16}}>{p.entry_number}:  {p.pokemon_species.name}</Text>
          </CustomCell>
        )
      });
      pokemonTable = (
        <TableView>
          <Section header="Gen 1 <3">
            {innerTable}
          </Section>
        </TableView>
      );
    }
    return (
      <ScrollView contentContainerStyle={styles.stage}>
        {pokemonTable}
      </ScrollView>
    )

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
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 50,
    paddingBottom: 20
  }
});
