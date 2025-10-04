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
// import { AppDispatch, RootState } from '../../store/store';
import { useNavigation } from '@react-navigation/native';
import { signOut } from '../../store/slices/authSlice';
import { fetchCartProducts } from '../../store/slices/productSlice';
import { colors } from '../../constants/colors';
// import { Image } from 'react-native/types_generated/index';

const CartScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { items: cartProducts, status, error } = useSelector((state) => state.cartProducts);

  // 1. TRIGGER THE FETCH
  // This hook runs when the component mounts.
  useEffect(() => {
    // We check the status to avoid re-fetching data unnecessarily.
    if (status === 'idle') {
      dispatch(fetchCartProducts());
    }
  }, [status, dispatch]);

  // This function decides what to show based on the loading status
  const renderContent = () => {
    if (status === 'loading') {
      return <ActivityIndicator size="large" color={colors.primary} />;
    }

    if (status === 'failed') {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    // 3. DISPLAY THE DATA
    // When status is 'succeeded', we display the product list.
    return (
      <FlatList
        data={cartProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.productCard}>
            {/* <Text style={styles.productName}>{item.name}</Text> */}
            <Text style={styles.productPrice}>₹ {item.price.toFixed(2)}</Text>
            <Text style={styles.productPrice }>Quantity: {item.quantity}</Text>
            <Image style={styles.productImg} source={{uri: item.mainImageUrl}}/>
          </View>
        )}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>Welcome to Shopperzz!</Text>
            <Text style={styles.subtitle}>Cart - Products (CartScreen)</Text>
          </>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
         <Button title="Sign Out" onPress={() => dispatch(signOut())} color={colors.primary} />
         <Button title='Products' onPress={() => navigation.navigate('ProductList')} color={colors.primary}/>
         <Button title='Cart' onPress={() => navigation.navigate('CartScreen')} color={colors.primary}/>
   
      </View>
      <View style={styles.content}>
        {renderContent()}
      </View>

      {/* --- DEBUGGING SECTION TO "PRINT" THE DATA --- */}
      {/* {status === 'succeeded' && (
        <View style={styles.debugContainer}>
          <Text style={styles.debugTitle}>Raw Response Data:</Text>
          <ScrollView style={styles.debugScrollView}>
             <Text style={styles.debugText}>
                {JSON.stringify(products, null, 2)}
             </Text>
          </ScrollView>
        </View>
      )} */}
      {/* --- END DEBUGGING SECTION --- */}

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 10,
    alignItems: 'flex-end',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  content: {
    flex: 1, // Takes up the main space
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
    padding: 16,
    marginBottom: 12,
    borderRadius: 8,
    elevation: 2,
  },
  productName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  productPrice: {
    fontSize: 16,
    color: colors.primary,
    marginTop: 4,
  },
  productImg: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    marginTop: 12,
    resizeMode: 'contain',
  },
  // Styles for the debug view
  debugContainer: {
    flex: 0.5, // Takes up the bottom half of the screen
    padding: 10,
    backgroundColor: '#282c34',
    borderTopWidth: 2,
    borderTopColor: '#444',
  },
  debugTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  debugScrollView: {
    flex: 1,
  },
  debugText: {
    color: '#61dafb',
    fontFamily: 'monospace', // Use a monospace font for JSON
  },
});

export default CartScreen;

