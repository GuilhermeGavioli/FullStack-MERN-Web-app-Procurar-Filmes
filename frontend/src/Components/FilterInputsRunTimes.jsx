
import { useState, Fragment, useContext } from "react";

import SingleSelectionInput from "./Inputs/SingleSelectionInput";
import { FilterContext } from "./Pages/SearchPage";

export default function FilterInputsRunTimes(){
    const { available_runtimes, minRuntime, maxRuntime, setMinRuntime, setMaxRuntime } = useContext(FilterContext)
    return (
        <Fragment>
            <SingleSelectionInput name={'Min Runtime (Minutes)'} value={minRuntime} setValue={setMinRuntime} available_values={available_runtimes}/>    
            <SingleSelectionInput name={'Max Runtime'} value={maxRuntime} setValue={setMaxRuntime} available_values={available_runtimes}/>    
        </Fragment>
    )

}