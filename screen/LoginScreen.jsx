import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Platform,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      setLoading(true); // Show loader while checking
      try {
        const token = await AsyncStorage.getItem('authToken');
        if (token) {
          navigation.replace('Main');
        }
      } catch (error) {
        console.log('Error checking login status', error);
      } finally {
        setLoading(false); // Stop loader
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    try {
      const user = {
        email,
        password,
      };

      const res = await axios.post(
        'http://https://ecommerceapp-zz23.onrender.com/api/v1/login',
        user,
      );
      const token = res.data?.token;
      console.log('res1'.res);

      // const jsonValue = JSON.stringify(token);
      await AsyncStorage.setItem('authToken', token);

      // const data = AsyncStorage.getItem('authToken');
      // console.log('token data', data);

      Alert.alert('Login successfulll....');
      console.log('Login successfull...');
      navigation.replace('Home');
    } catch (error) {
      console.log('Error in login', error);
      Alert.alert('Error in Login ');
    }
  };

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <ActivityIndicator size={40} />
      </View>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: 'https://assets.stickpng.com/thumbs/6160562276000b00045a7d97.png',
        }}
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        style={styles.innerContainer}
      >
        <Text style={styles.title}>Login to your account</Text>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            value={email}
            onChangeText={text => setEmail(text)}
            style={styles.input}
            placeholder="Enter your email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            value={password}
            onChangeText={text => setPassword(text)}
            style={styles.input}
            placeholder="Enter your password"
            secureTextEntry
          />
        </View>

        <View style={styles.fotgotContainer}>
          <Text>keep me login</Text>
          <Text style={{ color: 'blue' }}>Forgot Password</Text>
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text
          onPress={() => navigation.navigate('Register')}
          style={styles.footerText}
        >
          Don’t have an account? <Text style={styles.signupText}>Sign up</Text>
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    paddingTop: 50,
  },
  logo: {
    width: 160,
    height: 100,
    resizeMode: 'contain',
  },
  innerContainer: {
    width: '85%',
    marginTop: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 25,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
  signupText: {
    color: '#007AFF',
    fontWeight: '600',
  },

  fotgotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
});
