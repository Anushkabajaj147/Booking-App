import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';

const App = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [formattedDate, setFormattedDate] = useState('');

  const onDayPress = (day) => {
    // Format the date using moment
    const date = moment(day.dateString).format('DD-MM-YYYY');
    const dayName = moment(day.dateString).format('dddd');

    // Update the state
    setSelectedDate(day.dateString);
    setFormattedDate(`Date: ${date}, Day: ${dayName}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Date</Text>

      {/* Calendar */}
      <Calendar
      theme={{
        calendarBackground: '#fff',
        // Header styling (Month and Arrows)
        textMonthFontSize: 20,
        textMonthFontWeight: 'bold',
        monthTextColor: '#000',
        arrowColor: '#000',
        arrowStyle: { marginHorizontal: -10 },
        // Day names (Sun, Mon, etc.)
        textSectionTitleColor: '#333',
        textDayHeaderFontSize: 14,
        textDayHeaderFontWeight: 'bold',
        // Dates Styling
        dayTextColor: '#000',
        todayTextColor: '#ff6347',
        selectedDayBackgroundColor: '#4caf50',
        selectedDayTextColor: '#fff',
      }}
        onDayPress={onDayPress}
        markedDates={{
          [selectedDate]: {
            selected: true,
            marked: true,
            selectedColor: 'blue',
          },
        }}
      />

      {/* Date Display */}
      <TextInput
        style={styles.input}
        value={formattedDate}
        placeholder="Selected Date"
        editable={false} // Make the field read-only
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginTop: 20,
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default App;
