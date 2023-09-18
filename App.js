import React from 'react';
import { View, StyleSheet } from 'react-native';
import Quiz from './Quiz';  // Adjust the path if you put Quiz in a different directory.

export default function App() {
    return (
        <View style={styles.container}>
            <Quiz />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c3e50',
    }
});
