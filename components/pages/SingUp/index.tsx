import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import { auth } from '../../../firebaseConfig';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

type Props = {
  navigateToSignIn: () => void;
};

export default function SignUp({ navigateToSignIn }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const handleSignUp = async () => {
    try {
      const response = await createUserWithEmailAndPassword(auth, email, password);
      if (response.user) {
        await updateProfile(response.user, {
          displayName: displayName
        });
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigateToSignIn();
        }, 3000);
      }
    } catch (error) {
      console.error('Erro ao tentar criar conta:', error);
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
          placeholder="Nome de usuário"
          value={displayName}
          onChangeText={setDisplayName}
        />
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

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      {showSuccess && (
        <View style={styles.iconContainer}>
          <Icon name="check" size={30} color="green" />
          <Text>Conta criada com sucesso!</Text>
        </View>
      )}

      {showError && (
        <View style={styles.iconContainer}>
          <Icon name="times" size={30} color="red" />
          <Text>Erro ao criar conta. Por favor, tente novamente.</Text>
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
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10
    }
});
