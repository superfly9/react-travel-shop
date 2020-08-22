import React, { useState } from 'react';
import {Collapse, Radio} from 'antd';

const {Panel} = Collapse;

const RadioBoxComponent=(props)=>{

    const [RadioValue,setRadioValue] = useState(0);

    const renderRadioBox =()=>props.list && props.list.map((item,index)=>(
        <Radio key={item._id} value={item._id}>{item.name}</Radio>
    ))
    const handleChange = (e)=>{
        setRadioValue(e.target.value);
        props.handleFilters(e.target.value);
    }
    return (
        <div>
            <Collapse>
                <Panel header='내가 원하는 가격'>
                    <Radio.Group onChange={handleChange} value={RadioValue}>
                        {renderRadioBox()}
                    </Radio.Group>
                </Panel>
            </Collapse>
        </div>
    )
}

export default RadioBoxComponent;