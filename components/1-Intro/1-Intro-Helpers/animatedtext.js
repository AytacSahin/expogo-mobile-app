import React, { useEffect, useState } from 'react';
import { Text, StyleSheet } from 'react-native';

const AnimatedText = ({ text, style }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let isMounted = true; // Eklenen satır

    if (currentIndex < text.length && isMounted) {
      const timer = setTimeout(() => {
        setDisplayedText((prevText) => prevText + text[currentIndex]);
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }, 300);

      return () => {
        clearTimeout(timer);
        isMounted = false; // Eklenen satır
      };
    }
  }, [currentIndex, text]);

  return (
    <Text style={[styles.text, style]}>
      {displayedText}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 40,
    color: '#f0f0f0',
    letterSpacing: 32,
    lineHeight: 130,
    fontWeight: 'bold',
    marginTop: 25,
    marginLeft: 25,
    marginRight: 25,
  },
});

export default AnimatedText;
