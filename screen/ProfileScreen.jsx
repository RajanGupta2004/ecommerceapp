import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { UserType } from '../UserContext';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState();

  console.log(user, orders);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: '',
      headerStyle: {
        backgroundColor: '#00CED1',
      },
      headerLeft: () => (
        <Image
          style={{ width: 140, height: 120, resizeMode: 'contain' }}
          source={{
            uri: 'https://assets.stickpng.com/thumbs/580b57fcd9996e24bc43c518.png',
          }}
        />
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            marginRight: 12,
          }}
        >
          <Ionicons name="notifications-outline" size={24} color="black" />

          <AntDesign name="search1" size={24} color="black" />
        </View>
      ),
    });
  }, []);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await axios.get(
  //         `http://192.168.224.29:8000/api/v1/user/${userId}`,
  //       );
  //       const { user } = response.data;
  //       setUser(user);
  //     } catch (error) {
  //       console.log('error', error);
  //     }
  //   };

  //   fetchUserProfile();
  // }, []);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          `http://192.168.224.29:8000/api/v1/order/${userId}`,
        );
        const orders = response.data.orders;
        setOrders(orders);

        setLoading(false);
      } catch (error) {
        console.log('error', error);
      }
    };

    fetchOrders();
  }, []);

  const logout = async () => {
    await AsyncStorage.removeItem('authToken');
    setUserId('');
    navigation.replace('Login');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View style={{ padding: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
          Welcome Rajan Gupta
        </Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 12,
          }}
        >
          <Pressable
            style={{
              padding: 10,
              backgroundColor: '#E0E0E0',
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: 'center' }}>Your orders</Text>
          </Pressable>

          <Pressable
            style={{
              padding: 10,
              backgroundColor: '#E0E0E0',
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: 'center' }}>Your Account</Text>
          </Pressable>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            marginTop: 12,
          }}
        >
          <Pressable
            style={{
              padding: 10,
              backgroundColor: '#E0E0E0',
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: 'center' }}>Buy Again</Text>
          </Pressable>

          <Pressable
            onPress={() => logout()}
            style={{
              padding: 10,
              backgroundColor: '#E0E0E0',
              borderRadius: 25,
              flex: 1,
            }}
          >
            <Text style={{ textAlign: 'center' }}>Logout</Text>
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {loading ? (
            <Text style={{ padding: 20, fontSize: 16 }}>Loading orders...</Text>
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {orders.length === 0 ? (
                <View style={{ padding: 20 }}>
                  <Text style={{ fontSize: 16, color: 'gray' }}>
                    No orders found
                  </Text>
                </View>
              ) : (
                orders.map((order, index) =>
                  order.products.map((item, i) => (
                    <Pressable
                      key={`${index}-${i}`}
                      style={{
                        marginRight: 10,
                        marginVertical: 20,
                        borderWidth: 1,
                        padding: 10,
                        borderColor: '#E0E0E0',
                        borderRadius: 10,
                      }}
                    >
                      <Image
                        style={{
                          width: 150,
                          height: 150,
                          resizeMode: 'contain',
                        }}
                        source={{ uri: item?.image }}
                      />
                    </Pressable>
                  )),
                )
              )}
            </ScrollView>
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({});
