import { Text, SafeAreaView, StyleSheet, ScrollView, Pressable, Modal, View, TextInput, Linking } from 'react-native';
import { Card, RadioButton } from 'react-native-paper';
import {useState, useEffect, useRef} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

var elected = '';
var notes = '';

function Sect({ weekDay, num }) {
  const [checked, setChecked] = useState(false);
  return (
     <Card style={styles.day}>
      <Text style={{ fontSize: 20, fontFamily: 'sans-serif-thin', color: '191970', margin: 'auto'}}>{weekDay}</Text>
      <RadioButton className="rad" uncheckedColor='purple' color='#4B0082' status={checked ? 'checked' : 'unchecked'} onPress={() => {setChecked(!checked); 
      if (!elected.includes(num)) {elected = elected + num;} else {elected = elected.replace(num, '');}}} />
      </Card>
  );
}

function Inner({ dayon }) {

 const [num, onChange] = useState(null);

   useEffect(() => {
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem(dayon);
        if (value !== null && value !== '') {
          onChange(value);
          notes = notes + dayon + ": " + value + "\n";
        }
      } catch (e) {
        console.error('Failed to load data.', e);
      }
    };
 
    loadData();
  }, []);

  const saveIt = async () => {
    try {
      await AsyncStorage.setItem(dayon, num);
       const value = await AsyncStorage.getItem(dayon);
       if (value !== null && value !== '') {
      notes = notes + dayon + ": " + value + "\n";
       }
    }
    catch (e) {
      console.error('Failed to save note', e);
    }
  };
  return (
    <Card style={{backgroundColor: '#F5F5DC'}}>
    <TextInput style={styles.input} value={num} placeholder={dayon} onChangeText={onChange} />
    <Pressable onPress={saveIt}>
    <Text style={styles.saver}>Save</Text>
    </Pressable>
    </Card>
  );
}


