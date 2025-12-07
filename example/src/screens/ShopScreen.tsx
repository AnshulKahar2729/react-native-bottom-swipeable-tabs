import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export const ShopScreen: React.FC = () => {
  const products = Array.from({ length: 12 }, (_, i) => i);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Shop</Text>
        <Icon name="cart-outline" size={26} color="#000" />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.shopGrid}>
          {products.map((_, index) => (
            <View key={index} style={styles.productCard}>
              <View style={styles.productImage} />
              <View style={styles.productInfo}>
                <Text style={styles.productName}>Product {index + 1}</Text>
                <Text style={styles.productPrice}>${(index + 1) * 10}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#dbdbdb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
  },
  shopGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
  },
  productCard: {
    width: '50%',
    padding: 8,
  },
  productImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#dbdbdb',
    borderRadius: 8,
    marginBottom: 8,
  },
  productInfo: {
    paddingHorizontal: 4,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: '#0095f6',
    fontWeight: '600',
  },
});