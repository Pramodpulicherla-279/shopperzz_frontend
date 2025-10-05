import React, { useEffect, useState, useRef } from 'react';
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
  Dimensions,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import { AppDispatch, RootState } from '../../store/store';
import { useNavigation } from '@react-navigation/native';
import { signOut } from '../../store/slices/authSlice';
import { fetchDemandedProducts } from '../../store/slices/productSlice';
import { colors } from '../../constants/colors';
import Icon from 'react-native-vector-icons/Feather';
import Footer from '../../components/footer';
import Header from '../../components/header';
// import { Image } from 'react-native/types_generated/index';

const { width } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const { user } = useSelector(state => state.auth);
  // --- Add this console.log to inspect the user object ---
  console.log('User object from Redux store:', JSON.stringify(user, null, 2));
  const {
    items: demandedProducts,
    status,
    error,
  } = useSelector(state => state.demandedProducts);

  const [activeIndex, setActiveIndex] = useState(0);
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // 1. TRIGGER THE FETCH
  // This hook runs when the component mounts.
  useEffect(() => {
    // We check the status to avoid re-fetching data unnecessarily.
    if (status === 'idle') {
      dispatch(fetchDemandedProducts());
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
      <>
        <View style={styles.titleContainer}>
          <Icon name="user" size={18} color="#000" style={styles.userIcon} />
          <Text style={styles.titleText}>Welcome {user.name || 'User'}</Text>
        </View>{' '}
        {/* {user && (
          <Text style={styles.username}>Hi, {user.name || user.username || 'User'}</Text>         
        )} */}
        {/* <Text style={styles.subtitle}>Demanded Products</Text> */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={demandedProducts}
            keyExtractor={item => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.productCard}
                onPress={() =>
                  navigation.navigate('ProductOverview', { product: item })
                }
              >
                <Image
                  style={styles.productImg}
                  source={{ uri: item.mainImageUrl }}
                />
                <View style={styles.productDetails}>
                  <Text style={styles.productName} numberOfLines={2}>
                    {item.name.length > 20
                      ? `${item.name.substring(0, 20)}...`
                      : item.name}
                  </Text>
                  <Text style={styles.productPrice}>
                    ₹ {item.price.toFixed(2)}
                  </Text>
                </View>
              </TouchableOpacity>
            )}
          />
          <View style={styles.pagination}>
            {demandedProducts.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.dot,
                  activeIndex === index ? styles.activeDot : {},
                ]}
              />
            ))}
          </View>
        </View>
      </>
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
    backgroundColor: '#f1f6f6ff',
    paddingBottom: 70,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#f8f9fa',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    marginLeft: 20,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  content: {
    flex: 1, // Takes up the main space
    // paddingHorizontal: 20,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginVertical: 6,
    borderRadius: 500,
    backgroundColor: '#00000020',
    padding: 12,
    paddingRight: 20,
    alignSelf: 'flex-start',
  },
  userIcon: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 200,
    marginRight: 8,
  },
  titleText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  // title: {
  //   fontSize: 24,
  //   fontWeight: 'bold',
  //   marginHorizontal: 16,
  //   marginVertical: 6,
  //   borderRadius: 500,
  //   color: '#000',
  //   backgroundColor: '#d4a373',
  //   paddingVertical: 20,
  //   paddingHorizontal: 12,
  // },
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
    width: width - 40, // Card width with horizontal padding
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productDetails: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 8,
  },
  productImg: {
    width: '40%',
    height: 150,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  carouselContainer: {
    height: 240, // Adjust height as needed
    marginBottom: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    position: 'relative',
  },
  pagination: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
    marginBottom: 10,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
});

export default HomeScreen;
