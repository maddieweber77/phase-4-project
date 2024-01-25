import React, { useState, useEffect } from "react";


function Caption({caption}) {


    return(
        <>
            <p className = {'caption'}>{caption.entry}</p>
        </>
    )
}

export default Caption;