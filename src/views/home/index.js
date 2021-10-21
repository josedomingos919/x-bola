import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Swiper from 'react-native-web-swiper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  slide1: {
    backgroundColor: 'red',
  },
  slide2: {
    backgroundColor: 'rgba(20,200,20,0.3)',
  },
  slide3: {
    backgroundColor: 'rgba(200,20,20,0.3)',
  },
  back: {
    width: 100,
    height: 300,
  },
});

export default class Screen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Swiper
          controlsProps={{
            prevTitle: '',
            nextTitle: '',
          }}>
          <View style={[styles.slideContainer, styles.slide1]}>
            <Text>Slide 1</Text>
          </View>
          <View style={[styles.slideContainer, styles.slide2]}>
            <Text>Slide 2</Text>
          </View>
          <View style={[styles.slideContainer, styles.slide3]}>
            <Text>Slide 3</Text>
          </View>
        </Swiper>
      </View>
    );
  }
}
