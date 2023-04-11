import React from "react";
import { useLocation } from "react-router-dom";
import { useState, useReducer } from 'react';

const Upload = () => {



    return (
        <div className="Upload">
            <div className="Upload_header">
                <h1> Upload a new listing </h1>
            </div>
            <div className="Upload_form">
                    <label for="title">Title</label>
            </div>
        </div>
    )

}

export default Upload;