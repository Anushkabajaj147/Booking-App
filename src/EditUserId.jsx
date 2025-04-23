import React ,{useCallback, useEffect,useState}from 'react';
import { View, Text, TouchableOpacity, Dimensions, Image,ScrollView, SafeAreaView, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation,useFocusEffect } from '@react-navigation/native';
import { TextInput } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import EncryptedStorage from 'react-native-encrypted-storage';

const EditUserId = () => {
  const Navigation = useNavigation();
  const { height, width } = Dimensions.get('screen');
   const[users,setUsers]=useState([]);
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');
  const[name,setName]=useState('');
  const[lock,setLock]=useState(false);
  const[emailError,setEmailError]=useState(false);
  const[regularEmailError,setRegularError]=useState(false);
  const[passwordError,setPasswordError]=useState(false);
  const[regularPasswordError,setRegularPasswordError]=useState(false);
  const[nameError,setNameError]=useState(false);
  const[nameRegularError,setNameRegularError]=useState(false);

    
  
  //   useFocusEffect(
  //     useCallback(()=>{
  //       let renderData=true;
  //       const fetchUsers = async()=>{
  //         if(!email || !name || !password)
  //         {
  //           console.log('first fill the credanials');
  //         }

  //         else{try{
  //           let token=await EncryptedStorage.getItem("settoken");
  //           console.log('editablescreen',token);
           
  //           const response = await fetch ('http://localhost:3000/api/users/:usersid',{
  //             method:'PUT',
  //              headers:{
  //               'Content-Type':'application/json',
  //               'Authorization':`Bearer ${token}`
  //             },
  //             body:JSON.stringify({email:email,name:name,password:password})});
  //           if(response.ok){
  //               const user = await response.json();

  //               setUsers(user);
  //               console.log(users.length);
  //           }
  //           else{
  //               console.log('couldnot complete request',response.status);
  //           }
  //         }catch(err){
  //           console.log('in catch', err);
  //         }
  //       }
  //       }    
  //     fetchUsers();
  //    return()=>{
  //     renderData=false;
  //    };
  //   },[])
  // );
  const check_Validation=()=>{
    if(!email)
    {
      setEmailError(true);
      setRegularError(false);
    }
    else if(!/^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/.test(email))
    {
      setEmailError(false);
      setRegularError(true);
    }
    else{
      setEmailError(false);
      setRegularError(false);
    }
    if(!password)
    {
      setPasswordError(true);
      setRegularPasswordError(false);
    }
    else if(!/^[A-Z][a-z]*[^a-zA-Z0-9]{1}[0-9]+[a-zA-Z0-9]*$/.test(password))
    {
      setRegularPasswordError(true);
      setPasswordError(false);
    }
    else{
      setRegularPasswordError(false);
      setPasswordError(false);
    }
    if(!name)
    {
       setNameError(true);
       setNameRegularError(false);
    }
    else if(!/^[A-Z][a-z]{1,9}$/.test(name))
    {
      setNameRegularError(true);
      setNameError(false);
    }
    else{
      setNameError(false);
      setNameRegularError(false);
    }
    if(/^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/.test(email) && /^[A-Z][a-z]*[^a-zA-Z0-9]{1}[0-9]+[a-zA-Z0-9]*$/.test(password) && /^[A-Z][a-z]{1,9}$/.test(name))
    { 
      return true;
    }
  };
  const passData=async()=>{
    if(check_Validation())
    {
      if(!email || !password || !name)
      {
        console.log('First fill all the credanials');
      }
      else{
        try{
        const token= await EncryptedStorage.getItem("settoken");
        const response=await fetch('http://10.0.2.2:3000/api/users/:usersid',{
          method:'PUT',
          headers:{
            'Content-Type':'application/json',
            'Authorization':`Bearer ${token}`,
          },
          body:JSON.stringify({email:email,password:password,first_name:name})
        });
        if(response.ok)
        {
          let data=await response.json();
          console.log('getData',data);
          Navigation.navigate('LoginScreen');
        }
        else{
          console.log('error occur while getting response',response.status);
        }
      }
      catch(err){
        if(err)
        {
          console.log('In catch',err);
        }
      }}
    }
  };
   
  return (
    <SafeAreaView style={{flex:1}} edges={Platform.OS==='ios'?['top','bottom']:[]}>
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <LinearGradient
        colors={['rgba(190, 122, 68,0.9)', 'rgba(219, 188, 160,0.9)', '#fff']}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0 }}
        style={{ borderWidth: 1,height: height * 0.28,width: width,borderBottomLeftRadius: 30,borderBottomRightRadius: 30,borderColor: 'rgba(219, 188, 160,0.9)',elevation: 24}}>
        <TouchableOpacity style={{height: height * 0.045,borderWidth: 1,width: width - 375,justifyContent: 'center',left: '5%',top:'5%',borderColor: 'transparent'}} onPress={() => Navigation.navigate('LoginScreen')}>
          <Icon name={'arrow-left'} size={20} color={'rgba(31, 31, 31,0.9)'} /></TouchableOpacity>
      </LinearGradient>
      <View  style={{borderWidth: 1,height: height * 0.7, width: width - 50,alignSelf: 'center',bottom:height*0.15, backgroundColor: 'rgba(240, 240, 240,0.9)'}}>
        <View style={{ borderWidth: 1,borderColor: 'transparent',height: height * 0.18,width: width - 220,alignSelf: 'center', flexDirection: 'row',top: '2%',}}>
          <Image source={require('./images/womenimageone.jpg')} style={{borderWidth: 0.4, height: height * 0.18,width: width - 250,borderRadius: 90,justifyContent: 'center',borderColor: 'grey'}}/>
          <View  style={{borderWidth: 1,height: height * 0.052,width: width - 360, justifyContent: 'center',alignItems: 'center',backgroundColor: 'rgba(190, 122, 68,0.9)',borderRadius: 40,alignSelf: 'flex-end',  right: 40,borderColor: 'transparent'}}>
            <Icon name={'camera'} size={24} color={'#fff'} />
          </View>
        </View>
        <ScrollView>
        <View style={{ borderWidth: 1, borderColor: 'transparent', marginTop: '14%' }}>
        <Text style={{ fontSize: 18.5, fontWeight: 'bold', left: '5%', color: 'rgba(31, 31, 31,0.9)' }}>Email </Text>
          <TextInput placeholder="Enter your Email" mode="outlined" outlineColor='grey' activeOutlineColor='rgba(219, 188, 160,0.9)' style={{ width: width - 100, alignSelf: 'center', elevation: 5 }} left={<TextInput.Icon icon={'account'} />} keyboardType="email-address" value={email} onChangeText={(email)=>setEmail(email)} />
        {emailError&&(<Text style={{borderWidth:1,height:height*0.03,width:width-170,fontSize:20,textAlign:'right',right:'2%',alignSelf:'flex-end',top:'5%'}}>Please Fill The  Email*</Text>)}
        {regularEmailError&&(<Text style={{borderWidth:1,height:height*0.03,width:width-120,fontSize:20,textAlign:'center',right:'2%',alignSelf:'flex-end',top:'5%'}}>Please Fill The Required Email*</Text>)}
        </View>
        <View style={{ borderWidth: 1, borderColor: 'transparent', marginTop: '3%' }}>
          <Text style={{ fontSize: 18.5, fontWeight: 'bold', left: '5%', color: 'rgba(31, 31, 31,0.9)' }}>Name</Text>
          <TextInput placeholder="Enter your name" mode={'outlined'} outlineColor='grey' activeOutlineColor='rgba(219, 188, 160,0.9)' style={{ width: width - 100, alignSelf: 'center', elevation: 5 }}  left={<TextInput.Icon icon={'account-box'} />}  keyboardType="default" value={name} onChangeText={(name)=>setName(name)}/>
          {nameError&&(<Text style={{borderWidth:1,height:height*0.03,width:width-170,fontSize:20,textAlign:'right',right:'2%',alignSelf:'flex-end',top:'5%'}}>Please Fill The  Name*</Text>)}
        {nameRegularError&&(<Text style={{borderWidth:1,height:height*0.03,width:width-120,fontSize:20,textAlign:'center',right:'2%',alignSelf:'flex-end',top:'5%'}}>Please Fill The Required Name*</Text>)}
        </View>
        <View style={{ borderWidth: 1, borderColor: 'transparent', marginTop: '3%' }}>
          <Text style={{ fontSize: 18.5, fontWeight: 'bold', left: '5%', color: 'rgba(31, 31, 31,0.9)' }}>Password</Text>
          <TextInput placeholder="Enter Password" mode={'outlined'} outlineColor='grey' activeOutlineColor='rgba(219, 188, 160,0.9)'  style={{ width: width - 100, alignSelf: 'center', elevation: 5 }}  left={<TextInput.Icon icon={lock?'lock':'lock-open-variant'} onPress={()=>setLock(!lock)} />} keyboardType='ascii-capable' secureTextEntry={lock} value={password} onChangeText={(password)=>setPassword(password)}/>
          {passwordError&&(<Text style={{borderWidth:1,height:height*0.03,width:width-170,fontSize:20,textAlign:'right',right:'2%',alignSelf:'flex-end',top:'5%'}}>Please Fill The  Password*</Text>)}
          {regularPasswordError&&(<Text style={{borderWidth:1,height:height*0.03,width:width-120,fontSize:20,textAlign:'center',right:'2%',alignSelf:'flex-end',top:'5%'}}>Please Fill The Required Password*</Text>)}
       </View>
        <View style={{borderWidth: 1, borderColor: 'transparent',height: height * 0.09,width: width - 140,top: '7%',justifyContent: 'center',alignSelf: 'center'}}>
          <TouchableOpacity style={{borderWidth: 1,height: height * 0.06,width: width - 150,alignSelf: 'center',borderRadius: 20,backgroundColor: 'rgba(190, 122, 68,0.9)',justifyContent: 'center',borderColor: 'transparent',elevation: 24}} onPress={passData}>
             <Text style={{color: '#fff',fontSize: 26,alignContent: 'center',alignSelf: 'center'}}>Apply</Text>
          </TouchableOpacity>
        </View>
        </ScrollView>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default EditUserId;
