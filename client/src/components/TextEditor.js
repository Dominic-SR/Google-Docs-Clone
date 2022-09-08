import React,{useEffect, useCallback, useState} from "react";
import Quill from 'quill';
import ReactQuill from 'react-quill';
import "quill/dist/quill.snow.css"

const TextEditor = () => {

    const [value, setValue] = useState('');
    useEffect(()=>{
        const q = new Quill('#editor',{
            theme:'snow'
        });
    },[])

    // const wrapperRef = useCallback((wrapper)=>{
    //     if(wrapper == null) return;
    //     wrapper.innerHTML = "";
    //     const editor = document.createElement("div");
    //     wrapper.append(editor);
    //      new Quill(editor,{
    //         theme:"show",
    //     });
    // },[]);

    return (
        <>
        <ReactQuill theme="snow" value={value} onChange={setValue} />
        <div className="container" id ="editor" r>
        </div>
        </>
    )
}

export default TextEditor