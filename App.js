import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ImageBackground,
} from 'react-native';
import CustomButton from './components/CustomButton';
import BirthdayCard from './components/BirthdayCard';
import AttributesForm from './components/AttributesForm';
import * as FileSystem from 'expo-file-system';

const App = () => {
  const [showCard, setShowCard] = useState(false);
  const [name, setName] = useState('');
  const [showAttributesForm, setShowAttributesForm] = useState(false);
  const [attributes, setAttributes] = useState([]);
  const [selectedPerson, setSelectedPerson] = useState(null);

  useEffect(() => {
    readAttributesFromFile();
  }, []);

  const handleShowCard = () => {
    const selectedPersonAttributes = attributes.find(
      (person) => person.name === name
    )?.attributes;

    if (selectedPersonAttributes) {
      setSelectedPerson({ name, attributes: selectedPersonAttributes });
      setShowCard(true);
    } else {
      setSelectedPerson({ name, attributes: [] });
      setShowCard(true);
    }
  };

  const handleFormSubmit = (formData) => {
    setName(formData.name);
  };

  const handleSaveAttributes = async (attributesData) => {
    try {
      const fileUri = `${FileSystem.documentDirectory}attributes.json`;

      const updatedAttributes = attributes.map((person) => {
        if (person.name === attributesData.name) {
          return {
            ...person,
            attributes: [...person.attributes, attributesData],
          };
        }
        return person;
      });

      const existingPerson = attributes.find(
        (person) => person.name === attributesData.name
      );

      if (!existingPerson) {
        updatedAttributes.push({
          name: attributesData.name,
          attributes: [attributesData],
        });
      }

      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(updatedAttributes)
      );

      setAttributes(updatedAttributes);
      setShowAttributesForm(false); 
    } catch (error) {
      console.error('Error saving attributes:', error);
    }
  };

  const readAttributesFromFile = async () => {
    try {
      const fileUri = `${FileSystem.documentDirectory}attributes.json`;
      const fileContent = await FileSystem.readAsStringAsync(fileUri);

      if (fileContent) {
        setAttributes(JSON.parse(fileContent));
      }
    } catch (error) {
      console.error('Error reading attributes:', error);
    }
  };

  const handleAttributesLinkPress = () => {
    setShowAttributesForm(true);
  };

  const handleSelectPerson = (person) => {
    setSelectedPerson(person);
    setShowCard(true);
  };

  const filteredAttributes = selectedPerson
    ? attributes.find((person) => person.name === selectedPerson.name)
        ?.attributes
    : null;

  const handleBackToHome = () => {
    setShowCard(false);
    setName('');
    setSelectedPerson(null);
  };

  return (
    <>
      {!showCard ? (
        <ImageBackground
          source={require('./assets/background.jpg')} 
          style={styles.backgroundImage}
          resizeMode="cover">
          <View style={styles.container}>
            <View style={styles.loginContainer}>
              <>
                <Text style={styles.logo}>Welcome!</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Your Sweet Name"
                  autoCapitalize="characters"
                  value={name}
                  onChangeText={(text) => setName(text)}
                />
                <CustomButton title="Collect Gift" onPress={handleShowCard} />
                {!showAttributesForm &&
                  name.toUpperCase().includes('GAYATHRI') && (
                    <TouchableOpacity onPress={handleAttributesLinkPress}>
                      <Text style={styles.attributesLink}>
                        Enter Attributes
                      </Text>
                    </TouchableOpacity>
                  )}
              </>
            </View>

            <Modal
              visible={showAttributesForm}
              animationType="slide"
              transparent={true}>
              <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                  <Text style={styles.formHeading}>Enter Attributes</Text>
                  <AttributesForm onSaveAttributes={handleSaveAttributes} />
                  <TouchableOpacity
                    onPress={() => setShowAttributesForm(false)}>
                    <Text style={styles.closeButton}>Close</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          </View>
        </ImageBackground>
      ):
     (
        <View style={styles.container}>
          <BirthdayCard
            name={selectedPerson?.name}
            attributes={filteredAttributes}
            onBackToHome={handleBackToHome}
          />
        </View>
      )}
      
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  loginContainer: {
    width: '80%',
    padding: 20,
    backgroundColor: '#bb9858',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
    color: 'white',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    color: 'white',
  },
  formHeading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  attributesLink: {
    fontSize: 16,
    color: 'white',
    textDecorationLine: 'underline',
    marginBottom: 10,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  closeButton: {
    fontSize: 16,
    color: '#525252',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
});

export default App;
