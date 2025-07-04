import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { UserType } from '../UserContext';
import Entypo from 'react-native-vector-icons/Entypo';

const AddAddressScreen = () => {
  const navigation = useNavigation();
  const [addresses, setAddresses] = useState([]);

  const { userId } = useContext(UserType);

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const res = await axios.get(
          `https://ecommerceapp-zz23.onrender.com/api/v1/address/${userId}`,
        );
        console.log('Address', res.data?.address);
        setAddresses(res.data?.address);
      } catch (error) {
        console.log('Error to get Address', error);
      }
    };

    fetchUserAddress();
  }, []);
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 22 }}>
            Your Addresses
          </Text>

          <Pressable
            onPress={() => {
              navigation.navigate('Add');
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderLeftWidth: 0,
              borderRightWidth: 0,
              borderWidth: 0.6,
              borderColor: 'gray',
              marginVertical: 10,
              paddingVertical: 6,
            }}
          >
            <Text>Add new Address </Text>
            <MaterialIcons name="keyboard-arrow-right" size={30} />
          </Pressable>

          {addresses?.map((item, index) => (
            <Pressable
              key={index}
              style={{
                borderWidth: 0.6,
                borderColor: 'gray',
                padding: 10,
                borderRadius: 10,
                marginVertical: 10,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 18 }}>
                  {item?.name}
                </Text>
                <Entypo
                  style={{ paddingLeft: 10 }}
                  name="location-pin"
                  size={30}
                  color={'red'}
                />
              </View>

              <Text style={{ fontSize: 15 }}>
                #{item?.houseNo} , {item?.landMark}
              </Text>

              <Text style={{ fontSize: 15, color: '#181818' }}>
                {item?.street}
              </Text>

              <Text style={{ fontSize: 15, color: '#181818' }}>
                India, Bangalore
              </Text>

              <Text style={{ fontSize: 15, color: '#181818' }}>
                phone No : {item?.mobileNo}
              </Text>

              <Text style={{ fontSize: 15, color: '#181818' }}>
                Pincode No : {item?.pinCode}
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  marginTop: 7,
                }}
              >
                <Pressable
                  style={{
                    backgroundColor: '#F5F5F5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#D0D0D0',
                  }}
                >
                  <Text>Edit</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: '#F5F5F5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#D0D0D0',
                  }}
                >
                  <Text>Remove</Text>
                </Pressable>

                <Pressable
                  style={{
                    backgroundColor: '#F5F5F5',
                    paddingHorizontal: 10,
                    paddingVertical: 6,
                    borderRadius: 5,
                    borderWidth: 0.9,
                    borderColor: '#D0D0D0',
                  }}
                >
                  <Text>Set as Default</Text>
                </Pressable>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
