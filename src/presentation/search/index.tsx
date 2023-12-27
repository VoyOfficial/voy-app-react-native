import React from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';
import Icon from '../assets/fonts/Voy';
import FilterModal from './modal';

type Props = {
  searchValue: string;
  changeSearch: (value: string) => void;
  searchTo: (value: string) => void;
  filter: () => void;
  showFilterOptions: boolean;
};

const Search = ({
  searchValue,
  showFilterOptions,
  changeSearch,
  searchTo,
  filter,
}: Props) => {
  return (
    <View style={{ paddingTop: 80 }}>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 20,
        }}
      >
        <View style={{ paddingRight: 21 }}>
          <TouchableOpacity testID="filter_button_id" onPress={filter}>
            <Icon
              testID="filter_id"
              name="filter"
              size={22.5}
              color="#212121"
            />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            testID="search_input_id"
            placeholder="Pesquisar lugares..."
            value={searchValue}
            onChangeText={changeSearch}
            onSubmitEditing={() => searchTo(searchValue)}
            style={{
              backgroundColor: '#FFFFFF',
              paddingVertical: 11,
              paddingLeft: 16,
              borderRadius: 13,
            }}
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              justifyContent: 'center',
              alignItems: 'center',
              paddingRight: 8.5,
            }}
          >
            <Icon
              testID="search_id"
              name="search"
              size={22.5}
              color="#B3B3B3"
            />
          </View>
        </View>
      </View>
      {showFilterOptions && (
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
        />
      )}
    </View>
  );
};

export default Search;
