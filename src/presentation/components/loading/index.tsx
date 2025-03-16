import React from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';

const dimensions = Dimensions.get('screen');

const Loading = () => {
  return (
    <View
      style={{
        position: 'absolute',
        width: dimensions.width,
        height: dimensions.height,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F1F5F6',
      }}
    >
      <ActivityIndicator testID="loading_animation_id" size={'large'} />
    </View>
  );
};

export default Loading;
