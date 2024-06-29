import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Alert } from 'react-native';
import { db } from '../../../firebaseConfig'; // Certifique-se de que o caminho está correto
import Table from '../Datatable';
import { Materia } from '../../types/Materia';
import * as ScreenOrientation from 'expo-screen-orientation';
import { collection, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';

const TableScreen: React.FC = () => {
  const [tableData, setTableData] = useState<Materia[]>([]);

  useEffect(() => {
    ScreenOrientation.unlockAsync();

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Materias'));
        const fetchedData: Materia[] = querySnapshot.docs.map(doc => {
          const data = doc.data();
          const dataInicio = data.data_inicio ? data.data_inicio.toDate() : null;
          const dataFim = data.data_fim ? data.data_fim.toDate() : null;

          return {
            id: doc.id,
            materia: data.materia,
            tema: data.tema,
            dataInicio: dataInicio,
            dataFim: dataFim,
            concluido: data.concluido || false,
          };
        });

        setTableData(fetchedData);
      } catch (error) {
        console.error('Erro ao buscar dados do Firestore:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteItem = async (id: string) => {
    Alert.alert(
      'Confirmar exclusão',
      'Tem certeza que deseja excluir este item?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: async () => {
            try {
              const docRef = doc(db, 'Materias', id);
              await deleteDoc(docRef);
              const updatedData = tableData.filter(item => item.id !== id);
              setTableData(updatedData);
            } catch (error) {
              console.error('Erro ao excluir item:', error);
              Alert.alert('Erro', 'Erro ao excluir o item. Por favor, tente novamente.');
            }
          },
        },
      ],
      { cancelable: false }
    );
  };

  const handleEditItem = async (id: string, newData: Materia) => {
    try {
      const docRef = doc(db, 'Materias', id);
      await updateDoc(docRef, {
        materia: newData.materia,
        tema: newData.tema,
        dataInicio: newData.dataInicio,
        dataFim: newData.dataFim,
        concluido: newData.concluido,
      });
      const updatedData = tableData.map(item => (item.id === id ? newData : item));
      setTableData(updatedData);
    } catch (error) {
      console.error('Erro ao editar item:', error);
      Alert.alert('Erro', 'Erro ao editar o item. Por favor, tente novamente.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Table data={tableData} onDeleteItem={handleDeleteItem} onEditItem={handleEditItem} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TableScreen;
