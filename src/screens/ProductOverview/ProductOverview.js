import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  FlatList,
  Dimensions,
  Modal,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import RenderHTML from 'react-native-render-html';
import { colors } from '../../constants/colors';

const { width, height } = Dimensions.get('window');

// Dummy data for testing purposes
const dummyProduct = {
  id: 999,
  name: 'Dummy Product: High-Quality Wireless Headphones',
  price: 2499.99,
  description:
    'This is a detailed description for a dummy product. It features noise cancellation, a 20-hour battery life, and comes in a sleek, modern design. Perfect for music lovers and professionals on the go.',
  mainImageUrl: 'https://via.placeholder.com/300', // A placeholder image URL
  imageUrls: [
    'https://via.placeholder.com/400x300/007bff/ffffff?text=Image+1',
    'https://via.placeholder.com/400x300/6c757d/ffffff?text=Image+2',
    'https://via.placeholder.com/400x300/28a745/ffffff?text=Image+3',
  ],
};

const ProductOverviewScreen = () => {
  const route = useRoute();
  // Use dummy data as a fallback if no product is passed via navigation
  const { product = dummyProduct } = route.params || {};

  const [quantity, setQuantity] = useState(1);
  const [activeIndex, setActiveIndex] = useState(0);
  // Add state for modal visibility and selected image
  const [isModalVisible, setModalVisible] = useState(false);
  //   const [selectedImage, setSelectedImage] = useState(null);
  const [initialImageIndex, setInitialImageIndex] = useState(0);

  // This ref helps determine which image is currently visible in the carousel
  const onViewRef = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveIndex(viewableItems[0].index);
    }
  });
  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });

  // Functions to handle opening and closing the modal
  const openImageModal = index => {
    setInitialImageIndex(index);
    setModalVisible(true);
  };

  const closeImageModal = () => {
    setModalVisible(false);
  };

  const handleAddToCart = () => {
    Alert.alert('Added to Cart', `${quantity} x "${product.name}"`);
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () =>
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const allImages =
    product.imageUrls && product.imageUrls.length > 0
      ? product.imageUrls
      : [product.mainImageUrl];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {/* Image Carousel */}
        <View style={styles.carouselContainer}>
          <FlatList
            data={
              product.imageUrls && product.imageUrls.length > 0
                ? product.imageUrls
                : [product.mainImageUrl]
            }
            renderItem={({ item, index }) => (
              <TouchableOpacity onPress={() => openImageModal(index)}>
                <Image source={{ uri: item }} style={styles.image} />
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
          {/* Pagination Dots */}
          <View style={styles.pagination}>
            {product.imageUrls &&
              product.imageUrls.length > 1 &&
              product.imageUrls.map((_, index) => (
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

        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.price}>₹ {product.price.toFixed(2)}</Text>
          <View style={styles.divider} />
          <Text style={styles.descriptionTitle}>Description</Text>
          <RenderHTML
            contentWidth={width}
            source={{ html: product.description || '' }}
            tagsStyles={tagsStyles}
          />        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={decrementQuantity}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.quantity}>{quantity}</Text>
          <TouchableOpacity
            onPress={incrementQuantity}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.addToCartButton}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>

      {/* 5. Add the Modal component */}
      <Modal
        visible={isModalVisible}
        transparent={false}
        animationType="fade"
        onRequestClose={closeImageModal}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={closeImageModal}
          >
            <Text style={styles.closeButtonText}>←</Text>
          </TouchableOpacity>
          <FlatList
            data={allImages}
            renderItem={({ item }) => (
              <View style={styles.fullscreenImageContainer}>
                <Image
                  source={{ uri: item }}
                  style={styles.fullscreenImage}
                  resizeMode="contain"
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            initialScrollIndex={initialImageIndex}
            getItemLayout={(data, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const tagsStyles = {
  body: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  p: {
    marginTop: 0,
    marginBottom: 10,
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  carouselContainer: {
    height: 300,
    backgroundColor: '#f8f9fa',
  },
  image: {
    width: width,
    height: 300,
    resizeMode: 'contain',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#C4C4C4',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: colors.primary,
  },
  detailsContainer: {
    padding: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    fontSize: 22,
    color: colors.primary,
    marginTop: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginTop: 8,
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  quantityButton: {
    width: 40,
    height: 40,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  quantity: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 15,
  },
  addToCartButton: {
    flex: 1,
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addToCartButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Styles for the modal
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  fullscreenImageContainer: {
    width: width,
    height: height,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 20,
    padding: 10,
    backgroundColor: '#333',
    borderRadius: 100,
    fontWeight: 'bold',
  },
});

export default ProductOverviewScreen;
