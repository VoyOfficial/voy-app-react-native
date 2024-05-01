import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import Icon from '../../assets/fonts/Voy';

export type ErrorContent = {
  title: string;
  message: string;
};

type Props = {
  content: ErrorContent;
  tryAgain: () => void;
};

const Error = ({ content, tryAgain }: Props) => {
  const { title, message } = content;
  return (
    <>
      <Icon testID="sad_icon_id" name="sad" />
      {title && message ? (
        <>
          <Text>{title}</Text>
          <Text>{message}</Text>
        </>
      ) : (
        <>
          <Text>{'Aaaah não'}</Text>
          <Text>{'Parece que tivemos um imprevito.'}</Text>
        </>
      )}
      <TouchableOpacity testID="button_try_again_id" onPress={tryAgain}>
        <Text>{'Tente novamente'}</Text>
      </TouchableOpacity>
    </>
  );
};

export default Error;
