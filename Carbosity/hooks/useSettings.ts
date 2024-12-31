// hooks/useSettings.js
import { useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useSettings = () => {
    const [settings, setSettings] = useState({
        darkMode: false,
        notifications: false,
    });

    const updateSettings = useCallback(async (key: string, value: boolean) => {
        try {
            await AsyncStorage.setItem(`setting_${key}`, JSON.stringify(value));
            setSettings(prev => ({
                ...prev,
                [key]: value
            }));
        } catch (error) {
            console.error('Error updating settings:', error);
        }
    }, []);

  
    useEffect(() => {
        const loadSettings = async () => {
            try {
                const darkMode = await AsyncStorage.getItem('setting_darkMode');
                const notifications = await AsyncStorage.getItem('setting_notifications');
                
                setSettings({
                    darkMode: darkMode ? JSON.parse(darkMode) : false,
                    notifications: notifications ? JSON.parse(notifications) : false,
                });
            } catch (error) {
                console.error('Error loading settings:', error);
            }
        };

        loadSettings();
    }, []);

    return { settings, updateSettings };
};