import {
  CommonActions as Common,
  NavigationContainerRef,
} from '@react-navigation/native';

export default class Actions {
  constructor(
    private readonly navigator: NavigationContainerRef<any>,
    private readonly CommonActions: any = Common,
  ) {}

  navigate = (routeName: string, params: any) => {
    this.navigator.dispatch(
      this.CommonActions.navigate({ name: routeName, params }),
    );
  };

  goBack = () => {
    this.navigator.dispatch(this.CommonActions.goBack());
  };
}
