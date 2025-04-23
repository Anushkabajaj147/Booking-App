import { View, Text ,TouchableOpacity,Dimensions,TextInput} from 'react-native';
import React, { useState } from 'react';
import {Dropdown }from 'react-native-element-dropdown';
import Data from './DropDown';

const dropdown = () => {
    const{height,width}=Dimensions.get('screen');
     const[showDropdown,setShowDropdown]=useState(false);
      const[dropdownValue,setDropdownValue]=useState('');
       const[dropdownString,setDropdownString]=useState('');
       const DataRender=(item)=>{
        const record=`${item.label} ${item.value}`;
        setDropdownValue(item.value);
        setDropdownString(record);
        setShowDropdown(false)
         };
  return (
    <View>
      <Text>dropdown</Text>
      <TouchableOpacity style={{borderWidth:0.5,height:height*0.08,width:width-215}} onPress={()=>setShowDropdown(true)}> 
         <Dropdown
                data={Data}
                labelField="label" // Field for labels
                valueField="value" // Field for values
                value={dropdownValue}
                onChange={DataRender}
                renderItem={(item)=>{return <View style={{borderWidth:1}}>
    <Text>{`${item.label}${item.value}`}</Text>
  </View>}}
  />
    <TextInput placeholder='Select A state' value={dropdownString} editable={false} style={{height:height*0.05,borderWidth:1,fontSize:10}}/>
           </TouchableOpacity>
    </View>
  );
};

export default dropdown;