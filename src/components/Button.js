import { ActivityIndicator } from "react-native";
import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity`
  background-color: #3498db;
  border-radius: 8px;
  padding: 12px 24px;
  align-items: center;
  justify-content: center;
`;

const ButtonText = styled.Text`
  color: #ffffff;
  text-transform: uppercase;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  letter-spacing: 1px;
`;

export function Button({ children, onPress, style = {}, isLoading = false }) {
  return (
    <ButtonContainer onPress={onPress} style={style} disabled={isLoading}>
      {isLoading ? (
        <ActivityIndicator size={30} color="#ecf0f1" />
      ) : (
        <ButtonText>{children}</ButtonText>
      )}
    </ButtonContainer>
  );
}
