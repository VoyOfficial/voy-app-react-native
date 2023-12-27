import React from 'react';
import { TextInput, View } from 'react-native';
import Icon from '../assets/fonts/Voy';

type Props = {
  searchValue: string;
  changeSearch: (value: string) => void;
  searchTo: (value: string) => void;
};

const Search = ({ searchValue, changeSearch, searchTo }: Props) => {
  return (
    <View style={{ paddingTop: 80 }}>
      <View>
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
          <Icon testID="search_id" name="search" size={22.5} color="#B3B3B3" />
        </View>
      </View>
    </View>
  );
};

export default Search;
