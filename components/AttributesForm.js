// AttributesForm.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import CustomButton from './CustomButton';

const AttributesForm = ({ onSaveAttributes }) => {
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [hobby, setHobby] = useState('');
  const [achievements, setAchievements] = useState('');

  const handleSaveAttributes = () => {
    const attributesData = {
      name,
      nickname,
      hobby,
      achievements,
    };

    onSaveAttributes(attributesData);
    setName('');
    setNickname('');
    setHobby('');
    setAchievements('');
  };

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={text => setName(text)}
        value={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        onChangeText={text => setNickname(text)}
        value={nickname}
      />
      <TextInput
        style={styles.input}
        placeholder="Hobby"
        onChangeText={text => setHobby(text)}
        value={hobby}
      />
      <TextInput
        style={styles.input}
        placeholder="Achievements"
        onChangeText={text => setAchievements(text)}
        value={achievements}
      />
      <CustomButton title="Save Attributes" onPress={handleSaveAttributes} />
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});

export default AttributesForm;
