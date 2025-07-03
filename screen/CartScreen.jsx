import {
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch, useSelector } from 'react-redux';
import {
  decrementQunatity,
  incrementQuantity,
  removeFromCart,
} from '../redux/cartReducer';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const cart = useSelector(state => state.cart.cart);

  const navigation = useNavigation();
  const total = cart
    ?.map(item => item.price * item.quantity)
    .reduce((curr, prev) => curr + prev, 0);
  console.log('Cart Item', cart);
  const dispatch = useDispatch();

  const increaseQuantity = item => {
    dispatch(incrementQuantity(item));
  };

  const decreaseQuantity = item => {
    dispatch(decrementQunatity(item));
  };

  const deleteFormCart = item => {
    dispatch(removeFromCart(item));
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        {/* Search Bar */}
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
            <TextInput
              placeholder="search here..."
              style={{ flex: 1, paddingLeft: 10 }}
            />
          </Pressable>
          <Ionicons
            style={{ paddingLeft: 10 }}
            name="mic-sharp"
            size={30}
            color="black"
          />
        </View>

        {/* Subtotal & Buy Button */}
        <View style={{ padding: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={{ fontWeight: '400', fontSize: 18 }}>SubTotal:</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 22 }}>{total}</Text>
          </View>
          <Text>EMI Details available</Text>
          <Pressable
            onPress={() => navigation.navigate('Confirm')}
            style={{
              backgroundColor: 'orange',
              paddingVertical: 10,
              borderRadius: 10,
              marginVertical: 10,
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              procced to buy ({cart.length}) item
            </Text>
          </Pressable>

          <View
            style={{
              height: 1,
              borderWidth: 1,
              borderColor: '#ccc',
              marginVertical: 10,
            }}
          />
        </View>

        {/* Cart Items */}
        <View style={{ paddingHorizontal: 10 }}>
          {cart?.map(item => (
            <Pressable key={item.id}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    padding: 10,
                    marginHorizontal: 10,
                  }}
                >
                  <View>
                    <Image
                      style={{
                        width: 150,
                        height: 150,
                        resizeMode: 'contain',
                      }}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <View style={{ flex: 1, paddingLeft: 10 }}>
                    <Text numberOfLines={3}>{item?.title}</Text>
                    <Text style={{ fontWeight: 'bold', marginTop: 5 }}>
                      ₹{item?.price}
                    </Text>
                    <Image
                      style={{ width: 30, height: 30, resizeMode: 'contain' }}
                      source={{
                        uri: 'https://assets.stickpng.com/thumbs/5f4924cc68ecc70004ae7065.png',
                      }}
                    />
                    <Text style={{ color: 'green' }}>In Stock</Text>
                  </View>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 20,
                    marginVertical: 10,
                  }}
                >
                  {item.quantity > 1 ? (
                    <Pressable
                      onPress={() => decreaseQuantity(item)}
                      style={{
                        backgroundColor: '#E0E0E0',
                        padding: 6,
                        borderRadius: 5,
                      }}
                    >
                      <AntDesign name="minus" size={20} color="black" />
                    </Pressable>
                  ) : (
                    <Pressable
                      onPress={() => deleteFormCart(item)}
                      style={{
                        backgroundColor: '#E0E0E0',
                        padding: 6,
                        borderRadius: 5,
                      }}
                    >
                      <AntDesign name="delete" size={20} color="black" />
                    </Pressable>
                  )}

                  <Text style={{ fontSize: 18, fontWeight: '600' }}>
                    {item?.quantity}
                  </Text>

                  <Pressable
                    onPress={() => increaseQuantity(item)}
                    style={{
                      backgroundColor: '#E0E0E0',
                      padding: 6,
                      borderRadius: 5,
                    }}
                  >
                    <Entypo name="plus" size={20} color="black" />
                  </Pressable>

                  <Pressable
                    onPress={() => deleteFormCart(item)}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>Delete</Text>
                  </Pressable>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 15,
                    marginBottom: 10,
                  }}
                >
                  <Pressable
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>Save for later</Text>
                  </Pressable>

                  <Pressable
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 5,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                    }}
                  >
                    <Text style={{ fontSize: 14 }}>See more like this</Text>
                  </Pressable>
                </View>
              </View>
              <View
                style={{
                  height: 1,
                  borderWidth: 0.4,
                  borderColor: '#ccc',

                  marginVertical: 10,
                }}
              />
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CartScreen;
