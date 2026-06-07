import React, { useState, useEffect } from 'react';
import {
  View,
  Text
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function RelatoriosScreen() {
  const [totalAlunos, setTotalAlunos] = useState(0);
  const [totalNotas, setTotalNotas] = useState(0);

  useEffect(() => {
    carregarRelatorio();
  }, []);

  async function carregarRelatorio() {
    const alunos =
      JSON.parse(
        await AsyncStorage.getItem('alunos')
      ) || [];

    const notas =
      JSON.parse(
        await AsyncStorage.getItem('notas')
      ) || [];

    setTotalAlunos(alunos.length);
    setTotalNotas(notas.length);
  }

  return (
    <View>
      <Text>Relatórios</Text>

      <Text>
        Total de alunos: {totalAlunos}
      </Text>

      <Text>
        Total de notas cadastradas: {totalNotas}
      </Text>
    </View>
  );
}