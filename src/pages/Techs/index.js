import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Form,
  Input,
  List,
  Name,
  ProfileButtom,
  SubmitButton,
  Tech,
} from './styles';

import api from '../../service/api';

export default function Techs() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);
  const [techs, setTechs] = useState([]);
  const [newTech, setNewTech] = useState(null);

  async function loadPage() {
    const { data } = await api.get('/techs');
    setTechs(data);
  }

  async function handleAddTech() {
    setLoading(true);

    const { data } = await api.post('/techs/', {
      id: newTech,
    });

    setTechs([...techs, data]);

    setLoading(false);

    setNewTech(null);

    Keyboard.dismiss();
  }

  async function handleDeleteTech(id) {
    await api.delete(`/techs/${id}`);
    const filteredTechs = techs.filter((item) => item.id !== id);

    setTechs(filteredTechs);
  }

  function navigationToDetail(tech) {
    navigation.navigate('TechDetails', { tech });
  }

  useEffect(() => {
    loadPage();
  }, []);

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Adicionar Tecnologia"
          value={newTech}
          onChangeText={setNewTech}
          returnKeyType="send"
          onSubmitEditing={handleAddTech}
        />
        <SubmitButton loading={loading} onPress={handleAddTech}>
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Icon name="add" size={20} color="#fff" />
          )}
        </SubmitButton>
      </Form>
      <List
        data={techs}
        keyExtractor={(tech) => tech.id}
        renderItem={({ item }) => (
          <Tech>
            <Name>{item.id}</Name>

            <ProfileButtom
              background="#ffc107"
              onPress={() => navigationToDetail(item)}
            >
              <Icon name="design-services" size={20} color="#fff" />
            </ProfileButtom>

            <ProfileButtom
              background="#e0a800"
              onPress={() => handleDeleteTech(item.id)}
            >
              <Icon name="delete" size={20} color="#fff" />
            </ProfileButtom>
          </Tech>
        )}
      />
    </Container>
  );
}
