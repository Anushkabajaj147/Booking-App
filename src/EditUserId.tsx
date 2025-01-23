import React ,{useCallback, useEffect,useState}from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image,ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation,useFocusEffect } from '@react-navigation/native';

import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const EditUserId = () => {
  const Navigation = useNavigation();
  const { height, width } = Dimensions.get('screen');
   const[users,setUsers]=useState([]);
  
    
    
  
    useFocusEffect(
      
      useCallback(()=>{
        let renderData=true;
        const fetchUsers = async()=>{
          try{
            const response = await fetch ('http://10.0.2.2:3000/api/users');
            if(response.ok){
                const user = await response.json();
                setUsers(user);
                console.log(users);
            }
            else{
                console.log('couldnot complete request');
            }
          }catch(err){
            console.log('in catch', err);
          }
        }    

      fetchUsers();
     return()=>{
      renderData=false;

     };},[]));
   
  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <LinearGradient
        colors={['rgba(190, 122, 68,0.9)', 'rgba(219, 188, 160,0.9)', '#fff']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ borderWidth: 1,height: height * 0.28,width: width,borderBottomLeftRadius: 30,borderBottomRightRadius: 30,borderColor: 'rgba(219, 188, 160,0.9)',elevation: 24}}>
        <TouchableOpacity style={{height: height * 0.045,borderWidth: 1,width: width - 375,justifyContent: 'center',left: 10,borderColor: 'transparent'}} onPress={() => Navigation.navigate('LoginScreen')}>
          <Icon name={'arrow-left'} size={20} color={'rgba(31, 31, 31,0.9)'} /></TouchableOpacity>
      </LinearGradient>
      <View  style={{borderWidth: 1,height: height * 0.7, width: width - 50,alignSelf: 'center',bottom:height*0.15, backgroundColor: 'rgba(240, 240, 240,0.9)'}}>
        <ScrollView>
        <View style={{ borderWidth: 1,borderColor: 'transparent',height: height * 0.18,width: width - 220,alignSelf: 'center', flexDirection: 'row',top: '2%',}}>
          <Image source={require('./images/womenimageone.jpg')} style={{borderWidth: 0.4, height: height * 0.18,width: width - 250,borderRadius: 90,justifyContent: 'center',borderColor: 'grey'}}/>
          <View  style={{borderWidth: 1,height: height * 0.052,width: width - 360, justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(190, 122, 68,0.9)',borderRadius: 40,alignSelf: 'flex-end',  right: 40,borderColor: 'transparent'}}>
            <Icon name={'camera'} size={24} color={'#fff'} />
          </View>
        </View>
        <View style={{ borderWidth: 1, borderColor: 'transparent', marginTop: '5%' }}>
        <Text style={{ fontSize: 18.5, fontWeight: 'bold', left: '5%', color: 'rgba(31, 31, 31,0.9)' }}>Username </Text>
          <TextInput placeholder="Enter your Username" mode="outlined" style={{ width: width - 100, alignSelf: 'center', elevation: 5 }} left={<TextInput.Icon icon={'account'} />} keyboardType="email-address"/>
        </View>
        <View style={{ borderWidth: 1, borderColor: 'transparent', marginTop: '3%' }}>
          <Text style={{ fontSize: 18.5, fontWeight: 'bold', left: '5%', color: 'rgba(31, 31, 31,0.9)' }}>Name</Text>
          <TextInput placeholder="Enter your name" mode={'outlined'} style={{ width: width - 100, alignSelf: 'center', elevation: 5 }}  left={<TextInput.Icon icon={'account-box'} />}  keyboardType="default"/>
        </View>
        <View style={{ borderWidth: 1, borderColor: 'transparent', marginTop: '3%' }}>
          <Text style={{ fontSize: 18.5, fontWeight: 'bold', left: '5%', color: 'rgba(31, 31, 31,0.9)' }}> Password</Text>
          <TextInput placeholder="Enter Password" mode={'outlined'}  style={{ width: width - 100, alignSelf: 'center', elevation: 5 }} left={<TextInput.Icon icon={'lock'} />} keyboardType="ascii-capable"/>
       </View>
        <View style={{ borderWidth: 1, borderColor: 'transparent', marginTop: '3%' }}>
          <Text style={{ fontSize: 18.5, fontWeight: 'bold', left: '5%', color: 'rgba(31, 31, 31,0.9)' }}>Location</Text>
          <TextInput placeholder="Enter Location" mode={'outlined'}style={{ width: width - 100, alignSelf: 'center', elevation: 5 }}left={<TextInput.Icon icon={'map-marker'} />} keyboardType="ascii-capable"/>
          </View>
        <View style={{borderWidth: 1, borderColor: 'transparent',height: height * 0.09,width: width - 140,top: '1%',justifyContent: 'center',alignSelf: 'center'}}>
          <TouchableOpacity style={{borderWidth: 1,height: height * 0.06,width: width - 150,alignSelf: 'center',borderRadius: 20,backgroundColor: 'rgba(190, 122, 68,0.9)',justifyContent: 'center',borderColor: 'transparent',elevation: 24}}>
             <Text style={{color: '#fff',fontSize: 26,alignContent: 'center',alignSelf: 'center'}}>Apply</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default EditUserId;
