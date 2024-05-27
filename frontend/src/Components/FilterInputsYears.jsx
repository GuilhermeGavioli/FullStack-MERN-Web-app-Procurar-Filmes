
import { useState, Fragment, useContext } from "react";

import SingleSelectionInput from "./Inputs/SingleSelectionInput";
import { FilterContext } from "./Pages/SearchPage";


export default function FilterInputsYears(){
    const {available_years, minYear, setMinYear, maxYear, setMaxYear} = useContext(FilterContext)

    return (
        <Fragment>
            <SingleSelectionInput name={'Min Year'} value={minYear} setValue={setMinYear} available_values={available_years}/>    
            <SingleSelectionInput name={'Max Year'} value={maxYear} setValue={setMaxYear} available_values={available_years}/>    
        </Fragment>
    )

}