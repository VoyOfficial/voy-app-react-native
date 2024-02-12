import React from 'react';
import CardList, { Place } from '../components/cardList';
import FilterModal from './modal';
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

export type Props = {
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

const FilterModalFactory = () => (
  <FilterModal
    filterOptions={{
      filterBy: {
        label: 'Filtrar por',
        list: [
          { id: 1, label: 'Restaurantes', selected: false },
          { id: 2, label: 'Cafeterias', selected: false },
          { id: 3, label: 'Entretenimento', selected: false },
          { id: 4, label: 'Hotéis', selected: false },
          { id: 5, label: 'Lazer', selected: false },
          { id: 6, label: 'Esportes', selected: false },
          { id: 7, label: 'Vida noturna', selected: false },
        ],
      },
      orderBy: {
        label: 'Ordernar por',
        list: [
          { id: 1, label: 'Mais avaliados' },
          { id: 2, label: 'Mais comentados' },
          { id: 3, label: 'Distância' },
        ],
        selected: { id: 1, label: 'Mais avaliados' },
      },
    }}
    selectFilter={() => {}}
    selectOrder={() => {}}
    showOrderList={true}
    showFilterList={true}
    changeShowOfOrderList={() => {}}
    changeShowOfFilterList={() => {}}
  />
);

const Search = ({
  searchValue,
  showFilterOptions,
  placeList,
  changeSearch,
  searchTo,
  filter,
}: Props) => {
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
