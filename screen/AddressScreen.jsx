import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

const AddressScreen = () => {
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
