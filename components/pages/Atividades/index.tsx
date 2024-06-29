import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';

const ArmazenarAtividades = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const [doc, setDoc] = useState<{ name: string; uri: string } | null>(null);

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (!permissionResult.granted) {
      alert('Permission to access camera is required!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync();
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      uploadImageToFirebase(result.assets[0].uri, `images/${Date.now()}`);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
        multiple: false,
      });
  
      if (result.type === 'cancel') {
        console.warn('User cancelled the document picker');
      } else if (result.type === 'success' && result.uri && result.name) {
        setDoc({ name: result.name, uri: result.uri });
        Alert.alert('Documento Selecionado', `Nome do Arquivo: ${result.name}`);
      } else {
        console.warn('No document was selected.');
      }
    } catch (err) {
      console.error('Error picking the document:', err);
    }
  };

  const uploadImageToFirebase = async (uri: string, path: string) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const storageRef = ref(storage, path);
    const result = await uploadBytes(storageRef, blob);
    const downloadURL = await getDownloadURL(result.ref);
    Alert.alert('Upload realizado com sucesso', `Imagem disponível em: ${downloadURL}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Armazenar Atividades</Text>
      <TouchableOpacity onPress={openCamera} style={styles.button}>
        <Text style={styles.buttonText}>Tirar Foto</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={pickDocument} style={styles.button}>
        <Text style={styles.buttonText}>Selecionar Documento</Text>
      </TouchableOpacity>
      {photo && (
        <Image source={{ uri: photo }} style={styles.image} />
      )}
      {doc && (
        <View style={styles.docContainer}>
          <Text style={styles.docText}>Documento Selecionado: {doc.name}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#8B4513',
    padding: 15,
    borderRadius: 5,
    margin: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  image: {
    marginTop: 20,
    width: 300,
    height: 300,
    resizeMode: 'cover',
  },
  docContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  docText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ArmazenarAtividades;
