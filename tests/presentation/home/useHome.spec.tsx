import { renderHook } from '@testing-library/react-native';

describe('Presentation: useHome', () => {
  test('should call navigate function correctly when call onSeeAll function', () => {
    const navigate = jest.fn();
    const { result } = renderHook(() => useHome({ navigate }));

    result.current.onSeeAll();

    expect(navigate).toHaveBeenCalledTimes(1);
    expect(navigate).toHaveBeenCalledWith('PlaceDetails');
  });
});

type HomeViewModel = {
  onSeeAll: () => void;
};

type GenericObject = { [key: string]: any };

type Props = {
  navigate: (routeName: string, params?: GenericObject | undefined) => void;
};

const useHome = ({ navigate }: Props): HomeViewModel => {
  const onSeeAll = () => {
    navigate('PlaceDetails');
  };
  return { onSeeAll };
};
