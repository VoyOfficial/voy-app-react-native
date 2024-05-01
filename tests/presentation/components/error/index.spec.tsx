import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

describe('Components: Error', () => {
  test('should show error content correctly', () => {
    const content: ErrorContent = {
      message: 'any_message',
      title: 'any_title',
    };
    const { getByText } = render(<Error content={content} />);

    expect(getByText(content.title)).toBeTruthy();
    expect(getByText(content.message)).toBeTruthy();
  });

  test('should show generic error content', () => {
    const content: ErrorContent = {
      message: '',
      title: '',
    };
    const { getByText } = render(<Error content={content} />);

    expect(getByText('Aaaah não')).toBeTruthy();
    expect(getByText('Parece que tivemos um imprevito.')).toBeTruthy();
  });
});

type ErrorContent = {
  title: string;
  message: string;
};

type Props = {
  content: ErrorContent;
};

const Error = ({ content }: Props) => {
  const { title, message } = content;
  return (
    <>
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
    </>
  );
};
