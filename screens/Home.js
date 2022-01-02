import React from "react";
import styled from "styled-components/native";
import { Ionicons } from "@expo/vector-icons";
import colors from "../colors";

const View = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0px 30px;
  padding-top: 100px;
`;

const Title = styled.Text`
  color: ${colors.textColor};
  font-size: 48px;
  margin-bottom: 100px;
`;

const Btn = styled.TouchableOpacity`
  position: absolute;
  bottom: 50px;
  right: 50px;
  height: 60px;
  width: 60px;
  border-radius: 30px;
  justify-content: center;
  align-items: center;
  background-color: ${colors.btnColor};
  elevation: 5;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.3);
`;

const BtnText = styled.Text`
  color: white;
`;

const Home = ({ navigation: { navigate } }) => {
  return (
    <View>
      <Title>My Diary</Title>
      <Btn onPress={() => navigate("Write")}>
        <Ionicons name="pencil-sharp" color="white" size={32} />
      </Btn>
    </View>
  );
};

export default Home;
