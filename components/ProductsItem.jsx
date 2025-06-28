import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';

const ProductsItem = ({ item }) => {
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
        style={{
          alignItems: 'center',
          marginTop: 15,
          backgroundColor: '#FFC72C',
          paddingVertical: 8,
          borderRadius: 20,
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Add to cart</Text>
      </Pressable>
    </Pressable>
  );
};

export default ProductsItem;

const styles = StyleSheet.create({});
