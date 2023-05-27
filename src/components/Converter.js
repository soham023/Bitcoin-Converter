import React, { useState } from 'react'
import { useEffect } from 'react';
import { Button,Card,Form,Input,Select } from 'antd';

function Converter() {

    const apiUrl = 'https://api.coingecko.com/api/v3/exchange_rates';

    const defaultFirstSelectValue = "Bitcoin";
    const defaultSecondSelectValue = "Ether";
    const [cryptoList, setCryptoList] = useState([]);
    const [InputValue, setInputValue] = useState("0");
    const [firstSelect, setFirstSelect] = useState(defaultFirstSelectValue );
    const [secondSelect, setSecondSelect] = useState(defaultSecondSelectValue );
    const [result, setResult] = useState();
    useEffect(() => {
        fetchData();
    }, [])

    useEffect(()=>{

        console.log(InputValue, firstSelect, secondSelect)
        if(cryptoList.length == 0) return;

        const firstSelectRate = cryptoList.find((item) => {
            return item.value === firstSelect;
        }).rate;

        const secondSelectRate = cryptoList.find((item) => {
            return item.value === secondSelect;
        }).rate;
        console.log(firstSelectRate, secondSelectRate);

        const resultValue = (InputValue * secondSelectRate / firstSelectRate);

        setResult(resultValue.toFixed(2));

    },[InputValue,firstSelect,secondSelect]);

    async function fetchData(){
        const response = await fetch(apiUrl);
        const jsonData = await response.json();
        const data = jsonData.rates;

        console.log(data);
        // const tempArray = [];
        // Object.entries(data).forEach(item =>{
        //     const tempObj = {
        //         value : item[1].name,
        //         label : item[1].name,
        //         rate : item[1].value
        //     }
        //     tempArray.push(tempObj);
        // });
        

        const tempArray = Object.entries(data).map(item =>{
            return {
                value : item[1].name,
                label : item[1].name,
                rate : item[1].value
            }
        })
        console.log(tempArray);
        setCryptoList(tempArray);
        console.log(cryptoList)
    }
    
  return (
    <div>
    <Card className='crypto-card' title={<h1>Crypto-Converter</h1>}>
        <Form>
            <Form.Item>
                <Input
                    onChange = {(event) => setInputValue(event.target.value)}
                />
            </Form.Item>
            
        </Form>
        <div className='select-box'>
            <Select 
                style={{width: '200px' }} 
                defaultValue={defaultFirstSelectValue} 
                options={cryptoList}
                onChange={(value)=>setFirstSelect(value)}
            />
            <Select 
                style={{width: '200px' }} 
                defaultValue={defaultSecondSelectValue} 
                options={cryptoList}
                onChange={(value)=>setSecondSelect(value)}
            />
        </div>
        
        
        <p className='result'>{InputValue} {firstSelect}={result} {secondSelect}</p>
        
    </Card>
    
    </div>
  )
}

export default Converter