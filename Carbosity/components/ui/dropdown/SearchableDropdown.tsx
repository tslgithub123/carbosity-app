import { ThemedText } from "@/components/ThemedText";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useMemo, useRef, useState } from "react";
import { FlatList, StyleSheet, TextInput, TouchableOpacity, View, TouchableWithoutFeedback, Keyboard } from "react-native";

interface Option {
    label: string;
    value: string;
    icon: any;
}

interface ThemeColors {
    surfaceVariant: string;
    primary: string;
    onSurface: string;
    onSurfaceVariant: string;
    surface: string;
    outlineVariant: string;
}

interface SearchableDropdownProps {
    options: Option[];
    onSelect: (value: string | null) => void;
    themeColors: ThemeColors;
}

export const SearchableDropdown = ({ options, onSelect, themeColors }: SearchableDropdownProps) => {
    const [isVisible, setIsVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState<Option | null>(null);
    const searchInputRef = useRef<TextInput>(null);

    const filteredOptions = useMemo(() => 
        options.filter(option =>
            option.label.toLowerCase().includes(searchQuery.toLowerCase())
        ),
        [options, searchQuery]
    );
    const handleSearchChange = (text: string) => {
        setSearchQuery(text);
        setIsVisible(true); 
      };

    const handleSelect = (option: Option) => {
        setSelectedOption(option);
        setSearchQuery('');
        setIsVisible(false);
        onSelect(option.value);
    };

    const handleClear = () => {
        setSearchQuery('');
        setSelectedOption(null);
        onSelect(null);
    };

    const SearchItem = ({ item }: { item: Option }) => (
        <TouchableOpacity
          style={[styles.searchItem, { backgroundColor: themeColors.surfaceVariant }]}
          onPress={() => handleSelect(item)}
        >
          <MaterialIcons 
            name={item.icon} 
            size={24} 
            color={themeColors.primary}
            style={styles.searchItemIcon}
          />
          <ThemedText style={styles.searchItemText}>{item.label}</ThemedText>
        </TouchableOpacity>
      );

    return (
        <View style={styles.searchContainer}>
          <View
            style={[
              styles.searchBar,
              { backgroundColor: themeColors.surfaceVariant },
              isVisible && styles.searchBarActive
            ]}
          >
            <MaterialIcons 
              name="search" 
              size={24} 
              color={themeColors.primary}
            />
            <TextInput
              ref={searchInputRef}
              style={[styles.searchInput, { color: themeColors.onSurface }]}
              placeholder={selectedOption ? selectedOption.label : "Search emission type"}
              placeholderTextColor={themeColors.onSurfaceVariant}
              value={searchQuery}
              onPress={() => setIsVisible(true)}
              onChangeText={handleSearchChange}
              accessible={true}
              accessibilityLabel="Search emission type"
            />
            {(selectedOption || searchQuery) && (
              <TouchableOpacity
                onPress={() => {
                  setSearchQuery('');
                  setSelectedOption(null);
                  onSelect(null);
                  setIsVisible(false);
                }}
              >
                <MaterialIcons 
                  name="close" 
                  size={24} 
                  color={themeColors.onSurfaceVariant}
                />
              </TouchableOpacity>
            )}
          </View>
    
          {isVisible  && (
            <View 
              style={[
                styles.dropdownList,
                { backgroundColor: themeColors.surface }
              ]}
            >
              <FlatList
                data={filteredOptions}
                renderItem={({ item }) => <SearchItem item={item} />}
                keyExtractor={item => item.value}
                
                ItemSeparatorComponent={() => (
                  <View 
                    style={[
                      styles.separator,
                      { backgroundColor: themeColors.surface }
                    ]}
                  />
                )}
                keyboardShouldPersistTaps="handled"
              />
            </View>
          )}
    
          {isVisible && (
            <TouchableOpacity
              style={styles.backdrop}
              onPress={() => {
                setIsVisible(false);
                setSearchQuery('');
              }}
            />
          )}
        </View>
      );
    };

const styles = StyleSheet.create({
    searchContainer: {
        marginBottom: 16,
        zIndex: 1000,
        //elevation: 1000,
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderRadius: 28,
        //elevation: 2,
    },
    searchBarActive: {
        elevation: 4,
    },
    searchInput: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        fontWeight: '400',
    },
    dropdownList: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        borderRadius: 8,
        //elevation: 8,
        maxHeight: 280,
        zIndex: 1001,
    },
    searchItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        elevation: 2,
        borderRadius: 28,
    },
    searchItemIcon: {
        marginRight: 16,
    },
    searchItemText: {
        fontSize: 16,
        fontWeight: '400',
    },
    separator: {
        height: 5,
        
    },
    backdrop: {
        position: 'absolute',
        top: 60,
        left: 0,
        right: 0,
        bottom: -1000,
        //backgroundColor: 'rgba(0, 0, 0, 0.1)',
        zIndex: 999,
    },
});
