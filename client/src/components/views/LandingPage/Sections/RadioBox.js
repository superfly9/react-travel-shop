import React, { useState } from 'react';
import {Collapse, Radio} from 'antd';
import RadioGroup from 'antd/lib/radio/group';

const {Panel} = Collapse;

const RadioBoxComponent=(props)=>{

    const [RadioValue,setRadioValue] = useState(0);

    const renderRadioBox =()=>props.list && props.list.map((item,index)=>(
        <Radio key={item._id} value={item._id}>{item.name}</Radio>
    ))
    const handleChange = (e)=>{
        console.log(e.target.value);
        setRadioValue(e.target.value);
        props.handleFilters(e.target.value);
    }
    return (
        <div>
            <Collapse>
                <Panel header='Price List'>
                    <Radio.Group onChange={handleChange} value={RadioValue}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBoxComponent;