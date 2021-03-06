import React, { useContext, useEffect, useState } from "react";
import { Alert } from "react-native";
import styled from "styled-components/native";
import { useDB } from "../context";
import colors from "../colors";
import { AdMobInterstitial, AdMobRewarded } from "expo-ads-admob";
import { Platform } from "react-native";

const View = styled.View`
  flex: 1;
  background-color: ${colors.bgColor};
  padding: 0px 30px;
`;

const Title = styled.Text`
  color: ${colors.textColor};
  margin: 50px 0px;
  text-align: center;
  font-size: 28px;
  font-weight: 500;
`;

const TextInput = styled.TextInput`
  background-color: white;
  border-radius: 20px;
  padding: 10px 20px;
  font-size: 18px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
`;

const Btn = styled.TouchableOpacity`
  width: 100%;
  margin-top: 30px;
  padding: 10px 20px;
  background-color: ${colors.btnColor};
  align-items: center;
  border-radius: 20px;
`;

const BtnText = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 500;
`;

const Emotions = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const Emotion = styled.TouchableOpacity`
  background-color: ${(props) => (props.selected ? colors.btnColor : "white")};
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
  padding: 10px;
  border-radius: 10px;
`;

const EmotionText = styled.Text`
  font-size: 24px;
`;

const emotions = ["😄", "😢", "😡", "🙂", "😍", "🥳"];

const Write = ({ navigation: { goBack } }) => {
  const realm = useDB();
  const [selectedEmotion, setEmotion] = useState(null);
  const [feelings, setFeelings] = useState("");
  const onChangeText = (text) => setFeelings(text);
  const onEmotionPress = (face) => setEmotion(face);
  const onSubmit = async () => {
    if (feelings === "" || selectedEmotion === null) {
      return Alert.alert(`오늘 하루 어떠셨나요? 
기분을 적어주세요`);
    }
    await AdMobRewarded.setAdUnitID(
      Platform.OS === "ios"
        ? "ca-app-pub-3940256099942544/1712485313"
        : "ca-app-pub-3940256099942544/5224354917"
    );
    await AdMobRewarded.requestAdAsync();
    await AdMobRewarded.showAdAsync();
    AdMobRewarded.addEventListener("rewardedVideoUserDidEarnReward", () => {
      AdMobRewarded.addEventListener("rewardedVideoDidDismiss", () => {
        realm.write(() => {
          realm.create("Feeling", {
            _id: Date.now(),
            emotion: selectedEmotion,
            message: feelings,
          });
        });
        goBack();
      });
    });
  };

  return (
    <View>
      <Title>오늘 기분은 어떠세요?</Title>
      <Emotions>
        {emotions.map((emotion, index) => (
          <Emotion
            style={{ elevation: 20 }}
            selected={emotion === selectedEmotion}
            onPress={() => onEmotionPress(emotion)}
            key={index}
          >
            <EmotionText>{emotion}</EmotionText>
          </Emotion>
        ))}
      </Emotions>
      <TextInput
        style={{ elevation: 20 }}
        returnKeyType="done"
        onSubmitEditing={onSubmit}
        onChangeText={onChangeText}
        value={feelings}
        placeholder="기분을 적어주세요"
        placeholderTextColor="grey"
      />
      <Btn onPress={onSubmit}>
        <BtnText>저장</BtnText>
      </Btn>
    </View>
  );
};

export default Write;
