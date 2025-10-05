import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../constants/colors';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const activeColor = colors.primary;
  const inactiveColor = '#6c757d';

  const isHomeActive = route.name === "Home";
  const isCartActive = route.name === "CartScreen";

  
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={24} color={isHomeActive ? activeColor : inactiveColor} />
        <Text style={[styles.footerButtonText, { color: isHomeActive ? activeColor : inactiveColor }]} color={isHomeActive ? activeColor : inactiveColor}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.footerButton}
        onPress={() => navigation.navigate('CartScreen')}
      >
        <Icon name="shopping-cart" size={24} color={isCartActive ? activeColor : inactiveColor} />
        <Text style={[styles.footerButtonText, { color: isCartActive ? activeColor : inactiveColor }]}>Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 68,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
  },
  footerButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerButtonText: {
    fontSize: 12,
    color: '#6c757d',
    marginTop: 2,
  },
});

export default Footer;