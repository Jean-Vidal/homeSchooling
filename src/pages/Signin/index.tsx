import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Alert } from "react-native";
import auth from '@react-native-firebase/auth';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showError, setShowError] = useState(false);

    const handleSignIn = async () => {
        try {
            const response = await auth().signInWithEmailAndPassword(email, password);
            console.log('Usuário logado com sucesso!', response.user);
        } catch (error: any) {
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
                source={require('../../assets/logo.png')}
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
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff'
    },
    logo:{
        marginBottom: 18
    },
    inputArea:{
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 32,
        paddingHorizontal: 14
    },
    input:{
        width: '95%',
        fontSize: 12,
        height: 40,
        backgroundColor: '#fff',
        paddingHorizontal: 8,
        marginBottom: 12,
        borderRadius: 5,
        borderColor: 'brown', 
        borderWidth: 2, 
        color: 'black', 
        fontWeight: 'bold' 
    },
    button:{
        width: '65%',
        height: 40,
        backgroundColor: 'brown',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'

    },
    buttonText:{
        fontSize: 20,
        fontWeight: 'bold'
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
    }
});
