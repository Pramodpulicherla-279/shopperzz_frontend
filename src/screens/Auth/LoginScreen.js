import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useDispatch } from 'react-redux';
// AppDispatch is a TypeScript type, remove if not using TS
// import { AppDispatch } from '../../store/store';
import { signIn } from '../../store/slices/authSlice';
import { colors } from '../../constants/colors';
import { loginUser } from '../../api/services/auth.service';
import Feather from 'react-native-vector-icons/Feather';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      // Call the real API
      const data = await loginUser(email, password);
      // Dispatch the token and the user object from the API response

      // --- Add this console.log to see the exact API response ---
      console.log('API Response Data:', JSON.stringify(data, null, 2));

      // Assumes API returns { token: '...', user: { id: 1, name: '...' } }
      dispatch(signIn({ token: data.token, user: data.user }));
    } catch (err) {
      // Display the error message from the API service
      setError(err.message);
    } finally {
      // Ensure loading is stopped whether it succeeds or fails
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    // For guest users, the user object can be null or a default object
    dispatch(signIn({ token: 'guest-access-token', user: { name: 'Guest' } }));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to Shopperzz!</Text>
        <Text style={styles.subtitle}>Sign in to continue</Text>

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          placeholderTextColor="#888"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={text => {
            setEmail(text);
            if (error) setError(null);
          }}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            placeholderTextColor="#888"
            secureTextEntry={!isPasswordVisible} // Control visibility with state
            value={password}
            onChangeText={text => {
              setPassword(text);
              if (error) setError(null);
            }}
          />
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Feather
              name={isPasswordVisible ? 'eye-off' : 'eye'}
              size={22}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {error && <Text style={styles.errText}>{error}</Text>}

        <TouchableOpacity
          style={styles.button}
          onPress={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.buttonText}>Sign In</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.skipNow} onPress={handleSkip}>
            Don't have an account? <Text style={styles.signupText}>SignUp</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.skipNow} onPress={handleSkip}>
            Skip for now
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  input: {
    backgroundColor: '#f2f2f2',
    color: '#333',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    color: colors.primary,
    textAlign: 'right',
    marginTop: 15,
    fontSize: 14,
  },
  skipNow: {
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 14,
  },
  signupText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  errText: {
    color: 'red',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    color: '#333',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
});

export default LoginScreen;