export default function App() {
  const [isVis, setVis] = useState(false);

  const [finVis, setFinVis] = useState(false);

  const scrollViewRef = useRef(null);

  const [nums, onChangeNums] = useState(0);

  const [name, onChangeName] = useState(null);

  const builder = (name) => {
var final = `${name} is available on the days of: `;
    if (elected.includes("1")) {
      final += '\nMonday';
    }
    if (elected.includes("2")) {
      final += '\nTuesday';
    }
    if (elected.includes("3")) {
      final += '\nWednesday';
    }
    if (elected.includes("4")) {
      final += '\nThursday';
    }
    if (elected.includes("5")) {
      final += '\nFriday';
    }
    if (elected.includes("6")) {
      final += '\nSaturday';
    }
    if (elected.includes("7")) {
      final += '\nSunday';
    }
    return final + '\n' + notes;
  };

const sendMess = () => {
const num = nums;
const body = builder(name);
 const url = `sms:${num}?body=${encodeURIComponent(body)}`;

  Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log('SMS is not supported on this device');
        } 
        else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  return (
    <SafeAreaView style={styles.container}>

    <Modal visible={isVis} animationType="fade" onRequestClose={() => setVis(!isVis)} presentationStyle="pageSheet">
    <View style={styles.container}>
    <ScrollView>
    <Pressable onPress={() => setVis(!isVis)}>
    <Text style={styles.sub}>Close</Text>
    </Pressable>
    <Text style={styles.txt}>Notes Page</Text>
    <Text>{'\n'}{'\n'}</Text>
<Inner dayon='Monday' />
<Inner dayon='Tuesday' />
<Inner dayon='Wednesday' />
<Inner dayon='Thursday' />
<Inner dayon='Friday' />
<Inner dayon='Saturday' />
<Inner dayon='Sunday' />
</ScrollView>
    </View>
    </Modal>

    <ScrollView ref={scrollViewRef}  onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
      <Pressable onPress={() => setFinVis(!finVis)}>
    <Text style={styles.sub}>Send Schedule</Text>
    </Pressable>
      <Text style={styles.txt}>
        Welcome to Orgon
        {'\n'}{'\n'}
        What days are you available?
      </Text>
      
      <Sect weekDay="Monday" num="1" />
      <Pressable onPress={() => setVis(!isVis)}><Text style={{marginLeft: 'auto', padding: 5, right: 10, fontFamily: 'sans-serif-thin', fontSize: 16, color: '#496E76', backgroundColor: '#ADD8E6', borderRadius: 25, marginTop: -35}}>Leave A Note</Text></Pressable>
      <Sect weekDay="Tuesday" num="2" />
       <Pressable onPress={() => setVis(!isVis)}><Text style={{marginLeft: 'auto', padding: 5, right: 10, fontFamily: 'sans-serif-thin', fontSize: 16, color: '#496E76', backgroundColor: '#ADD8E6', borderRadius: 25, marginTop: -35}}>Leave A Note</Text></Pressable>
      <Sect weekDay="Wednesday" num="3" />
       <Pressable onPress={() => setVis(!isVis)}><Text style={{marginLeft: 'auto', padding: 5, right: 10, fontFamily: 'sans-serif-thin', fontSize: 16, color: '#496E76', backgroundColor: '#ADD8E6', borderRadius: 25, marginTop: -35}}>Leave A Note</Text></Pressable>
      <Sect weekDay="Thursday" num="4" />
       <Pressable onPress={() => setVis(!isVis)}><Text style={{marginLeft: 'auto', padding: 5, right: 10, fontFamily: 'sans-serif-thin', fontSize: 16, color: '#496E76', backgroundColor: '#ADD8E6', borderRadius: 25, marginTop: -35}}>Leave A Note</Text></Pressable>
      <Sect weekDay="Friday" num="5" />
       <Pressable onPress={() => setVis(!isVis)}><Text style={{marginLeft: 'auto', padding: 5, right: 10, fontFamily: 'sans-serif-thin', fontSize: 16, color: '#496E76', backgroundColor: '#ADD8E6', borderRadius: 25, marginTop: -35}}>Leave A Note</Text></Pressable>
      <Sect weekDay="Saturday" num="6" />
       <Pressable onPress={() => setVis(!isVis)}><Text style={{marginLeft: 'auto', padding: 5, right: 10, fontFamily: 'sans-serif-thin', fontSize: 16, color: '#496E76', backgroundColor: '#ADD8E6', borderRadius: 25, marginTop: -35}}>Leave A Note</Text></Pressable>
      <Sect weekDay="Sunday" num="7" />
       <Pressable onPress={() => setVis(!isVis)}><Text style={{marginLeft: 'auto', padding: 5, right: 10, fontFamily: 'sans-serif-thin', fontSize: 16, color: '#496E76', backgroundColor: '#ADD8E6', borderRadius: 25, marginTop: -35}}>Leave A Note</Text></Pressable>

       <Card style={{marginTop: 20, backgroundColor: 'F5F5DC', display: finVis ? 'block' : 'none'}}>
       <Text style={styles.form}>Enter the number of the schedule recipient:</Text>
       <TextInput style={{backgroundColor: '#ADD8E6', height: 25, borderWidth: 2}} keyboardType='numeric' maxLength={10} value={nums} onChangeText={onChangeNums} />
       <Text style={styles.form}>Enter your name:</Text>
       <TextInput style={{backgroundColor: '#ADD8E6', height: 25, borderWidth: 2}} maxLength={20} value={name} onChangeText={onChangeName} />
       <Pressable onPress={sendMess}>
       <Text style={styles.form}>Send</Text>
       </Pressable>
       </Card>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '#F5F5DC',
 },
 txt: {
   textAlign: 'center',
   color: '#191970',
   backgroundColor: '#ADD8E6',
   borderRadius: 25,
   fontFamily: 'sans-serif-thin',
   justifyContent: 'center',
   fontSize: 20,
   padding: 10,
   marginTop: 10,
   width: 250,
   margin: 'auto',
   shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
 },
 day: {
   backgroundColor: '#ADD8E6',
   borderRadius: 25,
   padding: 5,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginBottom: 0,
    marginTop: 10,
 },
 sub: {
   textAlign: 'center',
    color: '#191970',
    backgroundColor: '#ADD8E6',
    borderRadius: 25,
    padding: 10,
    fontFamily: 'sans-serif-thin',
    width: 125,
    marginLeft: 'auto',
    fontSize: 16,
    shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
 },
 input: {
   backgroundColor: '#ADD8E6',
   color: 'black',
   padding: 10,
   height: 55,
   borderWidth: 1,
   margin: 20,
   marginBottom: 55,
   marginTop: -25,
   borderRadius: 25,
   shadowColor: 'black',
    shadowOffset: {width: 2, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 15,
 },
 saver: {
   textAlign: 'center',
   marginBottom: 40,
   marginTop: -40,
   margin: 'auto',
   fontFamily: 'sans-serif-thin',
   backgroundColor: '#ADD8E6',
   padding: 10,
   borderRadius: 25,
   width: 75,
   shadowColor: '#171717',
    shadowOffset: {width: -2, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 3,
 },
 form: {
   fontFamily: 'sans-serif-thin',
   fontSize: 16,
   padding: 10,
   borderWidth: 1,
   borderRadius: 25,
   margin: 5,
 },
});
