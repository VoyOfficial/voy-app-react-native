import Filter, {
  getOptions,
} from '../../../../src/presentation/search/model/Filter';

describe('Model: Filter', () => {
  test('should start options correctly when initialize the Filter', () => {
    const options = getOptions();
    const sut = new Filter(options);

    expect(sut.options).toEqual(options);
  });

  test('should update options correctly when to call selectFilter function', () => {
    const sut = new Filter(getOptions());

    const options = getOptions();
    expect(options.filterBy.list[4].selected).toEqual(false);
    expect(sut.options.filterBy.list[4].selected).toEqual(false);

    sut.selectFilter(options.filterBy.list[4], options);

    expect(options.filterBy.list[4].selected).toEqual(true);
    expect(sut.options.filterBy.list[4].selected).toEqual(true);
  });

  test('should update options correctly when to call selectOrder function', () => {
    const sut = new Filter(getOptions());

    const options = getOptions();
    expect(options.orderBy.selected).toEqual(options.orderBy.selected);
    expect(sut.options.orderBy.selected).toEqual(options.orderBy.selected);

    const optionSelected = options.orderBy.list[2];
    sut.selectOrder(optionSelected, options);

    expect(options.orderBy.selected).toEqual(optionSelected);
    expect(sut.options.orderBy.selected).toEqual(optionSelected);
  });
});
