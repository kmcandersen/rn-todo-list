import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function Task({ text }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemLeft}>
        <TouchableOpacity style={styles.square}></TouchableOpacity>
        <Text style={styles.itemText}>{text}</Text>
      </View>

      <View style={styles.circular}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  circular: {
    width: 12,
    height: 12,
    borderColor: '#683BB7',
    borderWidth: 2,
    borderRadius: 5,
  },
  container: {},
  item: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  square: {
    backgroundColor: '#683BB7',
    // backgroundColor: '#9370D1',
    borderRadius: 5,
    marginRight: 15,
    // opacity: 0.4,
    height: 24,
    width: 24,
  },
  itemText: {
    maxWidth: '80%',
  },
});

export default Task;
