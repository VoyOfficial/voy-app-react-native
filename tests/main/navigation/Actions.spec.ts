import { NavigationContainerRef } from '@react-navigation/native';
import Actions from '../../../src/main/navigation/Actions';

describe('Navigation: Actions', () => {
  test('should dispatch navigate of CommonActions when calling navigate', () => {
    const navigator = {
      dispatch: jest.fn(),
    };

    const CommonActions = {
      navigate: jest.fn(),
    };
    const sut = new Actions(
      navigator as unknown as NavigationContainerRef<any>,
      CommonActions,
    );

    sut.navigate('any_name', { param: 'any_param' });

    expect(navigator.dispatch).toHaveBeenCalledTimes(1);
    expect(CommonActions.navigate).toHaveBeenCalledTimes(1);
    expect(CommonActions.navigate).toHaveBeenCalledWith({
      name: 'any_name',
      params: { param: 'any_param' },
    });
  });

  test('should dispatch go back of CommonActions when calling goBack', () => {
    const navigator = {
      dispatch: jest.fn(),
    };

    const CommonActions = {
      navigate: jest.fn(),
      goBack: jest.fn(),
    };
    const sut = new Actions(
      navigator as unknown as NavigationContainerRef<any>,
      CommonActions,
    );

    sut.goBack();

    expect(navigator.dispatch).toHaveBeenCalledTimes(1);
    expect(CommonActions.goBack).toHaveBeenCalledTimes(1);
    expect(CommonActions.goBack).toHaveBeenCalledWith();
  });
});
