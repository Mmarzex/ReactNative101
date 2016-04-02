import React, {
  Component,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Button from 'react-native-button';
import {Actions} from 'react-native-router-flux';
import Modal from 'react-native-modalbox';

export default class PokeDetail extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.props.poke_entry.pokemon_species.name}
        </Text>
        <Button onPress={() => this.refs.noteModal.open()}>Add a Note!</Button>
        <Modal
          style={[modalStyles.modal, modalStyles.modal3]}
          position={"center"}
          ref={"noteModal"}
          >
          <Text style={styles.instructions}>
            Detail Modal!!!
          </Text>
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
  modal3: {
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
