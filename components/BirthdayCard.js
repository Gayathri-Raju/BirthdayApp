import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageBackground, Animated, Easing } from 'react-native';
import { AntDesign } from '@expo/vector-icons'; 

const BirthdayCard = ({ name, attributes, onBackToHome }) => {
  const [balloonPosition] = useState(new Animated.Value(0));
  const [showText, setShowText] = useState(false);

  const startAnimation = () => {
    Animated.timing(balloonPosition, {
      toValue: 1,
      duration: 3000,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setShowText(true); // Show the text after the animation finishes
    });
  };

  useEffect(() => {
    startAnimation();
  }, []);

  const translateY = balloonPosition.interpolate({
    inputRange: [0, 1],
    outputRange: [-200, 200],
  });

  const toCamelCase = (name) => {
    const words = name.trim().split(/\s+/);
    return words
      .map((word, index) => {
        if (index === 0) {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        } else {
          return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
        }
      })
      .join(' ');
  };

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity style={styles.backButton} onPress={onBackToHome}>
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>
      <Animated.View style={[styles.balloonsContainer, { transform: [{ translateY }] }]}>
        <Image source={require('../assets/goldballon.jpg')} style={styles.balloon} />
      </Animated.View>

      {showText && (
        <View style={styles.textContainer}>
          <Text style={styles.greeting}>
            Happy birthday to you,
          </Text>
          <Text style={styles.name}>
            {toCamelCase(name)}
          </Text>
          <Text style={styles.subgreeting}>
            Stay true to your kind and loving nature, and may good things always happen to you
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    marginBottom: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    height: '100%',
    backgroundColor: '#000000',
  },
  greeting: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subgreeting: {
    marginTop: 10,
    fontSize: 12,
    fontWeight: 'normal',
    color: 'white',
    textAlign: 'center',
  },
  textContainer: {
    position: 'absolute',
    top: '10%',
    width: '80%',
    padding: 10,
    backgroundColor: '#bb9858',
    borderRadius: 10,
    alignItems: 'center',
  },
  balloonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 40,
    marginTop: 20,
    height: 300, 
  },
  balloon: {
    width: '80%',
    height: '100%', 
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    padding: 10,
    zIndex: 1,
  },
})

export default BirthdayCard
