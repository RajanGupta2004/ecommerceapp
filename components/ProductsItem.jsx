import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartReducer';

const ProductsItem = ({ item }) => {
  const dispatch = useDispatch();
  const [addedToCart, setAddedToCart] = useState(false);

  const AddToCartProduct = item => {
    setAddedToCart(true);

    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 6000);
  };
  return (
    <Pressable
      style={{
        marginHorizontal: 10,
        marginVertical: 10,
      }}
    >
      <Image
        style={{ width: 150, height: 150, resizeMode: 'contain' }}
        source={{ uri: item.image }}
      />
      <Text numberOfLines={1} style={{ marginTop: 10, width: 150 }}>
        {item.title}
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 10,
          //   gap: 20,
        }}
      >
        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
          ₹ {item?.price}
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#FFC72C' }}>
          {item?.rating?.rate} rating
        </Text>
      </View>
      <Pressable
        onPress={() => AddToCartProduct(item)}
        style={{
          alignItems: 'center',
          marginTop: 15,
          backgroundColor: '#FFC72C',
          paddingVertical: 8,
          borderRadius: 20,
        }}
      >
        {addedToCart ? (
          <Text style={{ fontWeight: 'bold' }}>Added to cart</Text>
        ) : (
          <Text style={{ fontWeight: 'bold' }}>Add to cart</Text>
        )}
      </Pressable>
    </Pressable>
  );
};

export default ProductsItem;

const styles = StyleSheet.create({});
