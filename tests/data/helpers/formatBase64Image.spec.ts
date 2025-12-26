import { formatBase64Image } from '~/data/helpers';

describe('Data: formatBase64Image', () => {
  test('should return empty string when base64String is empty', () => {
    const result = formatBase64Image('');

    expect(result).toBe('');
  });

  test('should return original string when it already starts with data:', () => {
    const base64WithPrefix =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA';

    const result = formatBase64Image(base64WithPrefix);

    expect(result).toBe(base64WithPrefix);
  });

  test('should add data:image/png;base64 prefix when not present', () => {
    const base64String = 'iVBORw0KGgoAAAANSUhEUgAAAAUA';

    const result = formatBase64Image(base64String);

    expect(result).toBe('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA');
  });

  test('should handle different data URI schemes', () => {
    const jpegBase64 = 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD';

    const result = formatBase64Image(jpegBase64);

    expect(result).toBe(jpegBase64);
  });
});
