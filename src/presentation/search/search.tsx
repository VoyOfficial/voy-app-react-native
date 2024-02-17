import React from 'react';
import CardList, { Place } from '../components/cardList';
import {
  CardListWrapper,
  Container,
  FilterButton,
  FilterButtonWrapper,
  FilterIcon,
  FilterModalWrapper,
  HeaderWrapper,
  SearchIcon,
  SearchIconWrapper,
  SearchInput,
  SearchInputWrapper,
} from './styles';
import FilterModalFactory from './modal';

export type SearchViewModel = {
  searchValue: string;
  placeList: Array<Place>;
  changeSearch: (value: string) => void;
  searchTo: (value: string) => Promise<void>;
  filter: () => void;
  showFilterOptions: boolean;
};

const CardListFactory = ({ placeList }: { placeList: Array<Place> }) => (
  <CardList
    title={''}
    seeAllBy={''}
    seeAll={() => {}}
    placeList={placeList}
    favorite={() => {}}
    showSeeAllButton={false}
    showMoreDetails={() => {}}
  />
);

const Search = ({
  searchValue,
  showFilterOptions,
  placeList,
  changeSearch,
  searchTo,
  filter,
}: SearchViewModel) => {
  return (
    <Container>
      <HeaderWrapper>
        <FilterButtonWrapper>
          <FilterButton testID="filter_button_id" onPress={filter}>
            <FilterIcon testID="filter_id" name="filter" />
          </FilterButton>
        </FilterButtonWrapper>
        <SearchInputWrapper>
          <SearchInput
            testID="search_input_id"
            placeholder="Pesquisar lugares..."
            value={searchValue}
            onChangeText={changeSearch}
            onSubmitEditing={() => searchTo(searchValue)}
          />
          <SearchIconWrapper>
            <SearchIcon testID="search_id" name="search" />
          </SearchIconWrapper>
        </SearchInputWrapper>
      </HeaderWrapper>
      {searchValue !== '' && (
        <CardListWrapper>
          <CardListFactory placeList={placeList} />
        </CardListWrapper>
      )}
      {showFilterOptions && (
        <FilterModalWrapper>
          <FilterModalFactory />
        </FilterModalWrapper>
      )}
    </Container>
  );
};

export default Search;
