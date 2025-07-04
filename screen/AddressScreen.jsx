import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { UserType } from '../UserContext';
import { useNavigation } from '@react-navigation/native';

const AddressScreen = () => {
  const [name, setName] = useState();
  const [mobileNo, setMobileNo] = useState();
  const [houseNo, setHouseNo] = useState();
  const [street, setStreet] = useState();
  const [landMark, setLandMark] = useState();
  const [postalCode, setpostalCode] = useState();
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);

  useEffect(() => {
    const fetchUserId = async () => {
      const token = await AsyncStorage.getItem('authToken');
      const decoded = jwtDecode(token);
      setUserId(decoded.userId);
      console.log(decoded);
    };

    fetchUserId();
  }, []);

  console.log('userId', userId);
  const handleAddAddress = async () => {
    try {
      Alert.alert('Try to login');
      const address = {
        name,
        mobileNo,
        houseNo,
        street,
        landMark,
        postalCode,
      };
      const res = await axios.post(
        'https://ecommerceapp-zz23.onrender.com/api/v1/address',
        {
          userId,
          address,
        },
      );

      setName('');
      setMobileNo('');
      setHouseNo('');
      setStreet('');
      setLandMark('');
      setPincode('');

      setTimeout(() => {
        navigation.goBack();
      }, 1000);

      console.log('res', res);
      Alert.alert('Address added successfully...');
    } catch (error) {
      console.log('Error to add address', error);
      Alert.alert('Error occur while add address');
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View
          style={{ width: '100%', height: 50, backgroundColor: '#00CDE1' }}
        />
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>
            Add new Address
          </Text>

          <TextInput
            placeholderTextColor={'black'}
            placeholder="India"
            style={{
              padding: 10,
              borderWidth: 0.7,
              borderColor: 'gray',
              marginVertical: 5,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
            Full Name (first Name and last Name)
          </Text>

          <TextInput
            value={name}
            onChangeText={text => setName(text)}
            placeholder="Enter your name..."
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderWidth: 0.7,
              borderColor: 'gray',
              marginVertical: 5,
            }}
          />
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Mobile No</Text>

          <TextInput
            value={mobileNo}
            onChangeText={text => setMobileNo(text)}
            placeholder="Mobile No..."
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderWidth: 0.7,
              borderColor: 'gray',
              marginVertical: 5,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
            Flat No, House No , Building , Company
          </Text>

          <TextInput
            value={houseNo}
            onChangeText={text => setHouseNo(text)}
            placeholder=""
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderWidth: 0.7,
              borderColor: 'gray',
              marginVertical: 5,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>
            Area , Street , Sector , Village
          </Text>

          <TextInput
            value={street}
            onChangeText={text => setStreet(text)}
            placeholder=""
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderWidth: 0.7,
              borderColor: 'gray',
              marginVertical: 5,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>LandMark</Text>

          <TextInput
            value={landMark}
            onChangeText={text => setLandMark(text)}
            placeholder="eg: near Applo hospital..."
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderWidth: 0.7,
              borderColor: 'gray',
              marginVertical: 5,
              borderRadius: 5,
            }}
          />
        </View>

        <View style={{ padding: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 17 }}>Pincode</Text>

          <TextInput
            value={postalCode}
            onChangeText={text => setpostalCode(text)}
            placeholder="Enter your pincode..."
            placeholderTextColor={'black'}
            style={{
              padding: 10,
              borderWidth: 0.7,
              borderColor: 'gray',
              marginVertical: 5,
              borderRadius: 5,
            }}
          />
        </View>

        <Pressable
          onPress={handleAddAddress}
          style={{
            padding: 19,
            backgroundColor: 'orange',
            justifyContent: 'center',
            alignItems: 'center',
            marginHorizontal: 10,
            borderRadius: 10,
          }}
        >
          <Text style={{ fontWeight: 'bold', fontSize: 19 }}>Add Address</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddressScreen;

const styles = StyleSheet.create({});
