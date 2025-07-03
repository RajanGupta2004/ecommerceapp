import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UserType } from '../UserContext';
import axios from 'axios';
import Entypo from 'react-native-vector-icons/Entypo';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ConfirmnationScreen = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [options, setOptions] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState('');
  const { userId } = useContext(UserType);
  const steps = [
    { title: 'Address', content: 'Address Form' },
    { title: 'Delivery', content: 'Delivery Options' },
    { title: 'Payment', content: 'Payment Details' },
    { title: 'Place Order', content: 'Order Summary' },
  ];

  useEffect(() => {
    const fetchUserAddress = async () => {
      try {
        const res = await axios.get(
          `http://192.168.224.29:8000/api/v1/address/${userId}`,
        );
        console.log('Address', res.data?.address);
        setAddresses(res.data?.address);
      } catch (error) {
        console.log('Error to get Address', error);
      }
    };

    fetchUserAddress();
  }, []);

  console.log('Confirm Address', addresses);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <ScrollView>
        <View style={{ flex: 1, paddingHorizontal: 20, paddingVertical: 20 }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-between' }}
          >
            {steps?.map((step, index) => (
              <View
                key={index}
                style={{ justifyContent: 'center', alignItems: 'center' }}
              >
                {index > 0 && (
                  <View
                    style={[
                      { flex: 1, height: 2, backgroundColor: 'green' },
                      index <= currentStep && { backgroundColor: 'green' },
                    ]}
                  />
                )}

                <View
                  style={[
                    {
                      width: 30,
                      height: 30,
                      borderRadius: 100,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#ccc',
                    },
                    index < currentStep && { backgroundColor: 'green' },
                  ]}
                >
                  {index < currentStep ? (
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                      &#10003;
                    </Text>
                  ) : (
                    <Text style={{ fontWeight: 'bold', color: 'white' }}>
                      {index + 1}
                    </Text>
                  )}
                </View>
                <Text>{step.title}</Text>
              </View>
            ))}
          </View>
        </View>

        {currentStep == 0 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              Select Delivery Address
            </Text>

            <View>
              {addresses?.map((item, index) => (
                <>
                  <Pressable
                    style={{
                      borderWidth: 0.6,
                      borderColor: 'gray',
                      padding: 10,
                      borderRadius: 10,
                      marginVertical: 10,
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 20,
                    }}
                  >
                    {selectedAddress && selectedAddress._id == item._id ? (
                      <FontAwesome
                        onPress={() => setSelectedAddress(item)}
                        name="circle"
                        size={30}
                        color={'green'}
                      />
                    ) : (
                      <FontAwesome
                        onPress={() => setSelectedAddress(item)}
                        name="circle-o"
                        size={30}
                      />
                    )}

                    <Pressable
                      key={index}
                      // style={{
                      //   borderWidth: 0.6,
                      //   borderColor: 'gray',
                      //   padding: 10,
                      //   borderRadius: 10,
                      //   marginVertical: 10,
                      // }}
                    >
                      <View
                        style={{ flexDirection: 'row', alignItems: 'center' }}
                      >
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

                      {selectedAddress && selectedAddress._id == item._id && (
                        <Pressable
                          onPress={() => setCurrentStep(1)}
                          style={{
                            backgroundColor: 'purple',
                            paddingHorizontal: 10,
                            paddingVertical: 10,
                            borderRadius: 20,
                            marginVertical: 10,
                            alignItems: 'center',
                          }}
                        >
                          <Text style={{ color: 'white', fontWeight: 'bold' }}>
                            Delevered to this address
                          </Text>
                        </Pressable>
                      )}
                    </Pressable>
                  </Pressable>
                </>
              ))}
            </View>
          </View>
        )}

        {currentStep == 1 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              Choose your delivery options
            </Text>

            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
                borderWidth: 1,
                borderBlockColor: '#E0E0E0',
                padding: 10,
                borderRadius: 10,
                marginVertical: 20,
              }}
            >
              {options ? (
                <FontAwesome
                  name="circle-o"
                  size={30}
                  onPress={() => setOptions(!options)}
                />
              ) : (
                <FontAwesome
                  onPress={() => setOptions(!options)}
                  name="circle"
                  size={30}
                  color={'green'}
                />
              )}
              <Text style={{ fontWeight: '500' }}>
                <Text style={{ color: 'green' }}>Tomarrow by 10 pm - </Text>
                Free delivery with prime membership
              </Text>
            </View>

            <Pressable
              onPress={() => setCurrentStep(2)}
              style={{
                backgroundColor: 'orange',
                paddingHorizontal: 20,
                paddingVertical: 10,
                alignItems: 'center',
                borderRadius: 20,
              }}
            >
              <Text
                style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}
              >
                Continue
              </Text>
            </Pressable>
          </View>
        )}

        {currentStep == 2 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              Select your Payment method
            </Text>

            <View>
              {/* Cash Option */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              >
                {selectedOptions === 'Cash' ? (
                  <FontAwesome name="circle" size={24} color="green" />
                ) : (
                  <FontAwesome
                    name="circle-o"
                    size={24}
                    color="green"
                    onPress={() => setSelectedOptions('Cash')}
                  />
                )}
                <Text style={{ fontWeight: '500' }}>Cash on Delivery</Text>
              </View>

              {/* Card Option */}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 10,
                  borderWidth: 1,
                  borderColor: '#E0E0E0',
                  padding: 10,
                  borderRadius: 10,
                  marginVertical: 10,
                }}
              >
                {selectedOptions === 'Card' ? (
                  <FontAwesome name="circle" size={24} color="green" />
                ) : (
                  <FontAwesome
                    name="circle-o"
                    size={24}
                    color="green"
                    onPress={() => setSelectedOptions('Card')}
                  />
                )}
                <Text style={{ fontWeight: '500' }}>
                  {' '}
                  UPI- Credit/Debit Card
                </Text>
              </View>
              <Pressable
                onPress={() => setCurrentStep(3)}
                style={{
                  backgroundColor: 'orange',
                  paddingHorizontal: 20,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderRadius: 20,
                }}
              >
                <Text
                  style={{ fontWeight: 'bold', color: 'white', fontSize: 18 }}
                >
                  Continue
                </Text>
              </Pressable>
            </View>
          </View>
        )}

        {currentStep == 3 && (
          <View style={{ marginHorizontal: 20 }}>
            <Text>Payment options</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ConfirmnationScreen;

const styles = StyleSheet.create({});
