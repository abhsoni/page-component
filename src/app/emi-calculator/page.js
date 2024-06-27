"use client"
import React, { useEffect, useState } from "react";
import {tenureData} from "../utils/constants";
import { numberWithCommas } from "../utils/config";
import TextInput from "../components/text-input";
import SliderInput from "../components/slider-input";

function EMICalculator(){
    const [cost,setCost] = useState(0);
    const [interest,setInterest] = useState(8);
    const [fee,setFee]= useState(1);
    const [downPayment, setDownPayment] = useState(0);
    const [tenure, setTenure] = useState(12);
    const [emi,setEmi] = useState(0);
    useEffect(()=>{
        if(!cost){
            setEmi(0);
            setDownPayment(0);
        }
        const emi = calculateEMI(downPayment);
        setEmi(emi);
    },[tenure, cost]);
    
    const calculateEMI=(downpayment)=>{
        // EMI amount = [P x R x (1+R)^N]/[(1+R)^N-1]
        if(!cost)return;
        const loanAmount = cost - downpayment;
        const rateOfInterest = interest/100;
        const numberOfYears = (tenure/12);
        const emiAmount = (loanAmount*rateOfInterest*(1+rateOfInterest)**numberOfYears)/((1+rateOfInterest)**numberOfYears-1);
        // setEmi(emiAmount);
        return Number(emiAmount/12).toFixed(0);
    }
    const calculateDownPayment=(emi)=>{
        const downPaymentPercentage = 100-(emi/calculateEMI(0))*100;
        return Number((downPaymentPercentage/100)*cost).toFixed(0);
    }
    const updateEMI=(e)=>{
        if(!cost)return;
        const dp=Number(e.target.value);
        setDownPayment(dp.toFixed(0));
        const emi=calculateEMI(dp);
        setEmi(emi);
    }
    const updateDownPayment=(e)=>{
        if(!cost)return;
        const eMI=Number(e.target.value);
        setEmi(eMI.toFixed(0));
        const dp=calculateDownPayment(eMI);
        setDownPayment(dp);
    }
    const totalDownPayment=()=>{
        return numberWithCommas((Number(downPayment)+(cost-downPayment)*(fee/100)).toFixed(0));
    }
    const totalLoanAmount=()=>{
        return numberWithCommas((emi*tenure).toFixed(0));
    }

    return (
    <div className="emiCalcPage min-h-screen bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white" >
        <span className="header_title">EMI Calculator</span>
        <TextInput title={"Total Cost of Asset"} state={cost} setState={setCost}/>
        <TextInput title={"Interest Rate (in %)"} state={interest} setState={setInterest}/>
        <TextInput title={"Processing Fee (in %)"} state={fee} setState={setFee}/>
        <SliderInput
            title={"Down Payment"}
            underlineTitle={`Total Downpayment: ${totalDownPayment()}`}
            onChange={updateEMI}
            min={0}
            max={cost}
            state={downPayment}
            labelMin={"0 %"}
            labelMax={"100 %"}
        />
        <SliderInput
            title={"Loan per Month"}
            underlineTitle={`Total Loan Amount: ${totalLoanAmount()}`}
            onChange={updateDownPayment}
            min={calculateEMI(cost)}
            max={calculateEMI(0)}
            state={emi}
        />
        <span className="title">Tenure</span>
        <div className="tenure_container">
            {tenureData.map((t)=>{return (<button onClick={()=>setTenure(t)} className={`tenure ${t===tenure?"selected":""}`} key={t}>{t}</button>)})}
        </div>
    </div>);
}
export default EMICalculator;