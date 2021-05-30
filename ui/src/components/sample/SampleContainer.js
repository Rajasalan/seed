import React, {useEffect} from 'react';
import CreateSample from './CreateSample';
import ViewSamples from './ViewSamples';
import {
  EuiPage,
  EuiPageBody,
  EuiPageContent
} from '@elastic/eui'
import { EuiSpacer } from '@elastic/eui';
import axios from "axios";
import {useSamplesStore} from "../../store/samplesStore";

function SampleContainer() {

  const { setSamples } = useSamplesStore();

  useEffect(() => {
    axios.get("http://localhost:8000/samples")
      .then(res => {
        console.log(res.data);
        setSamples(res.data);
      }).catch((error) => {
      console.log("Error" + error);
    })
  }, [setSamples]);

  return (
    <EuiPage>
      <EuiPageBody>
        <EuiPageContent>
          <ViewSamples/>
          <EuiSpacer size="xl"/>
          <CreateSample />
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
}

export default SampleContainer;