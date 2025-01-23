import React, { useState ,useEffect} from 'react';
import { View, Text, Image, Dimensions, TouchableOpacity } from 'react-native';
import NavBar from './NavBar';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = () => {
    const Navigation = useNavigation();
    const { height, width } = Dimensions.get('screen');
   

    return (
        <View style={{ backgroundColor: 'rgba(240, 240, 240,0.9)', flex: 1 }}>
            <LinearGradient
                colors={['rgba(190, 122, 68,0.9)', 'rgba(219, 188, 160,0.9)', '#fff']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 0 }}
                style={{borderWidth: 1, borderBottomLeftRadius: 40,borderBottomRightRadius: 40,borderColor: 'rgba(219, 188, 160,0.9)',elevation: 24}}>
                {/* Header Section */}
                <View style={{borderWidth: 1,height: height * 0.038,width: width-370,alignSelf:'flex-end',flexDirection: 'row',borderColor: 'transparent',transform:[{scaleX:-1}],right:'0.5%'}}>
                    <TouchableOpacity style={{borderWidth: 1,height: height * 0.038,width: width - 370,borderColor: 'transparent',position: 'absolute', justifyContent: 'flex-end'}} onPress={()=>Navigation.navigate('EditIdExample')}><Icon name="bars" size={30} color={'rgba(31, 31, 31,0.9)'} /></TouchableOpacity>
                </View>

                {/* Profile Section */}
                <View style={{height: height * 0.215,width: width - 240, borderWidth: 1, borderColor:'transparent',alignSelf: 'flex-start', flexDirection: 'row',marginTop: '10%',left:'2%',bottom:'6%'}}>
                          <Image
                        source={require('./images/womenimageone.jpg')}
                       style={{ height: height * 0.17,width: width - 250,objectFit: 'cover', borderWidth: 1,borderRadius: 80,borderColor: 'transparent',top:'2%'}}/>
                    <TouchableOpacity style={{ height: height * 0.06,width: width - 350,justifyContent: 'center',alignContent: 'center',alignItems: 'center',borderRadius: 50,borderColor: '#fff',right: '40%',bottom:'2%', borderWidth: 1,alignSelf: 'flex-end',backgroundColor: 'rgba(190, 122, 68,0.9)'}}><Icon name="camera" size={28} color="#fff" /></TouchableOpacity>
                     </View>

                {/* User Information */}
                <View style={{ borderWidth: 1,borderColor: 'transparent',height: height * 0.058, width: width - 190,   alignSelf: 'center',bottom: '40%',  right: 0,left: '22%'}}>
                    <Text style={{ color: '#000', alignSelf: 'center', fontWeight: 'bold', fontSize: 18 ,flexWrap:'wrap'}}> Anushka Bajaj</Text>
                    <Text style={{ color: '#000', alignSelf: 'center', fontStyle: 'italic', fontSize: 18,flexWrap:'wrap' }}>anushkabajaj@gmail.com</Text>
                </View>
            </LinearGradient>

            {/* Booking Section */}
            <View
                style={{ borderWidth: 0.2,height: height * 0.1, width: width - 50,alignSelf: 'center', borderRadius: 20,position: 'absolute',top: '30%',backgroundColor: '#fff'}}>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ borderWidth: 1,borderColor: 'transparent',height: height * 0.035, width: width - 200,left: '2%',fontSize: 20,fontWeight: 'bold',color: 'rgba(31, 31, 31,0.9)'}}>Your Booking:</Text>
                    <Text style={{borderWidth: 1, height: height * 0.03, width: width - 265, right: 0,position: 'absolute',fontSize: 18, fontWeight: 'bold',color: '#72badb',borderColor: 'transparent'}}>Manage Booking</Text>
                        </View>
                <View style={{borderWidth: 0.2,flexDirection: 'row',justifyContent: 'space-evenly',height: height * 0.04,width: width - 50, borderColor: 'transparent'}}>
                    {['Flights', 'Hotels', 'Trains'].map((label, index) => (
                        <View  key={index}  style={{ borderWidth: 0.1,height: height * 0.04,width: width - 300,justifyContent: 'center', alignContent: 'center',alignItems: 'center',borderRadius: 10,backgroundColor: 'rgba(237, 244, 254,0.9)', elevation: 5}}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'rgba(31, 31, 31,0.9)' }}>{label}</Text>
                        </View>
                     ))}
                     </View>
                 </View>

            {/* Options Section */}
            <View style={{ marginVertical: '20%' }}>
                {[{ icon: 'lock', label: 'Password' }, { icon: 'bookmark', label: 'Bookmark' }, { icon: 'map-marker', label: 'Location' }, { icon: 'sign-out', label: 'Logout' }].map((item, index) => (
                    <TouchableOpacity key={index} style={{height: height * 0.055,width: width - 100, borderWidth: 0.5,alignSelf: 'center', borderRadius: 14,flexDirection: 'row', marginVertical: '4%', backgroundColor: '#fff',elevation: 14}}>
                        <View style={{ borderWidth: 1,height: height * 0.04,width: width - 390,justifyContent: 'center',left: 10,borderColor: 'transparent'}}>
                            <Icon name={item.icon} size={24} color={'rgba(31, 31, 31,0.9)'} />
                            </View>
                        <View style={{borderWidth: 1,height: height * 0.04,width: width - 300,justifyContent: 'center',left: 15,borderColor: 'transparent'}}>
                            <Text style={{ fontSize: 18.5, color: 'rgba(31, 31, 31,0.9)' }}>{item.label}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Bottom Navigation */}
            <View style={{ bottom: 0, flexDirection: 'row', position: 'absolute' }}>
                <NavBar />
            </View>
        </View>
    );
};

export default LoginScreen;
