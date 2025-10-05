import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { colors } from '../constants/colors';

const Footer = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const activeColor = '#fff';
  const activeBackgroundColor = colors.primary;
  const inactiveColor = '#fff';
  const inactiveBackgroundColor = '#6c757d';

  const isHomeActive = route.name === "Home";
  const isCartActive = route.name === "CartScreen";

  
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={[styles.footerButton, {
            backgroundColor: isHomeActive
              ? activeBackgroundColor
              : inactiveBackgroundColor,
          },
        ]} 
          onPress={() => navigation.navigate('Home')}>
        <Icon name="home" size={24} color = '#fff'/>
        <Text style={styles.footerButtonText} color={isHomeActive ? activeColor : inactiveColor}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
                style={[
          styles.footerButton,
          {
            backgroundColor: isCartActive
              ? activeBackgroundColor
              : inactiveBackgroundColor,
          },
        ]}
        onPress={() => navigation.navigate('CartScreen')}
      >
        <Icon name="shopping-cart" size={24} color = '#fff'/>
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
    height: 80,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    elevation: 8,
    padding: 8,
    gap: 10
  },

  footerButton: {
    color: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 200,
  },
  footerButtonText: {
    fontSize: 12,
    color: '#fff',
    marginTop: 2,
  },
});

export default Footer;