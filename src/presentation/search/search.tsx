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
  showMoreDetails: (place: Place) => void;
};

const CardListFactory = ({
  placeList,
  showMoreDetails,
}: {
  placeList: Array<Place>;
  showMoreDetails: (place: Place) => void;
}) => (
  <CardList
    title={''}
    seeAllBy={''}
    seeAll={() => {}}
    placeList={placeList}
    favorite={() => {}}
    showSeeAllButton={false}
    showMoreDetails={showMoreDetails}
  />
);

const Search = ({
  searchValue,
  showFilterOptions,
  placeList,
  changeSearch,
  searchTo,
  filter,
  showMoreDetails,
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
          <CardListFactory
            placeList={placeList}
            showMoreDetails={showMoreDetails}
          />
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
