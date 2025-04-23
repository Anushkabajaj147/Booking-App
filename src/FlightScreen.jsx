import { View, Text, Dimensions, TouchableOpacity, FlatList,TextInput,Keyboard,ScrollView, SafeAreaView, Platform } from 'react-native';
import React, { useState ,useRef,useCallback} from 'react';
import HomeNavigate from './HomeNavigate';
import LinearGradient from 'react-native-linear-gradient';
import Data from './DropDown';
import { Dropdown } from 'react-native-element-dropdown';
import { Calendar } from 'react-native-calendars';
import moment, { weekdays } from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioGroup } from 'react-native-radio-buttons-group';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import EncryptedStorage from 'react-native-encrypted-storage';
const FlightScreen = () => {
  const[showCalendar,setShowCalendar]=useState(false);
  const[showDropdown,setShowDropdown]=useState(false);
  const{height,width}=Dimensions.get('screen');
  const[selectedData,setSelectedDate]=useState('');
  const[dropdownLabel,setDropdownLabel]=useState('City');
  const[dropdownValue,setDropdownValue]=useState('Select A Airport');
  const[filteredData,setFilteredData]=useState([]);
  const[travellers,setTravellers]=useState('Travellers');
const[date,setDate]=useState('Select Date');
const[day,setDay]=useState('Select Day');
 const[showSecDropdown,setShowSecDropdown]=useState(false);
const[secDropdownLabel,setSecDropdownLabel]=useState('City');
const[secDropdownValue,setSecDropdownValue]=useState('Select A Airport');
const[showSecCalendar,setShowSecCalendar]=useState(false);
const[selectSecData,setSelectSecData]=useState('');
const[secDate,setSecDate]=useState('Select Date');
const[secDay,setSecDay]=useState('Select Day');
const[textInputError,setTextInputError]=useState(false);
const[radioButtonSelected,setRadioButtonSelected]=useState('1');
const[multiWay,setMultiWay]=useState(false);
const[multiWayDropdownOne,setMultiWayDropdownOne]=useState(false);
const[multiWayDropdownTwo,setMultiWayDropdownTwo]=useState(false);
const[multiWayDropdownLabelOne,setMultiWayDropdownLabelOne]=useState("City");
const[multiWayDropdownValueOne,setMultiWayDropdownValueOne]=useState('Select A Airport');
const[multiWayDropdownLabelTwo,setMultiWayDropdownLabelTwo]=useState('City');
const[multiWayDropdownValueTwo,setMultiWayDropdownValueTwo]=useState('Select A Airport');
const[multiWayCalendarOne,setMultiWayCalenderOne]=useState(false);
const[multiWayCalendarTwo,setMultiWayCalendarTwo]=useState(false);
const[dataSelectedOne,setDataSelectedOne]=useState('');
const[dataSelectedTwo,setDataSelectedTwo]=useState('');
const[multiWayCalendarLabelOne,setMultiWayCalendarLabelOne]=useState('Select Date');
const[multiWayCalendarValueOne,setMultiWayCalendarValueOne]=useState('Select Day');
const[multiWayCalendarLabelTwo,setMultiWayCalendarLabelTwo]=useState('Select Date');
const[multiWayCalendarValueTwo,setMultiWayCalendarValueTwo]=useState('Select Day');
const[travellersSecond,setTravellersSecond]=useState('');
const[textInputSecondError,setTextInputSecondError]=useState(false);
const[noOfTravellers,setNoOfTravellers]=useState(false);
const[adultNo,setAdultNo]=useState(0);
const[childNo,setChildNo]=useState(0);
const[infantNo,setInfanttNo]=useState(0);
const Navigation=useNavigation();
const[travellerRadioButton,setTravellerRadioButton]=useState('1');
const[tranvellersError,setTravellersError]=useState(false);
const[showCabinClass,setShowCabinClass]=useState('select Cabin ');
const[counttravellers,setCountTravellers]=useState(0);
const[multitravellerRadioButton,setMultiTravellerRadioButton]=useState('1');
const[multitranvellersError,setMultiTravellersError]=useState(false);
const[showMultiCabinClass,setShowMultiCabinClass]=useState('select Cabin ');
const[countMultitravellers,setCountMultiTravellers]=useState(0);
const[multiNoOfTravellers,setMultiNoOfTravellers]=useState(false);
const[noOfMultiTravellers,setNoOfMultiTravellers]=useState(false);
const[adultMultiNo,setAdultMultiNo]=useState(0);
const[childMultiNo,setChildMultiNo]=useState(0);
const[infantMultiNo,setInfanttMultiNo]=useState(0);
const[fetchRecords,setFetchRecords]=useState([]);

useFocusEffect(
  useCallback(()=>{
    let Dataget=true;
    const fetchData=async()=>{
      try{
        let FlightScreen=await EncryptedStorage.getItem("settoken");
        console.log('flightScreen',FlightScreen);
        const headers={
          'Authorization':`Bearer ${FlightScreen}`,
        };
        let response=await fetch('http://10.0.2.2:3000/api/flightrecords',{headers});
        if(response.ok)
        {
          let data=await response.json();
          if(Dataget)
          {
            setFetchRecords(data);
          }
        }
        else{
          console.log('error occur while getting response',response.status);
        }
      }
      catch(err){
        console.log('in catch',err);
      }
    }
    fetchData();
    return()=>{
      Dataget=false;
    }
  },[])
);


const Routing=useRoute();
  const formattedData=()=>{
    setShowDropdown(true);
   setFilteredData(Data);
   Keyboard.dismiss();
  };

const showItems=(record) => {
  const Label=`${record.label}`;
  const Value=`${record.value}`;
  setDropdownLabel(Label);
  setDropdownValue(Value);
  setShowDropdown(false);
};

const adjustTravellers=()=>{
   if(!/^(?:[1-9]|[1-9][0-9])$/.test(travellers))
   {
     setTextInputError(true);
     return;
   }
   else
   {
    setTextInputError(false);
    return;
   }
};
const adjustSecondTravellers=()=>{
  if(!/^(?:[1-9]|[1-9][0-9])$/.test(travellersSecond))
  {
    setTextInputSecondError(true);
    return;
  }
  else
  {
   setTextInputSecondError(false);
   return;
  }
};
const onDayPress=(day)=>{
   const date=moment(day.dateString).format('DD-MMM-YYYY');
   const dayName=moment(day.dateString).format('dddd');
   setSelectedDate(day.dateString);
   setDate(`${date}`);
   setDay(`${dayName}`)
  setShowCalendar(false);
};

const renderSecItem=(record)=>{
  const SecLabel=`${record.label}`;
  const SecValue=`${record.value}`;
  setSecDropdownLabel(SecLabel);
  setSecDropdownValue(SecValue);
  setShowSecDropdown(false);
};
const OnDayPressSecond=(day)=>{
  const SecDate=moment(day.dateString).format('DD-MMM-YYYY');
  const SecDay=moment(day.dateString).format('dddd');
  setSelectSecData(day.dateString);
  setSecDate(`${SecDate}`);
  setSecDay(`${SecDay}`);
  setShowSecCalendar(false);
};
const Radio=[
  {id:'1',
    label:'One Way',
    value:'One Way',
  },
  {id:'2',
    label:'Multi City',
    value:'Multi City',
  },
];

const NavigateButtonRadio=(item)=>{
if(item=='2')
{
  setMultiWay(true);
  setRadioButtonSelected(item);
  return;
}
else
{
  setMultiWay(false);
  setRadioButtonSelected(item);
  return;
}
};

const showMultiWayFlatlistOne=(item)=>{
  const Labelstring=`${item.label}`;
  const ValueString=`${item.value}`;
  setMultiWayDropdownLabelOne(Labelstring);
  setMultiWayDropdownValueOne(ValueString);
  setMultiWayDropdownOne(false);
};
const renderMultiWayDropdownTwo=(item)=>{
  const characterlabel=`${item.label}`;
  const charactervalue=`${item.value}`;
  setMultiWayDropdownLabelTwo(characterlabel);
  setMultiWayDropdownValueTwo(charactervalue);
  setMultiWayDropdownTwo(false);
};
const DayPassed=(day)=>{
  const MultiWayDate=moment(day.dateString).format('DD-MM-YYYY');
  const MultiWayDay=moment(day.dateString).format('dddd');
  setDataSelectedOne(day.dateString);
  setMultiWayCalendarLabelOne(`${MultiWayDate}`);
  setMultiWayCalendarValueOne(`${MultiWayDay}`);
  setMultiWayCalenderOne(false);
};
const DayPassedSec=(day)=>{
  const MultiWayDateTwo=moment(day.dateString).format('DD-MM-YYYY');
  const MultiWayDayTwo=moment(day.dateString).format('dddd');
  setDataSelectedTwo(day.dateString);
  setMultiWayCalendarLabelTwo(`${MultiWayDateTwo}`);
  setMultiWayCalendarValueTwo(`${MultiWayDayTwo}`);
  setMultiWayCalendarTwo(false);
};

  
  const PlusFunction=(string) =>{
if(string==='adult' && adultNo<8)
{   
    setAdultNo((prev)=>prev+1);
    setCountTravellers((prev)=>prev+1);
    return;
}
if(string==='child' && childNo<8)
  {
      setChildNo((prev)=>prev+1);
      setCountTravellers((prev)=>prev+1);
      return;
  }
  if(string==='infant' && infantNo<8)
    {
        setInfanttNo((prev)=>prev+1);
        setCountTravellers((prev)=>prev+1);
        return;
    }
};
const MinusFunction=(string)=>{
  if(string==='adult' && adultNo>0)
    {   
        setAdultNo((prev)=>prev-1);
        setCountTravellers((prev)=>prev-1);
        return;
    }
    if(string==='child' && childNo>0)
      {
          setChildNo((prev)=>prev-1);
          setCountTravellers((prev)=>prev-1);
          return;
      }
      if(string==='infant' && infantNo>0)
        {
            setInfanttNo((prev)=>prev-1);
            setCountTravellers((prev)=>prev-1);
            return;
        }
  };
const TravellersDropdown=[
  {id:'1',
   label:'Economy',
   value:'Economy'
  },
  {id:'2',
    label:'Premium Economy',
    value:'Premium Economy'
  },
  {
    id:'3',
    label:'Business',
    value:'Business'
  },
  {
    id:'4',
    label:'First Class',
    value:'First Class',
  }
];
const travellerfunctions=()=>{
  if(counttravellers===0 || showCabinClass==='select Cabin')
  {
     setTravellersError(true);
     setNoOfTravellers(true);
     return;
  }
  else{
    setNoOfTravellers(false);
    setTravellersError(false);
  }
 
};
const radiotravellers=(selectedId)=>{
  setTravellerRadioButton(selectedId);
 const selectedData=TravellersDropdown.find(item=>item.id===selectedId)
 if(selectedData)
 {
  setShowCabinClass(selectedData.label);
 }
};

 
const PlusMultiFunction=(string) =>{
  if(string==='adult' && adultMultiNo<8)
  {   
      setAdultMultiNo((prev)=>prev+1);
      setCountMultiTravellers((prev)=>prev+1);
      return;
  }
  if(string==='child' && childMultiNo<8)
    {
        setChildMultiNo((prev)=>prev+1);
        setCountMultiTravellers((prev)=>prev+1);
        return;
    }
    if(string==='infant' && infantMultiNo<8)
      {
          setInfanttMultiNo((prev)=>prev+1);
          setCountMultiTravellers((prev)=>prev+1);
          return;
      }
  };
  const MinusMultiFunction=(string)=>{
    if(string==='adult' && adultMultiNo>0)
      {   
          setAdultMultiNo((prev)=>prev-1);
          setCountMultiTravellers((prev)=>prev-1);
          return;
      }
      if(string==='child' && childMultiNo>0)
        {
            setChildMultiNo((prev)=>prev-1);
            setCountMultiTravellers((prev)=>prev-1);
            return;
        }
        if(string==='infant' && infantMultiNo>0)
          {
              setInfanttMultiNo((prev)=>prev-1);
              setCountMultiTravellers((prev)=>prev-1);
              return;
          }
    };
    const multitravellerfunctions=()=>{
      if(countMultitravellers===0 || showMultiCabinClass==='select Cabin')
      {
         setMultiTravellersError(true);
         setMultiNoOfTravellers(true);
         return;
      }
      else{
        setMultiNoOfTravellers(false);
        setMultiTravellersError(false);
      }
     
    };
    const radioMultitravellers=(selectedId)=>{
      setMultiTravellerRadioButton(selectedId);
     const selectedMultiData=TravellersDropdown.find(item=>item.id===selectedId)
     if(selectedMultiData)
     {
      setShowMultiCabinClass(selectedMultiData.label);
     }
    };
    const showSecondDropdown =  useCallback((item) => {
      return (
        <TouchableOpacity onPress={() =>{ renderSecItem(item);
                                        setShowDropdown(false);}} style={{borderWidth: 0.5}}>
          <View>
            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontSize: 18, justifyContent: 'flex-start', alignSelf: 'flex-start', left: '2%', fontWeight: 'bold'}}>
                {item.label}
              </Text>
              <Text style={{fontSize: 18, justifyContent: 'flex-end', alignSelf: 'flex-end', right: '2%', fontWeight: 'bold'}}>
                {item.code}
              </Text>
            </View>
            <Text style={{fontSize: 16, textAlign: 'center'}}>
              {item.value}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }, []);
    
    const showFirstDropdown = useCallback((item) => {
      return (
        <TouchableOpacity
        onPress={() =>{showItems(item);
                    setShowSecDropdown(false);
        }}
        style={{ borderWidth: 0.5 }}
      >
        <View>
          {/* Row for label and code */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                fontSize: 18,
                alignSelf: 'flex-start',
                left: '2%',
                fontWeight: 'bold',
              }}
            >
              {item.label}
            </Text>
            <Text
              style={{
                fontSize: 18,
                alignSelf: 'flex-end',
                right: '2%',
                fontWeight: 'bold',
              }}
            >
              {item.code}
            </Text>
          </View>
          {/* Text for item value */}
          <Text style={{ fontSize: 16, textAlign: 'center' }}>{item.value}</Text>
        </View>
      </TouchableOpacity>
      
      );
    }, []);
    
    const multiWayFirstDropdown=useCallback((item)=>{
      return(
        <TouchableOpacity onPress={()=>{showMultiWayFlatlistOne(item);
                                          setMultiWayDropdownTwo(false);
        }} style={{borderWidth:0.5}}>
                       <View >
                        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <Text style={{fontSize:18,justifyContent:'flex-start',alignSelf:'flex-start',left:'2%',fontWeight:'bold'}}>{item.label}</Text>
                        <Text style={{fontSize:18,justifyContent:'flex-end',alignSelf:'flex-end',right:'2%',fontWeight:'bold'}}>{item.code}</Text>
                        </View>
                        <Text style={{fontSize:16,textAlign:'center'}}>{item.value}</Text>
                       </View>
        </TouchableOpacity>
      );
    }, []);
    const multiWaySecondDropdown=useCallback((item)=>{
      return(
        <TouchableOpacity onPress={()=>{renderMultiWayDropdownTwo(item);
                                        setMultiWayDropdownOne(false);
        }} style={{borderWidth:0.5}}>
        <View >
                   <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Text style={{fontSize:18,justifyContent:'flex-start',alignSelf:'flex-start',left:'2%',fontWeight:'bold'}}>{item.label}</Text>
                   <Text style={{fontSize:18,justifyContent:'flex-end',alignSelf:'flex-end',right:'2%',fontWeight:'bold'}}>{item.code}</Text>
                   </View>
                   <Text style={{fontSize:16,textAlign:'center'}}>{item.value}</Text>
                  </View>
       </TouchableOpacity>
);
    }, []);
  return (
    <SafeAreaView style={{flex:1}} edges={Platform.OS==='ios'?['top','bottom']:[]}>
    <View style={{flex:1,backgroundColor:'rgb(240, 240, 240)'}}>
      <View style={{flexDirection:'row',top:height*0.02}}>
      <HomeNavigate/>
      </View>
      <View style={{top:'4.5%',height:height*0.076,width:width,borderWidth:1,borderColor:'transparent',backgroundColor:'rgb(240, 240, 240)'}}>
        <View style={{borderWidth:1,borderColor:'transparent',height:height*0.03,width:width,justifyContent:'center',alignSelf:'flex-start'}}>
        <Text style={{fontSize:17,fontWeight:'bold',textAlign:'left',color:'rgb(97, 125, 138)'}}>Book International & Domestic Flights:-</Text>
        </View>
          <RadioGroup
          radioButtons={Radio}
          selectedId={radioButtonSelected}
          onPress={(item)=>NavigateButtonRadio(item)} 
          labelStyle={{fontStyle:'italic',fontWeight:'500',color:'rgba(31, 31, 31,0.9)',fontSize:18}}
          containerStyle={{height:height*0.04,borderWidth:0.5,borderColor:'transparent',width:width,alignSelf:'flex-start',justifyContent:'flex-start',top:'1%'}}
          layout={'row'}/>
        </View>
        <LinearGradient colors={['rgba(190, 122, 68,0.9)','rgba(219, 188, 160,0.9)','#fff']} start={{x:0,y:1}} end={{x:1,y:0}} style={{flex:1,top:'6%',borderWidth:1,borderColor:'rgb(240, 240, 240)',borderTopLeftRadius:25,borderTopRightRadius:25}}>
      <View style={{borderWidth:1,borderColor:'rgba(31, 31, 31,0.9)',height:height,width:width,borderTopLeftRadius:25,borderTopRightRadius:25}}>
      <View style={{backgroundColor:'#fff',borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',borderRadius:10,height:height*0.25,width:width-20,alignSelf:'center',top:'2%'}}>
        <View style={{flexDirection:'row',justifyContent:'space-evenly',borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',borderTopLeftRadius:10,borderTopRightRadius:10}}>
        <View style={{alignSelf:'flex-start',position:'absolute',borderWidth:1,borderColor:'rgb(219, 188, 160)',left:'46%',top:'38%',borderRadius:20,backgroundColor:'rgb(219, 188, 160)'}}>
          <Icon name='compare-arrows' size={35} color={'rgba(31, 31, 31,0.72)'}/>
        </View>
        <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',borderTopLeftRadius:10,height:height*0.122,width:width-218}} onPress={formattedData}> 
       <View >
        <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,fontWeight:'bold',left:'2%',color:'rgba(190, 122, 68,0.9)',height:height*0.027,width:width-215}}>From</Text>
        <View style={{borderWidth:1,borderColor:'transparent',height:height*0.03,width:width-320,top:'5%',alignSelf:'center'}}><Text style={{textAlign:'center',fontSize:22,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)'}}>{dropdownLabel}</Text></View>
        <Text style={{fontSize:15,borderWidth:1,borderColor:'transparent',textAlign:'center',height:height*0.045,top:'10%',color:'rgba(31, 31, 31,0.9)'}}>{dropdownValue}</Text>
       </View>
        </TouchableOpacity>
        <TouchableOpacity  style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',borderTopRightRadius:10,height:height*0.122,width:width-218}} onPress={()=>setShowSecDropdown(true)} >
          <View>
        <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,fontWeight:'bold',left:'2%',color:'rgba(190, 122, 68,0.9)',height:height*0.027,width:width-215}}>To</Text>
            <Text style={{borderWidth:1,borderColor:'transparent',height:height*0.03,width:width-320,top:'5%',alignSelf:'center',textAlign:'center',fontSize:22,fontWeight:'bold',color:'rgba(31, 31, 31,0.9)'}}>{secDropdownLabel}</Text>
              <Text style={{fontSize:15,borderWidth:1,borderColor:'transparent',textAlign:'center',height:height*0.045,top:'10%',color:'rgba(31, 31, 31,0.9)'}}>{secDropdownValue}</Text>
          </View>
        </TouchableOpacity>
        </View>
        <View style={{flexDirection:'row',justifyContent:'space-between',borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.125,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
          <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.125,width:width-287,borderBottomLeftRadius:10}} onPress={()=>setShowCalendar(true)}>
          <View style={{flexDirection:'column'}}> 
            <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,fontWeight:'bold',left:'2%',color:'rgba(190, 122, 68,0.9)',height:height*0.032,width:width-288}}>Departure</Text>
          <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,top:'8%',fontWeight:'bold',textAlign:'center',color:'rgba(31, 31, 31,0.9)'}}>{date}</Text>
          <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,top:'8%',textAlign:'center',color:'rgba(31, 31, 31,0.9)'}}>{day}</Text> 
        </View>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:0.5,height:height*0.125,width:width-287}} onPress={()=>setShowSecCalendar(true)}>
            <View>
            <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,fontWeight:'bold',left:'2%',color:'rgba(190, 122, 68,0.9)',height:height*0.032,width:width-288}}>Return</Text>
              <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,top:'8%',fontWeight:'bold',textAlign:'center',color:'rgba(31, 31, 31,0.9)'}}>{secDate}</Text>
              <Text style={{borderWidth:1,borderColor:'transparent',fontSize:20,top:'8%',textAlign:'center',color:'rgba(31, 31, 31,0.9)'}}>{secDay}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{borderWidth:0.5,borderColor:'rgba(31, 31, 31,0.9)',height:height*0.125,width:width-270,borderBottomRightRadius:10}} onPress={()=>setNoOfTravellers(true)}>
            <Text style={{borderWidth:1,borderColor:'transparent',fontSize:16,left:'1%',textAlign:'center',width:width-260,fontWeight:'bold',color:'rgba(190, 122, 68,0.9)'}}>Travellers & Cabin Class</Text>
            <Text style={{borderWidth:1,borderColor:'transparent',fontSize:15,alignSelf:'center',height:height*0.020,width:width-285,fontWeight:'bold',textAlign:'center',color:'rgba(31, 31, 31,0.9)' }}>{counttravellers}</Text>
            <Text style={{borderWidth:1,borderColor:'transparent',fontSize:16,height:height*0.045,width:width-275,alignSelf:'center',alignContent:'center',alignItems:'center',fontWeight:'bold',textAlign:'center'}}>{showCabinClass}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {multiWay ? (
  <View
    style={{
      borderWidth: 1,
      borderColor: "transparent",
      alignSelf: "center",
      borderRadius: 10,
      height: height * 0.248,
      width: width - 20,
      backgroundColor: "#fff",
      top: "5%",
      
    }}
  >
    <View style={{ flexDirection: "row", alignSelf: "center" }}>
      <View
        style={{
          alignSelf: "flex-start",
          position: "absolute",
          borderWidth: 2,
          borderColor: "rgb(219, 188, 160)",
          backgroundColor: "#fff",
          left: "45.8%",
          top: "38%",
          borderRadius: 20,
          backgroundColor: "rgb(219, 188, 160)",
        }}
      >
        <Icon name="compare-arrows" size={35} color={"rgba(31, 31, 31,0.72)"} />
      </View>

      {/* From Section */}
      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          borderColor: "rgba(31, 31, 31,0.9)",
          height: height * 0.122,
          width: width - 217,
          borderTopLeftRadius: 10,
        }}
        onPress={() => setMultiWayDropdownOne(true)}
      >
        <View style={{}}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              left: "2%",
              color: "rgba(190, 122, 68,0.9)",
            }}
          >
            From
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "bold",
              color: "rgba(31, 31, 31,0.9)",
              marginTop: 5,
            }}
          >
            {multiWayDropdownLabelOne}
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              color: "rgba(31, 31, 31,0.9)",
              marginTop: 10,
            }}
          >
            {multiWayDropdownValueOne}
          </Text>
        </View>
      </TouchableOpacity>

      {/* To Section */}
      <TouchableOpacity
        style={{
          borderWidth: 0.5,
          height: height * 0.122,
          width: width - 217,
          borderTopRightRadius: 10,
        }}
        onPress={() => setMultiWayDropdownTwo(true)}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              left: "2%",
              color: "rgba(190, 122, 68,0.9)",
            }}
          >
            To
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 22,
              fontWeight: "bold",
              color: "rgba(31, 31, 31,0.9)",
              marginTop: 5,
            }}
          >
            {multiWayDropdownLabelTwo}
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              color: "rgba(31, 31, 31,0.9)",
              marginTop: 10,
            }}
          >
            {multiWayDropdownValueTwo}
          </Text>
        </View>
      </TouchableOpacity>
    </View>

    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {/* Departure Section */}
      <TouchableOpacity
        style={{
          borderWidth: 0.2,
          height: height * 0.125,
          width: width - 295,
        }}
        onPress={() => setMultiWayCalenderOne(true)}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              left: "2%",
              color: "rgba(190, 122, 68,0.9)",
            }}
          >
            Departure
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "rgba(31, 31, 31,0.9)",
              marginTop: 8,
              fontWeight: "bold",
            }}
          >
            {multiWayCalendarLabelOne}
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "rgba(31, 31, 31,0.9)",
              marginTop: 8,
            }}
          >
            {multiWayCalendarValueOne}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Return Section */}
      <TouchableOpacity
        style={{
          borderWidth: 0.2,
          height: height * 0.125,
          width: width - 295,
        }}
        onPress={() => setMultiWayCalendarTwo(true)}
      >
        <View>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              left: "2%",
              color: "rgba(190, 122, 68,0.9)",
            }}
          >
            Return
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "rgba(31, 31, 31,0.9)",
              marginTop: 8,
              fontWeight: "bold",
            }}
          >
            {multiWayCalendarLabelTwo}
          </Text>
          <Text
            style={{
              fontSize: 20,
              textAlign: "center",
              color: "rgba(31, 31, 31,0.9)",
              marginTop: 8,
            }}
          >
            {multiWayCalendarValueTwo}
          </Text>
        </View>
      </TouchableOpacity>

      {/* Travellers Section */}
      <TouchableOpacity
        style={{
          borderWidth: 0.2,
          height: height * 0.125,
          width: width - 256,
        }}
        onPress={() => setMultiNoOfTravellers(true)}
      >
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            fontWeight: "bold",
            color: "rgba(190, 122, 68,0.9)",
          }}
        >
          Travellers & Cabin Class
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            fontWeight: "bold",
            color: "rgba(31, 31, 31,0.9)",
            marginTop: 5,
          }}
        >
          {countMultitravellers}
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: "center",
            fontWeight: "bold",
            marginTop: 5,
          }}
        >
          {showMultiCabinClass}
        </Text>
      </TouchableOpacity>
    </View>
  </View>
) : null}

  
     {noOfTravellers && (
  <View style={{
    position: 'absolute',
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 10,
    height: height * 0.25,
    top: '22.5%',
    alignSelf: "flex-end",
    right: '2%',
  }}>
    <View style={{
      borderWidth: 1,
      borderColor: "transparent",
      height: height * 0.04,
      width: width - 300,
      alignSelf: 'flex-end',
      right: '5%'
    }}>
      <View style={{
        borderWidth: 0.5,
        borderColor: 'rgba(31, 31, 31,0.9)',
        height: height * 0.04,
        width: width - 370,
        transform: [{ rotate: '43deg' }],
        top: '62%',
        left: '30%',
        backgroundColor: 'rgb(240, 240, 240)',
        elevation: 14
      }} />
    </View>
    <View style={{
      borderWidth: 0.5,
      borderColor: 'rgba(31, 31, 31,0.9)',
      backgroundColor: 'rgb(240, 240, 240)',
      height: height * 0.22,
      width: width - 100,
      borderRadius: 10,
      alignSelf: 'flex-end',
      justifyContent: 'space-between',
      elevation: 14
    }}>
      <ScrollView>
        <View style={{ height: height * 0.69, width: width - 100 }}>
          {/* Adult Section */}
          <View style={{
            borderWidth: 1,
            borderColor: 'transparent',
            top: '2%',
            borderRadius: 10,
            height: height * 0.062,
            width: width - 120,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{
              borderWidth: 1,
              borderColor: 'transparent',
              height: height * 0.062,
              width: width - 310,
              alignSelf: 'flex-start'
            }}>
              <Text style={{
                borderWidth: 1,
                borderColor: 'transparent',
                height: height * 0.03,
                width: width - 270,
                fontSize: 20,
                fontWeight: 'bold',
                left: '7%'
              }}>
                Adults
              </Text>
              <Text style={{
                borderWidth: 1,
                borderColor: 'transparent',
                height: height * 0.03,
                width: width - 270,
                fontSize: 18
              }}>
                (12+ Years)
              </Text>
            </View>
            <View style={{
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: 'row',
              alignSelf: 'center',
              height: height * 0.050,
              width: width - 270,
              justifyContent: 'space-between',
              alignItems: 'center',
              right: '2%'
            }}>
              <TouchableOpacity style={{
                borderWidth: 1,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: height * 0.050,
                width: width - 365,
                alignSelf: "center",
                alignContent:'center',
                alignItems:'center',
                backgroundColor: '#fff'
              }} onPress={() => MinusFunction('adult')}>
                <Icon name='minimize' size={25} color={'#000'} />
              </TouchableOpacity>
              <View style={{
                borderWidth: 1,
                height: height * 0.050,
                width: width - 365,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: "rgba(219, 188, 160,0.4)"
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'rgba(31, 31, 31,0.9)'
                }}>
                  {adultNo}
                </Text>
              </View>
              <TouchableOpacity style={{
                borderWidth: 1,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: height * 0.050,
                width: width - 365,
                alignSelf: 'center',
                alignContent:'center',
                alignItems:'center',
                justifyContent:'center',
                backgroundColor: '#fff'
              }} onPress={() => PlusFunction('adult')}>
                <Icon name='add' size={20} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>
          
          {/* Child Section */}
          <View style={{
            borderWidth: 1,
            borderColor: 'transparent',
            top: '6%',
            borderRadius: 10,
            height: height * 0.062,
            width: width - 120,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{
              borderWidth: 1,
              borderColor: 'transparent',
              height: height * 0.062,
              width: width - 310,
              alignSelf: 'flex-start'
            }}>
              <Text style={{
                borderWidth: 1,
                borderColor: 'transparent',
                height: height * 0.03,
                width: width - 270,
                fontSize: 20,
                fontWeight: 'bold',
                left: '5%'
              }}>
                Children
              </Text>
              <Text style={{
                borderWidth: 1,
                borderColor: 'transparent',
                height: height * 0.03,
                width: width - 270,
                fontSize: 18
              }}>
                (2-12 Years)
              </Text>
            </View>
            <View style={{
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: 'row',
              alignSelf: 'center',
              height: height * 0.050,
              width: width - 270,
              justifyContent: 'space-between',
              alignItems: 'center',
              right: '2%'
            }}>
              <TouchableOpacity style={{
                borderWidth: 1,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: height * 0.050,
                width: width - 365,
                alignSelf: "center",
                alignContent:'center',
                alignItems:'center',
                backgroundColor: '#fff'
              }} onPress={() => MinusFunction('child')}>
                <Icon name='minimize' size={25} color={'#000'} />
              </TouchableOpacity>
              <View style={{
                borderWidth: 1,
                height: height * 0.050,
                width: width - 365,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: "rgba(219, 188, 160,0.4)"
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'rgba(31, 31, 31,0.9)'
                }}>
                  {childNo}
                </Text>
              </View>
              <TouchableOpacity style={{
                borderWidth: 1,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: height * 0.050,
                width: width - 365,
                alignSelf: "center",
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center',
                backgroundColor: '#fff'
              }} onPress={() => PlusFunction('child')}>
                <Icon name='add' size={20} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Infant Section */}
          <View style={{
            borderWidth: 1,
            borderColor: 'transparent',
            top: '10%',
            borderRadius: 10,
            height: height * 0.062,
            width: width - 120,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between'
          }}>
            <View style={{
              borderWidth: 1,
              borderColor: 'transparent',
              height: height * 0.062,
              width: width - 310,
              alignSelf: 'flex-start'
            }}>
              <Text style={{
                borderWidth: 1,
                borderColor: 'transparent',
                height: height * 0.03,
                width: width - 270,
                fontSize: 20,
                fontWeight: 'bold',
                left: '7%'
              }}>
                Babies
              </Text>
              <Text style={{
                borderWidth: 1,
                borderColor: 'transparent',
                height: height * 0.03,
                width: width - 270,
                fontSize: 18
              }}>
                (0-2 Years)
              </Text>
            </View>
            <View style={{
              borderWidth: 1,
              borderRadius: 10,
              flexDirection: 'row',
              alignSelf: 'center',
              height: height * 0.050,
              width: width - 270,
              justifyContent: 'space-between',
              alignItems: 'center',
              right: '2%'
            }}>
              <TouchableOpacity style={{
                borderWidth: 1,
                borderTopLeftRadius: 10,
                borderBottomLeftRadius: 10,
                height: height * 0.050,
                width: width - 365,
                alignSelf: "center",
                alignContent:'center',
                alignItems:'center',
                backgroundColor: '#fff'
              }} onPress={() => MinusFunction('infant')}>
                <Icon name='minimize' size={25} color={'#000'} />
              </TouchableOpacity>
              <View style={{
                borderWidth: 1,
                height: height * 0.050,
                width: width - 365,
                alignSelf: 'center',
                justifyContent: 'center',
                backgroundColor: "rgba(219, 188, 160,0.4)"
              }}>
                <Text style={{
                  textAlign: 'center',
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: 'rgba(31, 31, 31,0.9)'
                }}>
                  {infantNo}
                </Text>
              </View>
              <TouchableOpacity style={{
                borderWidth: 1,
                borderTopRightRadius: 10,
                borderBottomRightRadius: 10,
                height: height * 0.050,
                width: width - 365,
                alignSelf: "center",
                justifyContent:'center',
                alignContent:'center',
                alignItems:'center',
                backgroundColor: '#fff'
              }} onPress={() => PlusFunction('infant')}>
                <Icon name='add' size={20} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* At A Time Eight Travellers Message */}
          <View style={{
            borderWidth: 1,
            borderColor: 'transparent',
            height: height * 0.06,
            top: '15%',
            width: width - 100,
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(219, 188, 160,0.9)'
          }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 16.2,
              fontWeight: 'bold'
            }}>
              At A Time Eight Travellers Book Only
            </Text>
          </View>

          {/* Traveller Radio Group */}
          <View style={{ top: '18%', left: '5%' }}>
            <RadioGroup
              radioButtons={TravellersDropdown}
              selectedId={travellerRadioButton}
              onPress={(item) => radiotravellers(item)}
              layout='column'
              labelStyle={{
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: '#000',
                fontSize: 20
              }}
              containerStyle={{
                height: height * 0.15,
                borderWidth: 0.5,
                borderColor: 'transparent',
                width: width - 205,
                alignSelf: 'flex-start',
                justifyContent: 'flex-start',
                alignItems: 'flex-start'
              }}
            />
          </View>
          {tranvellersError&&(
            <View style={{borderWidth:1,borderColor:'transparent',height:height*0.045,width:width-104,alignSelf:'center',alignContent:'center',alignItems:'center',justifyContent:'center',top:'22%'}}>
              <Text style={{fontSize:16,fontWeight:'bold',textAlign:'center',color:'red'}}>(Select nos. of travellers & particular cabin class)</Text>
              </View>
           )}

          {/* Done Button */}
          <TouchableOpacity style={{
            height: height * 0.065,
            width: width - 135,
            borderWidth: 1,
            borderRadius: 10,
            top: '25%',
            alignSelf: 'center',
            borderColor: 'rgba(190, 122, 68,0.9)',
            justifyContent: 'center',
            alignItems: 'center'
          }} onPress={travellerfunctions}>
            <Text style={{
              fontSize: 30,
              color: "rgba(190, 122, 68,0.9)",
              fontWeight: 'bold'
            }}>
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  </View>
)}

        {showSecDropdown&&(
          <View style={{borderWidth:0.5,height:height*0.2,width:width-220,backgroundColor:'rgb(240, 240, 240)',position:'absolute',alignSelf:"flex-end",right:'2.5%',top:'15%',elevation:10}}>
          <FlatList
          keyExtractor={(item)=>item.id.toString()}
          data={fetchRecords}
          renderItem={({item})=>{return showSecondDropdown(item)}}/>
          </View>)}
        
      {showDropdown&&(
     <View style={{borderWidth:0.5,height:height*0.2,width:width-220,backgroundColor:'rgb(240, 240, 240)',position:'absolute',alignSelf:"flex-start",top:'15%',left:'2%',elevation:10}}>
     <FlatList
     keyExtractor={(item)=>item.id.toString()}
     data={fetchRecords}
     renderItem={({item})=>{return showFirstDropdown(item)}}/>
     </View>
      )}
     
    
     {showCalendar && (
  <View
    style={{
      borderWidth: 1,
      borderColor: 'transparent',
      height: height * 0.4,
      width: width - 440,
      alignSelf: 'flex-start',
      position: 'absolute',
      top: '16%',
      elevation: 10,
    }}
  >
    <Calendar
      style={{
        height: height * 0.4,
        width: width - 185,
        fontSize: 20,
        backgroundColor: 'rgb(104, 102, 102)',
      }}
      theme={{
        calendarBackground: 'darkgrey',
        textMonthFontWeight: 'bold',
        textMonthFontSize: 12,
        monthTextColor: 'rgb(10, 57, 110)',
        textMonthBorderWidth: 1,
        arrowColor: '#000',
        arrowStyle: {
          borderColor: 'transparent',
          height: height * 0.05,
          left: '5%',
          width: width - 800,
          borderWidth: 1,
          arrowSize: 20,
          alignSelf: 'center',
          right: 0,
          marginHorizontally: '20%',
        },
        textDayFontSize: 14,
        dayTextColor: '#000',
        todayTextColor: '#E57373',
        textDayHeaderFontSize: 12,
        textDayHeaderFontWeight: 'bold',
        textSectionTitleColor: '#000',
      }}
      onDayPress={onDayPress}
      markedDates={{
        [selectedData]: {
          selected: true,
          marked: true,
          selectedColor: 'rgba(190, 122, 68,0.9)',
        },
      }}
    />
  </View>
)}
{showSecCalendar && (
  <View
    style={{
      borderWidth: 1,
      borderColor: 'transparent',
      height: height * 0.4,
      width: width - 440,
      alignSelf: 'center',
      position: 'absolute',
      top: '16%',
      elevation: 10,
    }}
  >
    <Calendar
      style={{
        height: height * 0.4,
        width: width - 185,
        fontSize: 20,
        backgroundColor: 'rgb(104, 102, 102)',
      }}
      theme={{
        calendarBackground: 'darkgrey',
        textMonthFontWeight: 'bold',
        textMonthFontSize: 12,
        monthTextColor: 'rgb(10, 57, 110)', // Ensure this is valid and not accidentally a text string
        arrowColor: '#000',
        textDayFontSize: 14,
        dayTextColor: '#000',
        todayTextColor: '#E57373', // Highlight color for today
        textDayHeaderFontSize: 12,
        textDayHeaderFontWeight: 'bold',
        textSectionTitleColor: '#000',
      }}
      onDayPress={OnDayPressSecond}
      markedDates={{
        [selectSecData]: {
          selected: true,
          marked: true,
          selectedColor: 'rgba(190, 122, 68,0.9)',
        },
      }}
    />
  </View>
)}
{multiNoOfTravellers && (
  <View
    style={{
      position: 'absolute',
      borderWidth: 1,
      borderColor: 'transparent',
      borderRadius: 10,
      height: height * 0.25,
      top: '45%',
      alignSelf: 'flex-end',
      right: '2%',
    }}
  >
    <View
      style={{
        borderWidth: 1,
        borderColor: 'transparent',
        height: height * 0.04,
        width: width - 300,
        alignSelf: 'flex-end',
        right: '5%',
      }}
    >
      <View
        style={{
          borderWidth: 0.5,
          borderColor: 'rgba(31, 31, 31, 0.9)',
          height: height * 0.04,
          width: width - 370,
          transform: [{ rotate: '43deg' }],
          top: '62%',
          left: '30%',
          backgroundColor: 'rgb(240, 240, 240)',
          elevation: 14,
        }}
      />
    </View>

    <View
      style={{
        borderWidth: 0.5,
        borderColor: 'rgba(31, 31, 31, 0.9)',
        backgroundColor: 'rgb(240, 240, 240)',
        height: height * 0.22,
        width: width - 100,
        borderRadius: 10,
        alignSelf: 'flex-end',
        justifyContent: 'space-between',
        elevation: 14,
      }}
    >
      <ScrollView>
        <View style={{ height: height * 0.69, width: width - 100 }}>
          
          {/* Adults Section */}
          <View
            style={{
              borderWidth: 1,
              borderColor: 'transparent',
              top: '2%',
              borderRadius: 10,
              height: height * 0.062,
              width: width - 120,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: 'transparent',
                height: height * 0.062,
                width: width - 310,
                alignSelf: 'flex-start',
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'transparent',
                  height: height * 0.03,
                  width: width - 270,
                  fontSize: 20,
                  fontWeight: 'bold',
                  left: '7%',
                }}
              >
                Adults
              </Text>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'transparent',
                  height: height * 0.03,
                  width: width - 270,
                  fontSize: 18,
                }}
              >
                (12+ Years)
              </Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                flexDirection: 'row',
                alignSelf: 'center',
                height: height * 0.05,
                width: width - 270,
                justifyContent: 'space-between',
                alignItems: 'center',
                right: '2%',
              }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  height: height * 0.05,
                  width: width - 365,
                  alignSelf: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
                onPress={() => MinusMultiFunction('adult')}
              >
                <Icon name="minimize" size={25} color={'#000'} />
              </TouchableOpacity>

              <View
                style={{
                  borderWidth: 1,
                  height: height * 0.05,
                  width: width - 365,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(219, 188, 160, 0.4)',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'rgba(31, 31, 31, 0.9)',
                  }}
                >
                  {adultMultiNo}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  height: height * 0.05,
                  width: width - 365,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
                onPress={() => PlusMultiFunction('adult')}
              >
                <Icon name="add" size={20} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Children Section */}
          <View
            style={{
              borderWidth: 1,
              borderColor: 'transparent',
              top: '6%',
              borderRadius: 10,
              height: height * 0.062,
              width: width - 120,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: 'transparent',
                height: height * 0.062,
                width: width - 310,
                alignSelf: 'flex-start',
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'transparent',
                  height: height * 0.03,
                  width: width - 270,
                  fontSize: 20,
                  fontWeight: 'bold',
                  left: '5%',
                }}
              >
                Children
              </Text>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'transparent',
                  height: height * 0.03,
                  width: width - 270,
                  fontSize: 18,
                }}
              >
                (2-12 Years)
              </Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                flexDirection: 'row',
                alignSelf: 'center',
                height: height * 0.05,
                width: width - 270,
                justifyContent: 'space-between',
                alignItems: 'center',
                right: '2%',
              }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  height: height * 0.05,
                  width: width - 365,
                  alignSelf: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
                onPress={() => MinusMultiFunction('child')}
              >
                <Icon name="minimize" size={25} color={'#000'} />
              </TouchableOpacity>

              <View
                style={{
                  borderWidth: 1,
                  height: height * 0.05,
                  width: width - 365,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(219, 188, 160, 0.4)',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'rgba(31, 31, 31, 0.9)',
                  }}
                >
                  {childMultiNo}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  height: height * 0.05,
                  width: width - 365,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
                onPress={() => PlusMultiFunction('child')}
              >
                <Icon name="add" size={20} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Babies Section */}
          <View
            style={{
              borderWidth: 1,
              borderColor: 'transparent',
              top: '10%',
              borderRadius: 10,
              height: height * 0.062,
              width: width - 120,
              alignSelf: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <View
              style={{
                borderWidth: 1,
                borderColor: 'transparent',
                height: height * 0.062,
                width: width - 310,
                alignSelf: 'flex-start',
              }}
            >
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'transparent',
                  height: height * 0.03,
                  width: width - 270,
                  fontSize: 20,
                  fontWeight: 'bold',
                  left: '7%',
                }}
              >
                Babies
              </Text>
              <Text
                style={{
                  borderWidth: 1,
                  borderColor: 'transparent',
                  height: height * 0.03,
                  width: width - 270,
                  fontSize: 18,
                }}
              >
                (0-2 Years)
              </Text>
            </View>

            <View
              style={{
                borderWidth: 1,
                borderRadius: 10,
                flexDirection: 'row',
                alignSelf: 'center',
                height: height * 0.05,
                width: width - 270,
                justifyContent: 'space-between',
                alignItems: 'center',
                right: '2%',
              }}
            >
              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderTopLeftRadius: 10,
                  borderBottomLeftRadius: 10,
                  height: height * 0.05,
                  width: width - 365,
                  alignSelf: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
                onPress={() => MinusMultiFunction('infant')}
              >
                <Icon name="minimize" size={25} color={'#000'} />
              </TouchableOpacity>

              <View
                style={{
                  borderWidth: 1,
                  height: height * 0.05,
                  width: width - 365,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(219, 188, 160, 0.4)',
                }}
              >
                <Text
                  style={{
                    textAlign: 'center',
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'rgba(31, 31, 31, 0.9)',
                  }}
                >
                  {infantMultiNo}
                </Text>
              </View>

              <TouchableOpacity
                style={{
                  borderWidth: 1,
                  borderTopRightRadius: 10,
                  borderBottomRightRadius: 10,
                  height: height * 0.05,
                  width: width - 365,
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}
                onPress={() => PlusMultiFunction('infant')}
              >
                <Icon name="add" size={20} color={'#000'} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Additional Information */}
          <View
            style={{
              borderWidth: 1,
              borderColor: 'transparent',
              height: height * 0.06,
              top: '15%',
              width: width - 100,
              alignSelf: 'center',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(219, 188, 160, 0.9)',
            }}
          >
            <Text
              style={{
                textAlign: 'center',
                fontSize: 16.2,
                fontWeight: 'bold',
              }}
            >
              At A Time Eight Travellers Book Only
            </Text>
          </View>

          {/* Radio Button Section */}
          <View style={{ top: '18%', left: '5%' }}>
            <RadioGroup
              radioButtons={TravellersDropdown}
              selectedId={multitravellerRadioButton}
              onPress={(item) => radioMultitravellers(item)}
              layout="column"
              labelStyle={{
                fontStyle: 'italic',
                fontWeight: 'bold',
                color: '#000',
                fontSize: 20,
              }}
              containerStyle={{
                height: height * 0.15,
                borderWidth: 0.5,
                borderColor: 'transparent',
                width: width - 205,
                alignSelf: 'flex-start',
                justifyContent: 'flex-start',
                alignContent: 'flex-start',
                alignItems: 'flex-start',
              }}
            />
          </View>

          {/* Error Message */}
          {multitranvellersError && (
            <View
              style={{
                borderWidth: 1,
                borderColor: 'transparent',
                height: height * 0.045,
                width: width - 104,
                alignSelf: 'center',
                alignContent: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                top: '22%',
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                  color: 'red',
                }}
              >
                (Select numbers of travellers & particular cabin class)
              </Text>
            </View>
          )}

          {/* Done Button */}
          <TouchableOpacity
            style={{
              height: height * 0.065,
              width: width - 135,
              borderWidth: 1,
              borderRadius: 10,
              top: '25%',
              alignSelf: 'center',
              borderColor: 'rgba(190, 122, 68, 0.9)',
              alignContent: 'center',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={multitravellerfunctions}
          >
            <Text
              style={{
                fontSize: 30,
                color: 'rgba(190, 122, 68, 0.9)',
                fontWeight: 'bold',
              }}
            >
              Done
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  </View>
)}

    
      {multiWayCalendarTwo&&(
        <View style={{borderWidth:1,borderColor:'transaprent',height:height*0.4,width:width-440,alignSelf:'flex-start',position:"absolute",top:'32%',left:'43%',elevation:10}}>
        <Calendar
        style={{height:height*0.4,width:width-185,fontSize:20,backgroundColor:'rgb(104, 102, 102)'}}
        onDayPress={DayPassedSec}
        theme={{ 
    calendarBackground:'darkgrey',
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
          [dataSelectedTwo]:{
            selected:true,
            marked:true,
            selectedColor:'rgba(190, 122, 68,0.9)',
          }
        }}
        />
      </View>
      )}
      {multiWayCalendarOne&&(
        <View style={{borderWidth:1,borderColor:'transaprent',height:height*0.4,width:width-440,alignSelf:'flex-start',position:"absolute",top:'32%',left:'28%',elevation:10}}>
          <Calendar
          style={{height:height*0.4,width:width-185,fontSize:20,backgroundColor:'rgb(104, 102, 102)'}}
          onDayPress={DayPassed}
          theme={{ 
      calendarBackground:'darkgrey',
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
            [dataSelectedOne]:{
              selected:true,
              marked:true,
              selectedColor:'rgba(190, 122, 68,0.9)',
            }
          }}
          />
        </View>
      )}
        {multiWayDropdownOne&&(
       <View style={{borderWidth:0.5,height:height*0.2,width:width-225,left:'2%',backgroundColor:'rgb(240, 240, 240)',position:'absolute',top:'43%',alignSelf:'flex-start',elevation:10}}>
        <FlatList
        data={fetchRecords}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item})=>{return multiWayFirstDropdown(item)}}/>
        </View>)}
         
  
       
      {multiWayDropdownTwo&&(
        <View style={{borderWidth:0.5,height:height*0.2,width:width-220,backgroundColor:'rgb(240, 240, 240)',position:'absolute',alignSelf:"flex-end",right:'2.5%',top:'43%',elevation:10}}>
          <FlatList
          data={fetchRecords}
          keyExtractor={(item)=>item.id.toString()}
          renderItem={({item})=>{return multiWaySecondDropdown(item)}}/>
        </View>)}
    </View>
     </LinearGradient>

    </View>
    </SafeAreaView>
  );
};

export default FlightScreen;