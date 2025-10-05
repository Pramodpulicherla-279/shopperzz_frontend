import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  TouchableOpacity, // Import ScrollView
  TextInput,
  LayoutAnimation,
  Platform,
  UIManager,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productSlice';

// Enable LayoutAnimation for Android
if (
  Platform.OS === 'android' &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const Header = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.auth);
  const { items: products, status } = useSelector(state => state.products);
  const [isSearchActive, setSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  useEffect(() => {
    // Log the products array to ensure it has data
    console.log('Products available for filtering:', products);

    if (searchQuery.trim() === '' || !products) {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter(
        product =>
          product.name &&
          product.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );
      console.log('Filtered products result:', filtered);
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const toggleSearch = () => {
    // Animate the layout change
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchQuery(''); // Clear search query when closing
    }
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      // Navigate to a search results screen with the query
      navigation.navigate('ProductList', { searchQuery: searchQuery.trim() });
      toggleSearch(); // Collapse the search bar after searching
    }
  };

  const handleProductPress = product => {
    navigation.navigate('ProductDetail', { productId: product.id });
    toggleSearch();
  };
  return (
    <View style={styles.headerContainer}>
      <View style={styles.header}>
        {isSearchActive ? (
          <>
            <TouchableOpacity onPress={toggleSearch}>
              <Icon name="arrow-left" style={styles.headerIcons} size={24} color="#333" />
            </TouchableOpacity>
            <TextInput
              style={styles.searchInput}
              placeholder="Search products..."
              placeholderTextColor="#333"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
              returnKeyType="search"
              onSubmitEditing={handleSearchSubmit}
            />
          </>
        ) : (
          <>
            <TouchableOpacity style={styles.headerIcons} onPress={() => navigation.openDrawer()}>
              <Icon name="menu" size={28} color="#333" />
            </TouchableOpacity>
            <View style={styles.headerRight}>
              <TouchableOpacity style={styles.headerIcons} onPress={toggleSearch}>
                <Icon name="search" size={24} color="#333" />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Profile')}
                style={styles.avatarContainer}
              >
                {user?.avatarUrl ? (
                  <Image
                    source={{ uri: user.avatarUrl }}
                    style={styles.avatar}
                  />
                ) : (
                  <Icon name="user" size={24} color="#333" />
                )}
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
      {isSearchActive && searchQuery.trim().length > 0 && (
        <View style={styles.searchResultsContainer}>
          {status === 'loading' ? (
            <ActivityIndicator style={{ padding: 20 }} />
          ) : filteredProducts.length > 0 ? (
            <FlatList
              data={filteredProducts}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.searchResultItem}
                  onPress={() => handleProductPress(item)}
                >
                  <Text>{item.name}</Text>
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={styles.searchResultItem}>
              <Text>No products found</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 20,
    // paddingVertical: 16,
    alignItems: 'center',
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
    // backgroundColor: '#f8f9fa',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    // marginLeft: 20,
    backgroundColor: '#00000020',
    padding: 12,
    marginVertical: 10,
    borderRadius: 20,
    marginRight: 16,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  headerIcons: {
    backgroundColor: '#00000020',
    padding: 12,
    marginVertical: 10,
    borderRadius: 20,
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    marginRight: 16,
    marginVertical: 12,
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderColor: '#333',
    borderWidth: 1.5,
    borderRadius: 20,
        backgroundColor: '#00000020',

  },
    searchResultsContainer: {
    position: 'absolute',
    top: 72, // Adjust this based on your header height
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
    marginHorizontal: 8,
    maxHeight: 480,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    zIndex:1000,
  },
  searchResultItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
});

export default Header;
