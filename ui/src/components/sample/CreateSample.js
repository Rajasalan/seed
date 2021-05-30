import React, {useState} from 'react';
import ReactJson from 'react-json-view'

import {
  EuiButton
} from '@elastic/eui';

import { EuiSpacer } from '@elastic/eui';
import { useSamplesStore } from "../../store/samplesStore";

function CreateSample() {
  const [json, setJson] = useState({
    content: {},
  });

  const onAdd = e => {
    setJson(e.updated_src)
    
  }

  const onEdit = e => {
    setJson(e.updated_src);
  }

  const onDelete = e => {
    setJson(e.updated_src);
  }

  const store = useSamplesStore();
  const { addSample } = store;

  return (
    <React.Fragment>
      <p>Add a Sample</p>
      <EuiSpacer size="s"/>
      <ReactJson src={json}
               onAdd={onAdd}
                 onEdit={onEdit}
                 onDelete={onDelete} />
      <EuiSpacer size="s"/>
      <EuiButton onClick={() => {addSample(json)}}>Save</EuiButton>
    </React.Fragment>
  );
}

export default CreateSample;