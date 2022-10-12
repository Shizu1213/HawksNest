import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity} from 'react-native';

import twoc from './assets/cards/2_of_clubs.png';
import twod from './assets/cards/2_of_diamonds.png';
import twoh from './assets/cards/2_of_hearts.png';
import twos from './assets/cards/2_of_spades.png';
import threec from './assets/cards/3_of_clubs.png';
import threed from './assets/cards/3_of_diamonds.png';
import threeh from './assets/cards/3_of_hearts.png';
import threes from './assets/cards/3_of_spades.png';
import fourc from './assets/cards/4_of_clubs.png';
import fourd from './assets/cards/4_of_diamonds.png';
import fourh from './assets/cards/4_of_hearts.png';
import fours from './assets/cards/4_of_spades.png';
import fivec from './assets/cards/5_of_clubs.png';
import fived from './assets/cards/5_of_diamonds.png';
import fiveh from './assets/cards/5_of_hearts.png';
import fives from './assets/cards/5_of_spades.png';
import sixc from './assets/cards/6_of_clubs.png';
import sixd from './assets/cards/6_of_diamonds.png';
import sixh from './assets/cards/6_of_hearts.png';
import sixs from './assets/cards/6_of_spades.png';
import sevenc from './assets/cards/7_of_clubs.png';
import sevend from './assets/cards/7_of_diamonds.png';
import sevenh from './assets/cards/7_of_hearts.png';
import sevens from './assets/cards/7_of_spades.png';
import eightc from './assets/cards/8_of_clubs.png';
import eightd from './assets/cards/8_of_diamonds.png';
import eighth from './assets/cards/8_of_hearts.png';
import eights from './assets/cards/8_of_spades.png';
import ninec from './assets/cards/9_of_clubs.png';
import nined from './assets/cards/9_of_diamonds.png';
import nineh from './assets/cards/9_of_hearts.png';
import nines from './assets/cards/9_of_spades.png';
import tenc from './assets/cards/10_of_clubs.png';
import tend from './assets/cards/10_of_diamonds.png';
import tenh from './assets/cards/10_of_hearts.png';
import tens from './assets/cards/10_of_spades.png';
import jackc from './assets/cards/jack_of_clubs.png';
import jackd from './assets/cards/jack_of_diamonds.png';
import jackh from './assets/cards/jack_of_hearts.png';
import jacks from './assets/cards/jack_of_spades.png';
import queenc from './assets/cards/queen_of_clubs.png';
import queend from './assets/cards/queen_of_diamonds.png';
import queenh from './assets/cards/queen_of_hearts.png';
import queens from './assets/cards/queen_of_spades.png';
import kingc from './assets/cards/king_of_clubs.png';
import kingd from './assets/cards/king_of_diamonds.png';
import kingh from './assets/cards/king_of_hearts.png';
import kings from './assets/cards/king_of_spades.png';
import acec from './assets/cards/ace_of_clubs.png';
import aced from './assets/cards/ace_of_diamonds.png';
import aceh from './assets/cards/ace_of_hearts.png';
import aces from './assets/cards/ace_of_spades.png';


export default function App() {
  const [deck, setDeck] = useState(["", "", "", "", "", "", "", "", "", "",  "", "", "", "", "", "", "", "", "", "",  "", "", "", "", "","", "", "", "", "", "", "","", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]);
  return (
    <ScrollView contentContainerStyle = {styles.container}>
        {deck.map((card, index) => {
          return (<Image style = {styles.card} source={Math.floor(index + 1)}></Image>)
        })}
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flexDirection: 'row',
    backgroundColor: 'cyan'
  },
  card: {
    width: 50,
    height: 75,
    margin: 5,
  },
});
