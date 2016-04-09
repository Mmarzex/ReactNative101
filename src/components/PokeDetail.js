import React, {
  Component,
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import { StatelessForm, InlineTextInput } from 'react-native-stateless-form';
import MoveList from './MoveList';

export default class PokeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: null,
      notes: [],
      pokeData: null
    }
  }

  componentDidMount() {
    const pokemonURL = 'http://pokeapi.co/api/v2/pokemon/'
      + this.props.poke_entry.entry_number;
    fetch(pokemonURL)
      .then(r => r.json())
      .then(d => this.setState({pokeData: d}));
  }

  render() {
    const { note, notes } = this.state;
    const noteValid = (note && note.length > 0 ? true : false);
    var noteViews = notes.map((n, i) => {
      return (
        <Text key={i} style={styles.notes}>
          {n}
        </Text>
      );
    });

    const name = this.props.poke_entry.pokemon_species.name;

    return(
      <View style={styles.container}>
        <Image style={{width: 128, height: 128}}
          source={{
            uri: 'https://s3.amazonaws.com/mmpokedex/red-blue/' +
              this.props.poke_entry.entry_number + '.png' }} />
        <Text style={styles.noteHeader}>
          Notes for {name}
        </Text>
        {noteViews}
        <Button onPress={() => this.refs.noteModal.open()}>Add a Note!</Button>
        <Button onPress={() => this.refs.movesModal.open()}>See {name}'s Moves</Button>
        <Modal
          style={[modalStyles.moveModal]}
          ref={"movesModal"}
          swipeToClose={false}>
          <MoveList pokemon={this.state.pokeData} />
        </Modal>
        <Modal
          style={[modalStyles.modal, modalStyles.noteModal]}
          position={"center"}
          ref={"noteModal"}
          >
          <StatelessForm style={{
              flex: 1,
              marginTop: 20,
              backgroundColor: 'lightgray'
            }} scrollEnabled={false}>
            <InlineTextInput
              title='Note'
              placeholder='Write Awesome Note Here'
              style={{ borderColor: 'gray' }}
              titleStyle={{ color: 'dimgray' }}
              inputStyle={{ color: 'slategray' }}
              messageStyle={{ color: 'red' }}
              value={note}
              valid={noteValid}
              message={note && !noteValid ? 'Please enter a note' : null}
              onChangeText={(text) => { this.setState({note: text}) }}/>
          </StatelessForm>
          <Button onPress={() => {
              console.log(this.state.note);
              this.state.notes.push(this.state.note);
              this.setState({note: null});
              console.log(this.state.notes);
              this.refs.noteModal.close();
            }}>Save Note!</Button>
        </Modal>
      </View>
    )
  }
}

const modalStyles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  moveModal: {
    marginTop: 20
  },
  noteModal: {
    height: 300,
    width: 300
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  notes: {
    fontSize: 13,
    textAlign: 'center',
    margin: 10
  },
  noteHeader: {
    fontSize: 14,
    textAlign: 'center',
    margin: 10
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
