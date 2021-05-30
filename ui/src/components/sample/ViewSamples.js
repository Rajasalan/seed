import React, {useEffect} from 'react';
import { EuiBasicTable } from '@elastic/eui';
import { Observer } from "mobx-react-lite";
import { useSamplesStore } from "../../store/samplesStore";

function ViewSamples() {

  const { samples } = useSamplesStore();
  console.log(samples);


  
  const updateValues = (samples)=>{
    if(!samples && samples.length==0){
      return [];
    }
  let newSamples=[];

  samples.forEach(element => {
    const object={
      id:element.id,
      field: Object.entries(element.content) && Object.entries(element.content)[0] ? Object.entries(element.content)[0][0]: '',
      value: Object.entries(element.content) && Object.entries(element.content)[0] ? Object.entries(element.content)[0][1]:''
    };
    newSamples.push(object);

  });
  console.log('test', newSamples);
  return newSamples;
  };


  
  const columns = [{
    field: 'id',
    name: 'ID'
  }, {
    field: 'field',
    name: 'Content',
   // render: c => (<ReactJson src={c} collapsed={true}/>)
  },
{
  field: 'value',
  name: 'Name'
}];

  return (
    
    <Observer>{() =>
      <EuiBasicTable
      items={updateValues(samples)}
          columns={columns}
         
      />
   
    }</Observer>
    
  );
}

export default ViewSamples;