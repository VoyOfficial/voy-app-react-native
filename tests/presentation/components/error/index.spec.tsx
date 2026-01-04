import React from 'react';
import { fireEvent } from '@testing-library/react-native';
import Error, {
  ErrorContent,
} from '../../../../src/presentation/components/error';
import { renderWithTheme } from '../../helpers/renderWithTheme';

describe('Components: Error', () => {
  test('should show error content correctly', () => {
    const content: ErrorContent = {
      message: 'any_message',
      title: 'any_title',
    };
    const { getByText } = renderWithTheme(
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
    const { getByText } = renderWithTheme(
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
    const { getByTestId } = renderWithTheme(
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
    const { getByTestId } = renderWithTheme(
      <Error content={content} tryAgain={tryAgain} />,
    );

    fireEvent.press(getByTestId('button_try_again_id'));

    expect(tryAgain).toHaveBeenCalledTimes(1);
  });
});
