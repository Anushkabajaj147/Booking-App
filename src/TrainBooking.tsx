import { View, Text,Dimensions, TouchableOpacity,FlatList,ScrollView, Keyboard } from 'react-native';
import React, { useState } from 'react';
import HomeNavigate from './HomeNavigate';
import LinearGradient from 'react-native-linear-gradient';
import { RadioGroup } from 'react-native-radio-buttons-group';
import TrainData from './TrainData';
import { Calendar } from 'react-native-calendars';
import Icons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import { TextInput } from 'react-native-paper';


const TrainBooking = () => {
  const{height,width}=Dimensions.get('screen');
  const[selectedId,setSelectedId]=useState('1');
 const[radioRecordFirst,setRadioRecordFirst]=useState('Train Ticket Booking');
 const[radioRecordSec,setRadioRecordSec]=useState('(IRCTC Authorized e-ticketing)');
 const[firstDropdown,setFirstDropdown]=useState(false);
 const[secondDropdown,setSecondDropdown]=useState(false);
 const[countryFirst,setCountryFirst]=useState('Country');
 const[stationFirst,setStationFirst]=useState('Select starion');
 const[countrySecond,setCountrySecond]=useState('Country');
 const[stationSecond,setStationSecond]=useState('Select starion');
 const[date,setDate]=useState(false);
 const[calendarDate,setCalendarDate]=useState('Date');
 const[calendarDay,setCalendarDay]=useState('Day');
 const[dateString,setDateString]=useState('');
 const[classValueSet,setClassValueSet]=useState('Select Class');
 const[openDropdown,setOpenDropdown]=useState(false);
 const[adultNo,setAdultNo]=useState(0);
 const[childNo,setChildNo]=useState(0);
 const[babiesNo,setBabiesNo]=useState(0);
 const[totalNo,setTotalNo]=useState(0);
 const[passenger,setPassenger]=useState(false);
 const[passengerError,setPassengerError]=useState(false);
 const[containerRender,setContainerRender]=useState(true);
 const[pnrNumber,setPnrNumber]=useState('');
 const[edit,setEdit]=useState(true);
 const[eyeshow,setEyeshow]=useState(false);
 const PnrFunction=(string)=>{
  if(string.length<=10)
  {
    setPnrNumber(string);
    setEdit(true);
    return;
  }
  else
  {
   setEdit(false);
   Keyboard.dismiss(); 
   return;
  }

 };
  const trainRecords=[{id:'1',
                       label:'Book Train Tickets',
                       valueOne:'Train Ticket Booking',
                       valueTwo:'(IRCTC Authorized e-ticketing)',
                       },
                      {id:'2',
                        label:'Check PNR Status',
                        valueOne:' PNR Status',
                        valueTwo:'(IRCTC Authorized e-ticketing)',}];
  const renderData=(selectedId)=>{
    setSelectedId(selectedId);
    setContainerRender(!containerRender);
    const renderObjectData=trainRecords.find(item=>item.id===selectedId);
    if(renderObjectData)
  {setRadioRecordFirst(renderObjectData.valueOne)
    setRadioRecordSec(renderObjectData.valueTwo)
  }
  };
  const classData=[{id:'1',
                    class:'Sleeper Class',},
                  {id:'2',
                  class:'Third AC',},
                  {id:'1',
                  class:'Second AC',},
                  {id:'1',
                  class:'First AC',},
                  {id:'1',
                  class:'Second Seating',},
                  {id:'1',
                  class:'Vistadome AC',},
                  {id:'1',
                  class:'AC Chair Car',},
                  {id:'1',
                  class:'First Class',},
                  {id:'1',
                  class:'Third AC Economy',},
                  ];
  const renderItem=(item)=>{
    setSecondDropdown(false);
    setFirstDropdown(true);
  return( <View style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.08,width:width-225,backgroundColor:'rgb(240, 240, 240)',elevation:14}}>
    <TouchableOpacity onPress={()=>dropdownFirst(item)}>
      <View style={{justifyContent:'space-between',flexDirection:'row',top:'5%'}}>
       <Text style={{fontSize:18,fontWeight:'700',textAlign:'left',alignSelf:'flex-start',borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-330}}>{item.city}</Text>  
       <Text style={{fontSize:18,fontWeight:'700',textAlign:'right',alignSelf:'flex-end',borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-330,right:'3%'}}>{item.code}</Text>  
       </View>
       <Text style={{fontSize:15.2,justifyContent:'center',alignContent:'center',alignItems:'center',textAlign:'center',borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-227,top:'2%'}}>{item.railway_station}</Text>  
   </TouchableOpacity>
   </View>);
  };
  const renderSecItem=(item)=>{
    setFirstDropdown(false);
    setSecondDropdown(true);
    return( <View style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.08,width:width-225,backgroundColor:'rgb(240, 240, 240)',elevation:14}}>
      <TouchableOpacity onPress={()=>dropdownSecond(item)}>
        <View style={{justifyContent:'space-between',flexDirection:'row',top:'5%'}}>
         <Text style={{fontSize:18,fontWeight:'700',textAlign:'left',alignSelf:'flex-start',borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-330}}>{item.city}</Text>  
         <Text style={{fontSize:18,fontWeight:'700',textAlign:'right',alignSelf:'flex-end',borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-330,right:'3%'}}>{item.code}</Text>  
         </View>
         <Text style={{fontSize:15.2,justifyContent:'center',alignContent:'center',alignItems:'center',textAlign:'center',borderWidth:1,borderColor:'transparent',height:height*0.035,width:width-227,top:'2%'}}>{item.railway_station}</Text>  
     </TouchableOpacity>
     </View>);
    };
    const dropdownFirst=(record)=>{
    setCountryFirst(record.city);
    setStationFirst(record.railway_station);
    setFirstDropdown(false);
    };
    const dropdownSecond=(record)=>{
      setCountrySecond(record.city);
      setStationSecond(record.railway_station);
      setSecondDropdown(false);
      };
    const dayPressFunction=(day)=>{
    const date=moment(day.dateString).format('DD-MM-YYYY');
    const Day=moment(day.dateString).format('dddd');
     setCalendarDate(`${date}`);
     setDateString(day.dateString);
     setCalendarDay(`${Day}`);
     setDate(false);
  };
  const classDataRender=(record)=>{
    setClassValueSet(record.class);
    setOpenDropdown(false);
  };
  const PlusFunction=(string)=>{
    if(string==='adult' && adultNo<8)
    {
       setAdultNo((prev)=>prev+1);
       setTotalNo((prev)=>prev+1);
       return;
    }
    if(string==='babies'&& babiesNo<8)
    {
      setBabiesNo((prev)=>prev+1);
       setTotalNo((prev)=>prev+1);
       return;
    }
    if(string==='child' && childNo<8)
    {
      setChildNo((prev)=>prev+1);
       setTotalNo((prev)=>prev+1);
       return;
    }
  };
  const MinusFunction=(string)=>{
    if(string==='adult' && adultNo>0)
    {
       setAdultNo((prev)=>prev-1);
       setTotalNo((prev)=>prev-1);
       return;
    }
    if(string==='babies'&& babiesNo>0)
    {
      setBabiesNo((prev)=>prev-1);
       setTotalNo((prev)=>prev-1);
       return;
    }
    if(string==='child' && childNo>0)
    {
      setChildNo((prev)=>prev-1);
       setTotalNo((prev)=>prev-1);
       return;
    }
  };
  const validation=()=>{
    if(adultNo===0 && childNo===0 && babiesNo===0)
    {
      setPassengerError(true);
      setPassenger(true);
      return;
    }
    else{
      setPassengerError(false);
      setPassenger(false);
      return;
    }
  };
  const toggleEye=(eyeshow)=>{
    setEyeshow(!eyeshow);
  };
  return (
    <View style={{flex:1,backgroundColor:'rgb(240, 240, 240)'}}>
      <View style={{flexDirection:'row'}}>
       <HomeNavigate/>
      </View>
      <View style={{top:'5%',borderWidth:1,borderColor:'transparent',height:height*0.06,width:width-5}}>
    <Text style={{fontSize:20,alignSelf:'flex-start',color:'rgb(97, 125, 138)',fontWeight:'bold',left:'2%'}}>{radioRecordFirst}</Text>
    <Text style={{fontSize:17,alignSelf:'flex-end',color:'rgb(97, 125, 138)'}}>{radioRecordSec}</Text>
  </View>
  <View style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.00,width:width-20,alignSelf:'center',top:'6%'}}/>
      <View style={{top:'6%'}}>
        <RadioGroup
        radioButtons={trainRecords}
        selectedId={selectedId}
        onPress={(item)=>renderData(item)}
        containerStyle={{borderWidth:1,borderColor:'transparent',height:height*0.08,width:width-200,alignSelf:'flex-start'}}
        layout='column'
        labelStyle={{fontSize:18,fontWeight:'500',fontStyle:'italic',color:'rgba(31, 31, 31,0.9)'}}/>

      </View>
      <LinearGradient colors={['rgba(190, 122, 68,0.9)','rgba(219, 188, 160,0.9)','#fff']} start={{x:0,y:1}} end={{x:1,y:0}} style={{top:'7%',height:height,width:width,borderWidth:1,borderColor:'rgba(31, 31, 31,0.9)',borderRadius:25}}>
       {containerRender&&(<View style={{height:height*0.3,width:width-20,borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',top:'3%',alignSelf:'center',borderRadius:15,backgroundColor:'#fff'}}>
       <View style={{flexDirection:'row',height:height*0.15,width:width-20,borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',borderTopLeftRadius:15,borderTopRightRadius:15,justifyContent:'space-between'}}>
        <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.15,width:width-216,borderTopLeftRadius:15}} onPress={()=>setFirstDropdown(true)}> 
           <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,fontWeight:'bold',left:'2%',color:'rgba(190, 122, 68,0.9)',height:height*0.027,width:width-215}}>From</Text>
          <Text style={{textAlign:'center',fontSize:22,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)',top:'5%',alignSelf:'center'}}>{countryFirst}</Text>
          <Text style={{fontSize:16.2,borderWidth:1,borderColor:'transparent',textAlign:'center',height:height*0.045,top:'14%',color:'rgba(31, 31, 31,0.9)'}}>{stationFirst}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.15,width:width-216,borderTopRightRadius:15}} onPress={()=>setSecondDropdown(true)}>
        <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,fontWeight:'bold',left:'2%',color:'rgba(190, 122, 68,0.9)',height:height*0.027,width:width-215}}>To</Text> 
       <Text style={{textAlign:'center',fontSize:22,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)',top:'5%',alignSelf:'center'}}>{countrySecond}</Text>
        <Text style={{fontSize:16.2,borderWidth:1,borderColor:'transparent',textAlign:'center',height:height*0.045,top:'14%',color:'rgba(31, 31, 31,0.9)'}}>{stationSecond}</Text>
        </TouchableOpacity>
       </View>
       <View style={{flexDirection:'row',height:height*0.15,width:width-20,borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',borderBottomLeftRadius:15,borderBottomRightRadius:15,justifyContent:'space-between'}}>
        <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.15,width:width-282,borderBottomLeftRadius:15}} onPress={()=>setDate(true)}>
          <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,fontWeight:'bold',left:'2%',color:'rgba(190, 122, 68,0.9)',height:height*0.032,width:width-287}}>Travel Date</Text>
          <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,top:'8%',fontWeight:'bold',textAlign:'center',color:'rgba(31, 31, 31,0.9)'}}>{calendarDate}</Text>
          <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,top:'8%',textAlign:'center',color:'rgba(31, 31, 31,0.9)'}}>{calendarDay}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.15,width:width-282}} onPress={()=>setOpenDropdown(true)}>
        <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,fontWeight:'bold',left:'2%',color:'rgba(190, 122, 68,0.9)',height:height*0.032,width:width-287}}>Class</Text>
         <Text style={{textAlign:'center',fontSize:20,fontWeight:'700',color:'rgba(31, 31, 31,0.9)',borderWidth:1,borderColor:'transparent',top:'12%',alignSelf:'center',height:height*0.05,width:width-287,alignContent:'center',alignItems:'center',justifyContent:'center'}}>{classValueSet}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.15,width:width-282,borderBottomRightRadius:15}} onPress={()=>setPassenger(true)}>
          <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,fontWeight:'bold',left:'2%',color:'rgba(190, 122, 68,0.9)',height:height*0.032,width:width-287}}>Passenger</Text>
          <View style={{flexDirection:'row',alignSelf:'center',height:height*0.05,width:width-387,alignContent:'center',alignItems:'center',justifyContent:'center'}}>
          <Text style={{textAlign:'center',fontSize:18,fontWeight:'700',color:'rgba(31, 31, 31,0.9)',borderWidth:1,borderColor:'transparent',top:'12%',alignSelf:'center',height:height*0.03,width:width-380}}>{totalNo}</Text>
          <Text style={{textAlign:'center',fontSize:18,fontWeight:'700',color:'rgba(31, 31, 31,0.9)',borderWidth:1,borderColor:'transparent',top:'12%',alignSelf:'center',height:height*0.03,width:width-318}}>Passenger</Text>
          </View>
        </TouchableOpacity>
       </View>
       </View>)}
       {containerRender||(
           <View style={{borderWidth:0.3,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.12,width:width-20,alignSelf:'center',top:'2%',borderRadius:10,backgroundColor:'#fff'}}>
            <View style={{borderWidth:0.3,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.05,width:width-20,borderTopLeftRadius:10,borderTopRightRadius:10,flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{borderWidth:1,borderColor:'transparent',alignSelf:'flex-start',height:height*0.05,width:width-270,borderTopLeftRadius:10,justifyContent:'center',alignContent:'flex-start',alignItems:'flex-start'}}><Text style={{borderWidth:1,borderColor:'transparent',marginLeft:'2%',color:'rgba(190, 122, 68,0.9)',textAlign:'left',fontWeight:'bold',fontSize:20}}>PNR Number</Text></View>
              <View style={{borderWidth:1,borderColor:'transparent',alignSelf:'flex-end',height:height*0.05,width:width-200,borderTopRightRadius:10,justifyContent:'center',alignContent:'flex-end',alignItems:'flex-end'}}><Text style={{borderWidth:1,borderColor:'transparent',marginRight:'2%',color:'rgba(190, 122, 68,0.9)',fontSize:16,fontWeight:'500',textAlign:'right'}}>(Passenger Name Record)</Text></View>
            </View>
            <TextInput placeholder='Enter 10 Digit PNR Number' secureTextEntry={eyeshow} keyboardType='decimal-pad'  value={pnrNumber} onChangeText={(pnrNumber)=>PnrFunction(pnrNumber)} mode='flat' underlineColor='grey' activeUnderlineColor='rgba(190, 122, 68,0.9)' right={<TextInput.Icon icon={eyeshow?'eye-off':'eye'} size={30} onPress={()=>toggleEye(eyeshow)}/>} style={{fontSize:20,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)',backgroundColor:'#fff',height:height*0.060}}/>
           </View>
       )}
       {firstDropdown&&(
        <View style={{borderWidth:0.5,height:height*0.2,width:width-218,top:'8%',position:'absolute',left:'3%',alignSelf:'flex-start'}}>
          <FlatList
          data={TrainData}
          renderItem={({item})=>{ return renderItem(item)}}/>
          </View>
      )}
       {secondDropdown&&(
        <View style={{borderWidth:0.5,height:height*0.2,width:width-218,top:'8%',position:'absolute',right:'3%',alignSelf:'flex-end'}}>
          <FlatList
          data={TrainData}
          renderItem={({item})=>{ return renderSecItem(item)}}/>
          </View>
      )}
      {date&&(
        <View style={{borderWidth:0.5,height:height*0.2,width:width-218,top:'22%',position:'absolute',left:'3%',alignSelf:'flex-start'}} >
         <Calendar
         onDayPress={dayPressFunction}
         style={{height:height*0.4,width:width-185,fontSize:20,backgroundColor:'rgb(175, 172, 172)'}}
         theme={{ 
          calendarBackground:'#fff',
          textMonthFontWeight: 'bold',
          textMonthFontSize:12,
          monthTextColor:'rgb(10, 57, 110)',
          arrowColor: '#000',
          textDayFontSize: 14, // Day numbers font size
          dayTextColor: '#000',
          todayTextColor: '#E57373', // Highlight color for today
          textDayHeaderFontSize: 12, // Day header (Sun, Mon, etc.) font size
          textDayHeaderFontWeight: 'bold', // Day header weight
          textSectionTitleColor: '#000', 
    
        }}
        markedDates={{
          [dateString]:{
            selected:true,
            marked:true,
            selectedColor:'rgba(190, 122, 68,0.9)',
          },
        }}/>
        </View>
      )}
      {openDropdown&&(
        <View style={{borderWidth:0.5,position:'absolute',alignSelf:'center',height:height*0.2,width:width-218,top:'24%',backgroundColor:'rgb(240, 240, 240)'}}>
          <FlatList
          data={classData}
          renderItem={({item})=>(
            <TouchableOpacity onPress={()=>classDataRender(item)}>
              <View style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.04,width:width-218,justifyContent:'center',alignContent:'center',alignItems:'center',alignSelf:'center'}}><Text style={{fontSize:22,textAlign:'center'}}>{item.class}</Text></View>
            </TouchableOpacity>
          )}/>
        </View>
      )}
      {passenger&&(
             <View style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.2,width:width-180,position:'absolute',top:'25%',alignSelf:'flex-end',right:'3%',backgroundColor:'rgb(240, 240, 240)'}}>
             <ScrollView>
              <View style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.4,width:width-180}}>
                <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.07,width:width-180,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',top:'5%'}}>
                  <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.07,width:width-300,flexDirection:'column'}}>
                    <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)'}}>Adults</Text>
                    <Text style={{textAlign:'center',fontSize:18,fontWeight:'500',color:'rgba(31, 31, 31,0.9)'}}>(12+ years)</Text>
                  </View>
                  <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.07,width:width-310,flexDirection:'row',justifyContent:'center',right:'3%',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                    <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.05,width:width-380,borderTopLeftRadius:10,borderBottomLeftRadius:10,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'#fff'}} onPress={()=>MinusFunction('adult')}><Icons name='minimize' color={'#000'} size={20}/></TouchableOpacity>
                    <View style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.05,width:width-380,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'rgba(219, 188, 160,0.7)'}}><Text>{adultNo}</Text></View>
                    <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.05,width:width-380,borderTopRightRadius:10,borderBottomRightRadius:10,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'#fff'}} onPress={()=>PlusFunction('adult')}><Icons name='add' color={'#000'} size={20}/></TouchableOpacity>
                  </View>
                </View>
                <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.07,width:width-180,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',top:'10%'}}>
                  <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.07,width:width-300,flexDirection:'column'}}>
                    <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)'}}>Children</Text>
                    <Text style={{textAlign:'center',fontSize:18,fontWeight:'500',color:'rgba(31, 31, 31,0.9)'}}>(2-12 years)</Text>
                  </View>
                  <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.07,width:width-310,flexDirection:'row',justifyContent:'center',right:'3%',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                    <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.05,width:width-380,borderTopLeftRadius:10,borderBottomLeftRadius:10,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'#fff'}} onPress={()=>MinusFunction('child')}><Icons name='minimize' color={'#000'} size={20}/></TouchableOpacity>
                    <View style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.05,width:width-380,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'rgba(219, 188, 160,0.7)'}}><Text>{childNo}</Text></View>
                    <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.05,width:width-380,borderTopRightRadius:10,borderBottomRightRadius:10,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'#fff'}} onPress={()=>PlusFunction('child')}><Icons name='add' color={'#000'} size={20}/></TouchableOpacity>
                  </View>
                </View>
                <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.07,width:width-180,alignSelf:'center',flexDirection:'row',justifyContent:'space-between',top:'15%'}}>
                  <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.07,width:width-300,flexDirection:'column'}}>
                    <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)'}}>Babies</Text>
                    <Text style={{textAlign:'center',fontSize:18,fontWeight:'500',color:'rgba(31, 31, 31,0.9)'}}>(0-2 years)</Text>
                  </View>
                  <View style={{borderWidth:0.5,borderColor:'transparent',height:height*0.07,width:width-310,flexDirection:'row',justifyContent:'center',right:'3%',alignContent:'center',alignItems:'center',alignSelf:'center'}}>
                    <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.05,width:width-380,borderTopLeftRadius:10,borderBottomLeftRadius:10,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'#fff'}} onPress={()=>MinusFunction('babies')}><Icons name='minimize' color={'#000'} size={20}/></TouchableOpacity>
                    <View style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.05,width:width-380,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'rgba(219, 188, 160,0.7)'}}><Text>{babiesNo}</Text></View>
                    <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.05,width:width-380,borderTopRightRadius:10,borderBottomRightRadius:10,alignContent:'center',alignItems:'center',alignSelf:'center',justifyContent:'center',backgroundColor:'#fff'}} onPress={()=>PlusFunction('babies')}><Icons name='add' color={'#000'} size={20}/></TouchableOpacity>
                  </View>
                </View>
                {passengerError&&(
                  <View style={{borderWidth:1,borderColor:'transparent',top:'17%',right:'3%',height:height*0.035,width:width-220,alignContent:'center',alignItems:'center',alignSelf:'flex-end',justifyContent:'center'}}>
                    <Text style={{fontSize:15,color:'red',textAlign:'center',alignSelf:'flex-end'}}>(Select  No. Of Passenger)</Text>
                    </View>
                )}
                <TouchableOpacity style={{borderWidth:1,borderColor:'rgba(190, 122, 68,0.9)',height:height*0.05,width:width-200,alignSelf:'center',top:'20%',alignContent:'center',alignItems:'center',justifyContent:'center'}} onPress={validation}>
                <Text style={{textAlign:'center',fontSize:22,fontWeight:'bold',color:'rgba(190, 122, 68,0.9)'}}>Done</Text>
                </TouchableOpacity>
              </View>
             </ScrollView>
             </View>
      )}
      </LinearGradient>
    </View>
  );
};
export default TrainBooking;