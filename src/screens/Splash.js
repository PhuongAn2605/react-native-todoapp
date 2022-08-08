import React, {useEffect} from 'react';
import {Image, View, StyleSheet, Text} from 'react-native';
import GlobalStyle from '../utils/GlobalStyle';
const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('My tasks');
    }, 2000);
  }, [navigation]);
  return (
    <View style={styles.body}>
      <Image
        style={styles.logo}
        source={require('../../assets/checklist.png')}
      />
      <Text style={[GlobalStyle.CustomFontBig, styles.text]}>
        Phuong Todo List
      </Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0080ff',
  },
  logo: {
    width: 150,
    height: 150,
    margin: 20,
  },
  text: {
    fontSize: 40,
    color: '#ffffff',
  },
});
