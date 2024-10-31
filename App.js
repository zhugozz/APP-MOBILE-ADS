import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';

export default function App() {
  const [joke, setJoke] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para buscar uma nova citação
  const fetchJoke = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://api.chucknorris.io/jokes/random');
      const data = await response.json();
      setJoke(data.value);
    } catch (error) {
      console.error("Erro ao buscar a piada:", error);
      setJoke('Falha ao carregar a piada');
    } finally {
      setLoading(false);
    }
  };

  // Carrega uma citação ao iniciar o app
  useEffect(() => {
    fetchJoke();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fatos sobre Chuck Norris</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#f3b23d" />
      ) : (
        <Text style={styles.jokeText}>{joke}</Text>
      )}
      <Button title="Outro Fato" onPress={fetchJoke} color="#f3b23d" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  jokeText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
});
