import React,{useEffect, useCallback, useState } from "react";
import Quill from 'quill';
import "quill/dist/quill.snow.css";
import "./TextEditor.css";
import io from 'socket.io-client';
import {useParams} from 'react-router-dom'

const TOOLBAR_OPTIONS= [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['image', 'blockquote', 'code-block'],
  
    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
    [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction
  
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],
  
    ['clean']                                         // remove formatting button
  ];

const TextEditor = () => {
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const {id: documentId} = useParams();           
    useEffect(()=>{
        const s = io("http://localhost:5000");
        setSocket(s);

        return ()=>{
            s.disconnect();
        };
    },[])

    useEffect(()=>{
        if(socket == null || quill == null) return;
        socket.once("load-documents",(document)=>{
            quill.setContents(document)
        });
        socket.emit("get-document",documentId)
    },[socket,quill,documentId])

    useEffect(()=>{
        if(socket == null || quill == null) return;
        const handler = (delta, oldDelta, source) => {
            if(source !== "user")return;
            socket.emit("send-changes",delta)
            };

        quill.on("text-change", handler);

        return ()=>{
            quill.off("text-change", handler)
        }
    },[socket, quill])


    useEffect(()=>{
        if(socket == null || quill == null) return;
        const handler = (delta)=>{
            quill.updateContents(delta)
        }
        socket.on("recive-changes",handler)
        
        return ()=>{
            socket.off("recive-changes",handler)
        }
    },[socket,quill])

    const wrapperRef = useCallback((wrapper)=>{
        if(wrapper == null) return;
        wrapper.innerHTML = "";
        const editor = document.createElement("div");
        wrapper.append(editor);
        const q = new Quill(editor,{
            theme:"snow",
            modules:{
                toolbar:TOOLBAR_OPTIONS
            }
        });
        setQuill(q);
    },[]);

    return  <div className="container"  ref={wrapperRef}></div>  
};

export default TextEditor