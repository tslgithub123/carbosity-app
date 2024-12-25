import { supabase } from '@/utils/supabase';
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList } from 'react-native';

export default function Test() {
    interface User {
        id: number;
        email: string;
    }

    const [users, setUsers] = useState<User[]>([]);

    const getUsers = async () => {
        try {
            const { data: users, error } = await supabase.from('users').select('*');
            if (error) {
                console.error('Error fetching users:', error.message);
                return;
            }

            if (users && users.length > 0) {
                console.log('Users:', users);
                // setUsers(users);
            }
        } catch (error) {
            if (error instanceof Error) {
                console.error('Error fetching users:', error.message);
            } else {
                console.error('Unknown error fetching users');
            }
        }
    };

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>User List </Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <Text key={item.id}>{item.email}</Text>}
            />
        </View>
    );
}
