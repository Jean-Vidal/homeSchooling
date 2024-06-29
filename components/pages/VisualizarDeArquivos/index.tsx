import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebaseConfig';
interface FileData {
  name: string;
  url: string;
}

const VisualizadorDeArquivos = () => {
  const [imagens, setImagens] = useState<FileData[]>([]);
  const [documentos, setDocumentos] = useState<FileData[]>([]);

  useEffect(() => {
    const buscarArquivos = async () => {
      const referenciaImagens = ref(storage, 'images/');
      const referenciaDocumentos = ref(storage, 'documents/');

      try {
        const listaImagens = await listAll(referenciaImagens);
        const listaDocumentos = await listAll(referenciaDocumentos);

        const urlsImagens = await Promise.all(
          listaImagens.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { name: item.name, url };
          })
        );

        const urlsDocumentos = await Promise.all(
          listaDocumentos.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { name: item.name, url };
          })
        );

        setImagens(urlsImagens);
        setDocumentos(urlsDocumentos);
      } catch (error) {
        console.error('Erro ao buscar arquivos:', error);
        Alert.alert('Erro', 'Erro ao buscar arquivos. Por favor, tente novamente.');
      }
    };

    buscarArquivos();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.sectionTitle}>Imagens</Text>
      <View style={styles.fileContainer}>
        {imagens.map((imagem, index) => (
          <View key={index} style={styles.fileItem}>
            <Image source={{ uri: imagem.url }} style={styles.image} />
            <Text style={styles.fileName}>{imagem.name}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Documentos</Text>
      <View style={styles.fileContainer}>
        {documentos.map((doc, index) => (
          <View key={index} style={styles.fileItem}>
            <TouchableOpacity onPress={() => Alert.alert('Abrir Documento', doc.url)}>
              <Text style={styles.fileName}>{doc.name}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  fileContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  fileItem: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  fileName: {
    marginTop: 8,
    fontSize: 14,
    textAlign: 'center',
    color: '#333',
  },
});

export default VisualizadorDeArquivos;
