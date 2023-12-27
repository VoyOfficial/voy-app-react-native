import React from 'react';
import { TextInput, View } from 'react-native';

type Props = {
  searchValue: string;
  changeSearch: (value: string) => void;
  searchTo: (value: string) => void;
};

const Search = ({ searchValue, changeSearch, searchTo }: Props) => {
  return (
    <View>
      <TextInput
        testID="search_input_id"
        placeholder="Pesquisar lugares..."
        value={searchValue}
        onChangeText={changeSearch}
        onSubmitEditing={() => searchTo(searchValue)}
      />
    </View>
  );
};

export default Search;
