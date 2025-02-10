import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Icon from '../../assets/fonts/Voy';

const dimensions = Dimensions.get('screen');

export type ErrorContent = {
  title: string;
  message: string;
};

type Props = {
  content: ErrorContent;
  tryAgain: () => void;
};

const Title = ({ text }: { text: string }) => (
  <Text
    style={{
      fontSize: 22,
      padding: 4,
      color: '#212121',
      fontFamily: 'LexendDeca-Regular',
    }}
  >
    {text}
  </Text>
);

const Message = ({ text }: { text: string }) => (
  <Text
    style={{ fontSize: 16, color: '#212121', fontFamily: 'LexendDeca-Regular' }}
  >
    {text}
  </Text>
);

const Error = ({ content, tryAgain }: Props) => {
  const { title, message } = content;
  return (
    <View
      style={{
        position: 'absolute',
        backgroundColor: '#F1F5F6',
        justifyContent: 'center',
        alignItems: 'center',
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <Icon testID="sad_icon_id" name="sad" size={46} color="#212121" />
      {title && message ? (
        <View
          style={{
            paddingVertical: 26,
            alignItems: 'center',
          }}
        >
          <Title text={title} />
          <Message text={message} />
        </View>
      ) : (
        <View
          style={{
            paddingVertical: 26,
            alignItems: 'center',
          }}
        >
          <Title text={'Aaaah não'} />
          <Message text={'Parece que tivemos um imprevito.'} />
        </View>
      )}
      <TouchableOpacity
        testID="button_try_again_id"
        style={{ backgroundColor: '#5452F6', padding: 10, borderRadius: 10 }}
        onPress={tryAgain}
      >
        <Text style={{ color: '#FFFFFF', fontFamily: 'LexendDeca-Regular' }}>
          {'Tente novamente'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Error;
