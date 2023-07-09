import { useEffect, useState } from "react";
import styled from "styled-components/native";
import { View, Text, ImageBackground } from "react-native";
import Toast from "react-native-root-toast";
import { api } from "../api";
import { Card } from "../components/Card";
import { Title } from "../components/Title";
import { Subtitle } from "../components/Subtitle";
import { Button } from "../components/Button";
import screens from "../screens.json";

// @ts-ignore
const backgroundImage = require("../../assets/background.jpg");

const texts = {
  editButtonLabel: "Editar",
  deleteButtonLabel: "Deletar",
  deleteSuccessMessage: "O notepad foi deletado com sucesso!",
};

const initialNotepad = {
  id: 0,
  title: "",
  subtitle: "",
  content: "",
  created_at: "",
};

const Content = styled.Text`
  font-size: 18px;
  line-height: 27px;
  color: #333333;
  margin-bottom: 16px;
`;

const ImageBackgroundFullScreen = styled.ImageBackground`
  flex: 1;
`;

const Container = styled.ScrollView`
  flex: 1;
  background-color: #f9f9f9;
  padding: 16px;
`;

const ContainerCard = styled(Card)`
  border-radius: 10px;
  background-color: #ffffff;
  padding: 16px;
  margin-bottom: 16px;
  shadow-color: #000000;
  shadow-offset: 0px 2px;
  shadow-opacity: 0.2;
  shadow-radius: 4px;
  elevation: 4;
`;

const DeleteButton = styled(Button)`
  background-color: #e74c3c;
  border-radius: 8px;
  margin-top: 8px;
`;

const EditButton = styled(Button)`
  background-color: #e67e22;
  border-radius: 8px;
`;

export function ViewNotepadScreen({ navigation, route }) {
  const notepadId = route.params.id;
  const [notepad, setNotepad] = useState(initialNotepad);
  const notepadCreatedAt = new Date(notepad.created_at).toLocaleDateString();

  async function loadNotepad() {
    const response = await api.get(`/notepads/${notepadId}`);
    setNotepad(response.data);
  }

  async function onDelete() {
    const response = await api.delete(`/notepads/${notepadId}`);
    Toast.show(texts.deleteSuccessMessage);
    navigation.navigate(screens.listNotepads);
  }

  async function onEdit() {
    navigation.navigate(screens.editNotepad, {
      id: notepadId,
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      loadNotepad();
    });
    return unsubscribe;
  }, [notepadId]);

  return (
    <ImageBackgroundFullScreen source={backgroundImage} resizeMode="cover">
      <Container>
        <ContainerCard>
          <Text>#{notepad.id}</Text>
          <Text>{notepadCreatedAt}</Text>
          <Title>{notepad.title}</Title>
          <Subtitle>{notepad.subtitle}</Subtitle>
          <Content>{notepad.content}</Content>
          <DeleteButton onPress={onDelete}>
            {texts.deleteButtonLabel}
          </DeleteButton>
          <EditButton onPress={onEdit}>{texts.editButtonLabel}</EditButton>
          {notepad.latitude && notepad.longitude && (
            <>
              <Text>Latitude: {notepad.latitude}</Text>
              <Text>Longitude: {notepad.longitude}</Text>
            </>
          )}
        </ContainerCard>
      </Container>
    </ImageBackgroundFullScreen>
  );
}
