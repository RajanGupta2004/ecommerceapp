import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const AddAddressScreen = () => {
  const navigation = useNavigation();
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AddAddressScreen;

const styles = StyleSheet.create({});
