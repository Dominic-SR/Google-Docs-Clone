import React,{useEffect, useRef} from "react";
import Quill from 'quill';
import "quill/dist/quill.snow.css"

const TextEditor = () => {

    useEffect(()=>{
        const q = new Quill('#editor',{
            theme:'snow'
        });
    },[])

    return (
        <div className="container" id ="editor">
            
        </div>
    )
}

export default TextEditor