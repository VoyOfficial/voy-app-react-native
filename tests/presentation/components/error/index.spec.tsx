import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { fireEvent, render } from '@testing-library/react-native';
import Icon from '../../../../src/presentation/assets/fonts/Voy';

describe('Components: Error', () => {
  test('should show error content correctly', () => {
    const content: ErrorContent = {
      message: 'any_message',
      title: 'any_title',
    };
    const { getByText } = render(
      <Error content={content} tryAgain={() => {}} />,
    );

    expect(getByText(content.title)).toBeTruthy();
    expect(getByText(content.message)).toBeTruthy();
  });

  test('should show generic error content', () => {
    const content: ErrorContent = {
      message: '',
      title: '',
    };
    const { getByText } = render(
      <Error content={content} tryAgain={() => {}} />,
    );

    expect(getByText('Aaaah não')).toBeTruthy();
    expect(getByText('Parece que tivemos um imprevito.')).toBeTruthy();
  });

  test('should show error icon', () => {
    const content: ErrorContent = {
      message: '',
      title: '',
    };
    const { getByTestId } = render(
      <Error content={content} tryAgain={() => {}} />,
    );

    expect(getByTestId('sad_icon_id')).toBeTruthy();
  });

  test('should call tryAgain function when pressing the button', () => {
    const tryAgain = jest.fn();
    const content: ErrorContent = {
      message: '',
      title: '',
    };
    const { getByTestId } = render(
      <Error content={content} tryAgain={tryAgain} />,
    );

    fireEvent.press(getByTestId('button_try_again_id'));

    expect(tryAgain).toHaveBeenCalledTimes(1);
  });
});

type ErrorContent = {
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
