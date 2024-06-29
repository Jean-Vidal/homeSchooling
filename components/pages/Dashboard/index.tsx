import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebaseConfig';

const Dashboard = () => {
  const [data, setData] = useState([
    {
      name: 'Atividades Pendentes',
      population: 0,
      color: '#FF6384',
      legendFontColor: '#7F7F7F',
      legendFontSize: 17,
    },
    {
      name: 'Atividades Realizadas',
      population: 0,
      color: '#36A2EB',
      legendFontColor: '#7F7F7F',
      legendFontSize: 17,
    },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Materias'));
        let realizadas = 0;
        let pendentes = 0;

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.concluido) {
            realizadas += 1;
          } else {
            pendentes += 1;
          }
        });

        setData([
          {
            name: 'Atividades Pendentes',
            population: pendentes,
            color: '#FF6384',
            legendFontColor: '#7F7F7F',
            legendFontSize: 17,
          },
          {
            name: 'Atividades Realizadas',
            population: realizadas,
            color: '#36A2EB',
            legendFontColor: '#7F7F7F',
            legendFontSize: 17,
          },
        ]);
      } catch (error) {
        console.error('Erro ao buscar dados do Firestore:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const screenWidth = Dimensions.get('window').width;

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#8B4513" />
        <Text>Carregando...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Dashboard</Text>
      <PieChart
        data={data}
        width={screenWidth}
        height={300}
        chartConfig={chartConfig}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="90"
        hasLegend={false}
        absolute
      />
      <View style={styles.legendContainer}>
        {data.map((item, index) => (
          <View key={index} style={styles.legendItem}>
            <View style={[styles.legendColor, { backgroundColor: item.color }]} />
            <Text style={styles.legendText}>{item.population} {item.name}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const chartConfig = {
  backgroundGradientFrom: '#FFF',
  backgroundGradientFromOpacity: 0,
  backgroundGradientTo: '#FFF',
  backgroundGradientToOpacity: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  strokeWidth: 2,
  barPercentage: 0.5,
  useShadowColorFromDataset: false,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  legendContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  legendColor: {
    width: 17,
    height: 17,
    marginRight: 5,
  },
  legendText: {
    fontSize: 15,
    color: '#7F7F7F',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
