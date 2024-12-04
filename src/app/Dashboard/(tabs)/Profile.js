import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { AntDesign, Ionicons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const Profile = () => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const toggleSwitch = () => setIsDarkMode((prevState) => !prevState);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}
    >
      {/* Cover Photo */}
      <Image source={require('../../../../assets/cha1.png')} style={styles.coverPhoto} />

      {/* Profile Info */}
      <View style={styles.profileContainer}>
        <Image
          source={require('../../../../assets/cha1.png')}
          style={[
            styles.profileImage,
            { borderColor: isDarkMode ? '#000' : '#fff' },
          ]}
        />
      </View>
      <View style={styles.profileDetails}>
        <Text style={[styles.name, { color: isDarkMode ? '#fff' : '#000' }]}>
          Charlene R. Lusterio
        </Text>
        <Text style={[styles.subText, { color: isDarkMode ? '#b0b0b0' : 'gray' }]}>
          1.5k friends
        </Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.editProfileButton}>
        <Text style={styles.editProfileText}>Edit profile</Text>
      </TouchableOpacity>

      {/* Bio */}
      <View style={styles.bioSection}>
        <Text style={[styles.bioLabel, { color: isDarkMode ? '#fff' : '#000' }]}>Bio:</Text>
        <Text style={[styles.bioText, { color: isDarkMode ? '#fff' : '#000' }]}>
          dili na magpaka tanga
        </Text>
      </View>

      {/* Social Media Section */}
      <View style={styles.detailsSection}>
        <Text style={[styles.detailsTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
          Social Media Accounts
        </Text>
        {[{ name: 'instagram', account: 'eyitsmecha', icon: AntDesign },
          { name: 'twitter', account: 'luvavocuddle', icon: Entypo },
          { name: 'tiktok', account: 'rorror_rorurboat', icon: FontAwesome5 },
        ].map(({ name, account, icon: Icon }, idx) => (
          <View key={idx} style={styles.detailsContent}>
            <Icon name={name} size={24} color={isDarkMode ? '#fff' : '#000'} />
            <Text style={{ color: '#1e90ff', fontWeight: 'bold', marginLeft: 5 }}>
              {account}
            </Text>
          </View>
        ))}
      </View>

      {/* Contact Info */}
      <View style={styles.detailsSection}>
        <Text style={[styles.detailsTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
          Contact Info
        </Text>
        {[{ name: 'call', value: '+63 9979617157' },
          { name: 'mail', value: 'charleneelusterio@gmail.com' },
        ].map(({ name, value }, idx) => (
          <View key={idx} style={styles.detailsContent}>
            <Ionicons name={name} size={24} color={isDarkMode ? '#fff' : '#000'} />
            <Text style={{ color: isDarkMode ? '#fff' : '#000', marginLeft: 5 }}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Basic Info */}
      <View style={styles.detailsSection}>
        <Text style={[styles.detailsTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
          Basic Info
        </Text>
        {[{ name: 'person', value: 'Female' },
          { name: 'calendar', value: 'June 4, 2004' },
          { name: 'pricetags', value: 'Pronouns: she/they' },
        ].map(({ name, value }, idx) => (
          <View key={idx} style={styles.detailsContent}>
            <Ionicons name={name} size={24} color={isDarkMode ? '#fff' : '#000'} />
            <Text style={{ color: isDarkMode ? '#fff' : '#000', marginLeft: 5 }}>{value}</Text>
          </View>
        ))}
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: isDarkMode ? '#fff' : '#000' }]}>
          Settings
        </Text>
        <View style={styles.optionContainer}>
          <Text style={[styles.optionText, { color: isDarkMode ? '#fff' : '#000' }]}>
            Dark Mode
          </Text>
          <Switch value={isDarkMode} onValueChange={toggleSwitch} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  coverPhoto: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  profileContainer: {
    alignItems: 'center',
    marginTop: -40,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
  },
  profileDetails: {
    alignItems: 'center',
    marginTop: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  subText: {
    color: 'gray',
    marginTop: 5,
    fontSize: 14,
  },
  editProfileButton: {
    backgroundColor: '#e7e7e7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  editProfileText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bioSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  bioLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bioText: {
    fontSize: 16,
    marginLeft: 5,
    fontStyle: 'italic',
  },
  detailsSection: {
    marginTop: 15,
    paddingHorizontal: 20,
  },
  detailsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailsContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  optionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
  },
});

export default Profile;
