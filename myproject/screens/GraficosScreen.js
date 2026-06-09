import React, { useState, useEffect } from 'react';
import {View,Text,Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

export default function GraficosScreen() {
const [totalAlunos, setTotalAlunos] = useState(0);
const [totalNotas, setTotalNotas] = useState(0);
const [mediaGeral, setMediaGeral] = useState(0);
const [frequenciaMedia,setFrequenciaMedia] = useState(0);

useEffect(() => {
carregarDados();
}, []);

async function carregarDados() {
try {
const alunos = JSON.parse(
await AsyncStorage.getItem('alunos')
) || [];


  const notas = JSON.parse(
      await AsyncStorage.getItem('notas')
    ) || [];

  const frequencias = JSON.parse(
      await AsyncStorage.getItem('frequencias')
    ) || [];

  setTotalAlunos(alunos.length);
  setTotalNotas(notas.length);

  if (notas.length > 0) {
    const media = notas.reduce(
        (total, item) => total + item.nota,0) / notas.length;

    setMediaGeral(
      media.toFixed(1)
    );
  }

  if (frequencias.length > 0) {
    const mediaFreq = frequencias.reduce(
        (total, item) => total + Number(item.frequencia),0) / frequencias.length;

    setFrequenciaMedia(
      mediaFreq.toFixed(1)
    );
  }
} catch (error) {
  Alert.alert('Erro','Não foi possível carregar os dados.'
  );
}

}

return ( 
<View> 
  <Text> -- Indicadores do Sistema -- </Text>

  <Text>Total de alunos {' '}{totalAlunos}</Text>
  <Text>Total de notas:{' '} {totalNotas}</Text>
  <Text>Média geral:{' '}{mediaGeral}</Text>
  <Text>Frequência média:{' '}{frequenciaMedia}</Text>

  <Text>Área reservada para futuros gráficos.</Text>
</View>
);
}
