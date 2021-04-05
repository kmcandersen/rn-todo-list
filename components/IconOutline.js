import React from 'react';
import { View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

function IconOutline({ iconColor = '#FFF', size = 36 }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <FontAwesome name='circle-thin' color={iconColor} size={size} />
    </View>
  );
}

export default IconOutline;
