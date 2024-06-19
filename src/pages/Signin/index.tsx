import React from "react";
import {View,
       Text,
       StyleSheet,
       Image,
       TextInput,
       TouchableOpacity} from "react-native"

export default function Signin(){
    return (
        <View style={styles.container}>
            <Image 
            style={styles.logo}
            source={require('../../assets/logo.png')}/>
            
            <View style={styles.inputArea}>
                <TextInput style={styles.input} placeholder="Digite seu email"/>
                <TextInput
                 style={styles.input}
                 secureTextEntry={true}
                 placeholder="Digite sua senha"/>
            </View>

            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

        </View>
    )
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
    }
})