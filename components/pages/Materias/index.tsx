import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView, Modal, StyleSheet, Alert } from 'react-native';
import Input from '@/components/Input/Index';
import DateInput from '@/components/DatePicker';
import tw from 'twrnc';
import { db } from '../../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

function MateriasScreen() {
  const [materia, setMateria] = useState('');
  const [tema, setTema] = useState('');
  const [dataInicial, setDataInicial] = useState(new Date());
  const [dataFinal, setDataFinal] = useState(new Date());
  const [modalVisible, setModalVisible] = useState(false);

  const handleAdicionar = async () => {
    try {
      await addDoc(collection(db, 'Materias'), {
        materia,
        tema,
        dataInicial,
        dataFinal,
      });
      setModalVisible(true);
      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
    } catch (error) {
      console.error('Erro ao adicionar matéria:', error);
      Alert.alert('Erro', 'Erro ao salvar os dados. Por favor, tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={tw`text-2xl mb-4`}>Matérias</Text>
      <View style={styles.inputArea}>
        <Input label="Matéria" value={materia} onChangeText={setMateria} />
        <Input label="Tema" value={tema} onChangeText={setTema} />

        <View>
          <DateInput label="Escolher Data Inicial" date={dataInicial} setDate={setDataInicial} />
        </View>

        <View>
          <DateInput label="Escolher Data Final" date={dataFinal} setDate={setDataFinal} />
        </View>

        <View style={styles.buttonContainer}>
          <Button title="Adicionar" onPress={handleAdicionar} color="#8B4513"/>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  inputArea: {
    width: '100%',
    paddingLeft: 5,
    paddingRight: 5,
  },
  buttonContainer: {
    marginTop: 16,
    marginBottom: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    marginHorizontal: 20, 
  },
});

export default MateriasScreen;