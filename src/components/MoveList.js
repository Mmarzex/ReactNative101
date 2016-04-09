import React, {
  Component,
  ScrollView,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Button from 'react-native-button';
import {
  Cell,
  CustomCell,
  Section,
  TableView
} from 'react-native-tableview-simple';

const genOneMasterRace = 'red-blue';

export default class MoveList extends Component {
  render() {
    const moves = this.props.pokemon !== null ? this.props.pokemon.moves : [];
    var tmMoves = [];
    var levelMoves = [];

    moves.forEach((m, i) => {
      var versionIndex = 0;
      let moveInGen = m.version_group_details.find((v, i) => {
        if(v.version_group.name === genOneMasterRace) {
          versionIndex = i;
          return true;
        }
      });

      if(moveInGen) {
        let versionGroup = m.version_group_details[versionIndex];
        if(versionGroup.move_learn_method.name === "machine") {
          tmMoves.push((
            <CustomCell
              key={i}
              style={styles.moveCell}>
              <Text style={styles.moveName}>{m.move.name}</Text>
            </CustomCell>
          ));
        } else if(versionGroup.move_learn_method.name === "level-up") {
          levelMoves.push((
            <CustomCell
              key={i}
              style={styles.moveCell}>
              <Text style={styles.moveName}>{m.move.name}</Text>
              <Text style={{fontSize: 14}}>{versionGroup.level_learned_at}</Text>
            </CustomCell>
          ))
        }
      }
    });

    return(
      
      <ScrollView contentContainerStyle={styles.stage}>
        <TableView>
          <Section header="Level Moves">
            {levelMoves}
          </Section>
          <Section header="TM Moves">
            {tmMoves}
          </Section>
        </TableView>
      </ScrollView>
    )
  }
}



const styles = StyleSheet.create({
  stage: {
    backgroundColor: '#EFEFF4',
    paddingTop: 50,
    paddingBottom: 20
  },
  moveCell: {
    width: 32,
    height: 32
  },
  moveName: {
    flex: 1,
    fontSize: 16
  },
  levelText: {
    fontSize: 14
  }
});
