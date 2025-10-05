import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useRoute } from '@react-navigation/native';
import { fetchProducts } from '../../store/slices/productSlice';
import  Header  from '../../components/header'
import  Footer  from '../../components/footer'
import { colors } from '../../constants/colors';

const ProductList = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();
  const {
    items: products,
    status,
    error,
  } = useSelector(state => state.products);

  const searchQuery = route.params?.searchQuery;
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    if (searchQuery && products.length > 0) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      setFilteredProducts(filtered);
    } else {
      setFilteredProducts(products);
    }
  }, [searchQuery, products]);

  const renderContent = () => {
    if (status === 'loading') {
      return <ActivityIndicator size="large" color={colors.primary} />;
    }

    if (status === 'failed') {
      return <Text style={styles.errorText}>Error: {error}</Text>;
    }

    if (filteredProducts.length === 0 && status === 'succeeded') {
      return <Text style={styles.errorText}>No products found.</Text>;
    }

    return (
      <FlatList
        data={filteredProducts}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          // This TouchableOpacity handles the navigation
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('ProductOverview', { product: item })
            }
          >
            <View style={styles.productCard}>
              <Image
                style={styles.productImg}
                source={{ uri: item.mainImageUrl }}
              />
              <Text style={styles.productName} numberOfLines={2}>
                {item.name}
              </Text>
              <Text style={styles.productPrice}>₹ {item.price.toFixed(2)}</Text>
            </View>
          </TouchableOpacity>
        )}
        ListHeaderComponent={
          <>
            <Text style={styles.title}>{searchQuery ? `Results for "${searchQuery}"` : 'All Products'}</Text>
          </>
        }
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header/>
      <View style={styles.content}>{renderContent()}</View>
      <Footer/>
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
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000',
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
  productImg: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 12,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 4,
  },
});

export default ProductList;
