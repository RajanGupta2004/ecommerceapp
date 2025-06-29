import {
  Dimensions,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartReducer';

const ProductInfoScreen = () => {
  const route = useRoute();
  const [addedToCart, setAddedToCart] = useState(false);
  const { width } = Dimensions.get('window');
  const height = (width * 100) / 100;

  const dispatch = useDispatch();

  const addToCartProducts = item => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 6000);
  };

  const cart = useSelector(state => state.cart.cart);
  console.log('Cart', cart);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View
          style={{
            backgroundColor: '#00CDE1',
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <Pressable
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: 10,
              flex: 1,
              backgroundColor: 'white',
            }}
          >
            <Feather
              style={{ paddingLeft: 10 }}
              name="search"
              size={30}
              color="black"
            />
            <TextInput placeholder="search here..." />
          </Pressable>
          <Ionicons
            style={{ paddingLeft: 10 }}
            name="mic-sharp"
            size={30}
            color="black"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {route.params?.carouselImages.map(item => (
            <ImageBackground
              key={item.id}
              style={{ width, height }}
              source={{ uri: item }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 15,
                  marginVertical: 10,
                }}
              >
                <View
                  style={{
                    backgroundColor: 'red',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    height: 50,
                    borderRadius: 100,
                    padding: 10,
                    alignContent: 'center',
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      textAlign: 'center',
                      fontSize: 12,
                      fontWeight: 'bold',
                    }}
                  >
                    30% off
                  </Text>
                </View>

                <View
                  style={{
                    backgroundColor: '#E0E0E0',
                    padding: 10,
                    borderRadius: 100,
                  }}
                >
                  <Entypo name="share" size={30} color="black" />
                </View>
              </View>

              <View
                style={{
                  marginTop: 'auto',
                  marginHorizontal: 15,
                  backgroundColor: '#E0E0E0',
                  width: 50,
                  height: 50,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Entypo name="heart-outlined" size={30} color="black" />
              </View>
            </ImageBackground>
          ))}
        </ScrollView>

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 16, fontWeight: '500' }}>
            {route.params?.title}
          </Text>
          <Text style={{ marginTop: 10, fontWeight: 'bold', fontSize: 18 }}>
            ₹ {route.params?.price}
          </Text>
        </View>
        <Text
          style={{
            height: 1,
            borderWidth: 0.6,
            borderColor: 'gray',
            marginTop: 5,
          }}
        />

        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}> color :</Text>
          <Text style={{ fontSize: 17, fontWeight: '500' }}>
            {route.params.color}
          </Text>
        </View>

        <View
          style={{
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <Text style={{ fontSize: 18 }}> size:</Text>
          <Text style={{ fontSize: 17, fontWeight: '500' }}>
            {route.params?.size}
          </Text>
        </View>

        <Text
          style={{
            height: 1,
            borderWidth: 0.6,
            borderColor: 'gray',
            marginVertical: 5,
          }}
        />

        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 17, fontWeight: 'bold' }}>
            Total: {route?.params?.price}
          </Text>

          <Text style={{ color: '#00CED1', marginVertical: 5 }}>
            FREE delivery Tomorrow by 3 PM.Order within 10hrs 30 mins
          </Text>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
            }}
          >
            <Ionicons name="location" size={24} color="black" />

            <Text style={{ fontSize: 15, fontWeight: '500' }}>
              Deliver To Sujan - Bangalore 560019
            </Text>
          </View>

          <Text
            style={{
              fontSize: 17,
              color: 'green',
              fontWeight: '500',
              marginTop: 10,
            }}
          >
            IN Stocks
          </Text>

          <Pressable
            onPress={() => addToCartProducts(route?.params?.item)}
            style={{
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: '#FFC72C',
              alignItems: 'center',
              marginVertical: 10,
            }}
          >
            {addedToCart ? (
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                Added To Cart
              </Text>
            ) : (
              <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
                Add to Cart
              </Text>
            )}
          </Pressable>

          <Pressable
            style={{
              paddingVertical: 8,
              borderRadius: 20,
              backgroundColor: '#FFC72C',
              alignItems: 'center',
              marginVertical: 10,
            }}
          >
            <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Buy Now</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductInfoScreen;

const styles = StyleSheet.create({});
