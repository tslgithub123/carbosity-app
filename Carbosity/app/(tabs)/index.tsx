import React, { useState } from 'react';
import { StyleSheet, Platform, ScrollView, Dimensions, useColorScheme, View, Image } from 'react-native';
import {
  Surface,
  Card,
  IconButton,
  Button,
  useTheme,
  Avatar,
  ProgressBar,
  MD3Colors,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import useAuthStore from '@/store/useAuthStore';
import { MaterialTheme } from '@/constants/MaterialTheme';
import { router, useNavigation } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const { user } = useAuthStore.getState();
  const colorScheme = useColorScheme();
  const THEME_COLORS = colorScheme === 'dark' ? MaterialTheme.schemes.dark : MaterialTheme.schemes.light;
  const [contentHeight, setContentHeight] = useState(0);
  const navigation = useNavigation();

  const renderScoreCard = (title, score, finScore, ecoScore, color, icon, description) => (
    <Card
      style={[
        styles.scoreCard,
        {
          backgroundColor: THEME_COLORS.surfaceContainer,
        },
      ]}
    >
      <Card.Content style={styles.scoreCardContent}>
        <MaterialCommunityIcons name={icon} size={32} color={color} />
        <ThemedText type="subtitle" style={{ color: THEME_COLORS.onSurface }}>
          {title}
        </ThemedText>
        <ThemedText style={[styles.scoreText, { color }]}>{score}</ThemedText>
        
        <ThemedText style={{ color: THEME_COLORS.onSurfaceVariant }}>{description}</ThemedText>
        {!(title === 'Your Carbon Emissions') && <View style={styles.subScoresContainer}>
         
        <ThemedText style={[styles.subScoreText, { color: THEME_COLORS.onSurfaceVariant }]}>
            EcoScore: {ecoScore}
          </ThemedText>
          <ThemedText style={[styles.subScoreText, { color: THEME_COLORS.onSurfaceVariant }]}>
            FinScore: {finScore}
          </ThemedText>
          
        </View>}
      </Card.Content>
    </Card>
  );
  

  const renderQuickAction = (icon, label, onPress) => (
    <Surface
      style={[styles.quickAction, {
        backgroundColor: THEME_COLORS.surfaceContainerHigh,
      }]}
    >
      <IconButton
        icon={icon}
        size={28}
        onPress={onPress}
        mode="contained"
        containerColor={THEME_COLORS.primaryContainer}
        iconColor={THEME_COLORS.onPrimaryContainer}
      />
      <ThemedText
        style={[styles.quickActionLabel, {
          color: THEME_COLORS.onSurface
        }]}
      >
        {label}
      </ThemedText>
    </Surface>
  );

  const handleLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  return (
    <ThemedView style={styles.container}>
      <ScrollView
        style={[styles.scrollContent, {
          backgroundColor: THEME_COLORS.background,
          marginBottom: 80,
        }]}
        onLayout={handleLayout}
      >
        {/* Header Section */}
        <ThemedView
          style={[styles.header, {
            backgroundColor: THEME_COLORS.surface,
            borderBottomColor: THEME_COLORS.surfaceVariant,
            borderBottomWidth: 1,
          }]}
        >
          <ThemedView style={styles.headerContent}>
            <ThemedView style={styles.userInfo}>
              <Avatar.Icon
              icon="leaf"
              size={40}
              color={THEME_COLORS.onPrimaryContainer}
              style={{ backgroundColor: THEME_COLORS.primaryContainer }}
              />
              <ThemedView style={styles.headerTextContainer}>
              <ThemedText
                style={[styles.nameText, {
                color: THEME_COLORS.onSurface,
                fontSize: 20,
                }]}
              >
                Carbosity
              </ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
          <ThemedView style={styles.headerActions}>
            <IconButton
              icon="bell"
              size={24}
              iconColor={THEME_COLORS.onSurfaceVariant}
              onPress={() => {}}
            />
            <Avatar.Text
                label={user?.firstName?.[0] || 'U'}
                size={40}
                color={THEME_COLORS.onPrimaryContainer}
                style={{ backgroundColor: THEME_COLORS.primaryContainer }}
              />
          </ThemedView>
          
        </ThemedView>
        {/* {renderScoreCard('Your carbon emissions', '154 kg', THEME_COLORS.secondary, 'leaf', "It's higher than the average monthly carbon footprint of Indians.")}
          {renderScoreCard('Your Expenditure', '₹27384', THEME_COLORS.tertiary,'apple', 'finance')}
      */}

        {/* Scores Section */}
        <ThemedView style={styles.scoresContainer}>
  {renderScoreCard(
    'Your Carbon Emissions',
    '154 kg',
    '5/10',
    '7.2/10',
    THEME_COLORS.secondary,
    'leaf',
    "It's higher than the average monthly carbon footprint of Indians."
  )}
  {renderScoreCard(
    'Your Expenditure',
    '₹27384',
    '6.8/10',
    '8.3/10',
    THEME_COLORS.tertiary,
    'finance',
    'Based on your recent spending habits.'
  )}
</ThemedView>

        {/* Quick Actions */}
        {/* <ThemedView
          style={[styles.section, {
            backgroundColor: THEME_COLORS.surface,
          }]}
        >
          <ThemedText
            type="subtitle"
            style={{ color: THEME_COLORS.onSurface }}
          >
            Quick Actions
          </ThemedText>
          <ThemedView style={styles.quickActionsGrid}>
            {renderQuickAction('lightning-bolt', 'Electricity', () => {})}
            {renderQuickAction('car', 'Transport', () => {})}
            {renderQuickAction('food', 'Food', () => {})}
          </ThemedView>
        </ThemedView> */}

        <ThemedView style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/comparison.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Button
            mode="contained"
            onPress={() => {navigation.navigate('Lifestyle' as never) }}
            style={styles.viewDetailsButton}
          >
            View Details
          </Button>
        </ThemedView>
        

        {/* Recent Transactions */}
        <ThemedView
          style={[styles.section, {
            backgroundColor: THEME_COLORS.surface
          }]}
        >
          <ThemedText
            type="subtitle"
            style={{ color: THEME_COLORS.onSurface }}
          >
            Recent Activity
          </ThemedText>
          <Card
            style={[styles.transactionCard, {
              backgroundColor: THEME_COLORS.surfaceContainer,
            }]}
          >
            {[1, 2, 3].map((_, index) => (
              <Card.Title
                key={index}
                title="Electricity Bill"
                subtitle="Yesterday"
                titleStyle={{ color: THEME_COLORS.onSurface }}
                subtitleStyle={{ color: THEME_COLORS.onSurfaceVariant }}
                left={(props) => (
                  <Avatar.Icon
                    {...props}
                    icon="flash"
                    color={THEME_COLORS.onPrimaryContainer}
                    style={{ backgroundColor: THEME_COLORS.primaryContainer }}
                  />
                )}
                right={(props) => (
                  <ThemedText
                    {...props}
                    style={[styles.transactionAmount, {
                      color: THEME_COLORS.tertiary
                    }]}
                  >
                    -2.5 kg CO₂
                  </ThemedText>
                )}
              />
            ))}
          </Card>
        </ThemedView>
        
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  header: {
    paddingBottom: 28,
    paddingHorizontal: 16,
  },
  headerContent: {
    paddingTop: Platform.OS === 'ios' ? 60 : 30,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flex: 1,
  },
  userInfo: {
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTextContainer: {
    gap: 0,
  },
  welcomeText: {
    fontWeight: '400',
  },
  nameText: {
    fontWeight: '600',
  },
  headerActions: {
    paddingTop: Platform.OS === 'ios' ? 60 : 41,
    paddingRight: 16,
    
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
  },
  scoresContainer: {
    flexDirection: 'row',
    padding: 16,
    gap:16,
    height: 'auto',
    marginTop: -24,
  },
  scoreCard: {
    flex: 1,
   
  },
  scoreCardContent: {
    //alignItems: 'center',
    gap: 8,
  },
  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
  },

  section: {
    padding: 16,
    gap: 12,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 8,
    gap: 16,
    justifyContent: 'space-between',
  },
  quickAction: {
    width: (width - 48) / 4,
    alignItems: 'center',
    gap: 4,
    padding: 8,
    borderRadius: 12,
  },
  quickActionLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  transactionCard: {},
  transactionAmount: {
    marginRight: 16,
  },
  imageContainer: {
    padding: 16,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    aspectRatio: 1,
    borderRadius: 12,
  },
  viewDetailsButton: {
    position: 'absolute',
    bottom: '10%',
    alignSelf: 'center',
  },
});
