import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native';
import { auth } from '../../../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  onSignIn: () => void;
};

export default function SignIn({ onSignIn }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showError, setShowError] = useState(false);

  const handleSignIn = async () => {
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log('Usuário logado com sucesso!', response.user);
      onSignIn();
    } catch (error) {
      console.error('Erro ao tentar fazer login:', error);
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  return (
    <View style={styles.container}>
      <Image 
        style={styles.logo}
        source={require('../../../assets/images/logo.png')}
      />
      
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Digite sua senha"
          value={password}
          onChangeText={setPassword}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      {showError && (
        <View style={styles.errorContainer}>
          <Icon name="times" size={20} color="red" />
          <Text style={styles.errorText}>Erro ao fazer login. Por favor, tente novamente.</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 16,
    },
    logo: {
        marginLeft: 60,
        marginBottom: 18
    },
    inputArea: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
    },
    input: {
        width: '100%',
        fontSize: 14,
        height: 50,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        marginBottom: 12,
        borderRadius: 5,
        borderColor: 'brown',
        borderWidth: 2,
        color: 'black',
        fontWeight: 'bold'
    },
    button: {
        width: '75%',
        height: 50,
        backgroundColor: 'brown',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        marginLeft: 50
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },
   errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    },
    errorText: {
        marginLeft: 10,
        color: 'red',
        fontWeight: 'bold'
    },
    createAccountText: {
        marginTop: 20,
        textAlign: 'center',
        color: 'brown',
        fontWeight: 'bold',
        fontSize: 16,
        textDecorationLine: 'underline'
    }
});

