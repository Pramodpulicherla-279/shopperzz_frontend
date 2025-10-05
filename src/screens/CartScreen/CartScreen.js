import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  ScrollView, // Import ScrollView
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
// import { AppDispatch, RootState } from '../../store/store';
import { useNavigation } from '@react-navigation/native';
import { signOut } from '../../store/slices/authSlice';
import { fetchCartProducts } from '../../store/slices/productSlice';
import { colors } from '../../constants/colors';
import Header from '../../components/header';
import Footer from '../../components/footer';
// import { Image } from 'react-native/types_generated/index';

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {
    items: cartProducts,
    status,
    error,
  } = useSelector(state => state.cartProducts);

  // Use useFocusEffect to fetch data every time the screen is focused.
  // This is more reliable than useEffect for data that needs to be fresh.
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchCartProducts());
    }, [dispatch]),
  );

  const renderItem = ({ item }) => (
    <View style={styles.productCard}>
      <Image style={styles.productImg} source={{ uri: item.mainImageUrl }} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>
          {item.name.length > 50
            ? `${item.name.substring(0, 60)}...`
            : item.name}
        </Text>
        <Text style={styles.productPrice}>₹ {item.price.toFixed(2)}</Text>
        <Text style={styles.productQuantity}>Quantity: {item.quantity}</Text>
      </View>
    </View>
  );

  // This function decides what to show based on the loading status
  const renderContent = () => {
    if (status === 'loading') {
      return <ActivityIndicator size="large" color={colors.primary} />;
    }

    if (status === 'failed') {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    if (status !== 'loading' && cartProducts.length === 0) {
      return <Text style={styles.emptyText}>Your cart is empty.</Text>;
    }

    // 3. DISPLAY THE DATA
    // When status is 'succeeded', we display the product list.
    return (
      <View>
        <FlatList
          data={cartProducts}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          ListHeaderComponent={<Text style={styles.title}>Your Cart</Text>}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <View style={styles.content}>{renderContent()}</View>
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingBottom:70
  },
  content: {
    // flex: 1, // Takes up the main space
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
  },
  subtitle: {
    fontSize: 22,
    color: '#6c757d',
    marginBottom: 20,
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  productCard: {
    backgroundColor: '#fff',
    padding: 12,
    marginBottom: 12,
    borderRadius: 16,
    // borderBottomWidth: 6,
    // borderBottomColor: '#333',
    flexDirection: 'row',
    overflow: 'hidden',
    alignItems: 'center',
  },
  productDetails: {
    flex: 1,
    padding: 12,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  productPrice: {
    fontSize: 14,
    color: colors.primary,
    marginTop: 4,
  },
  productImg: {
    width: 100,
    height: 100,
    borderRadius: 8,
    // marginTop: 12,
    resizeMode: 'contain',
  },
  productQuantity: {
    // fontWeight: 'bold',
  },
});

export default CartScreen;
