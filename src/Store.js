import React,{useState,useReducer,createContext} from 'react';
import io from 'socket.io-client'
export const context = createContext();
const initalState = {
    general: [
        {
            from:'aaron',msg:'hello',
        },
        {
            from:'aaron2',msg:'hello2',
        },
        {
            from:'aaron3',msg:'hello3',
        }
    ],
    topic2: [
        {
            from:'aaron',msg:'hello12',
        },
        {
            from:'aaron2',msg:'hello2',
        },
        {
            from:'aaron3',msg:'hello3',
        }
    ]
}

function reducer(state,action){
    console.log('inreducer',action.payload);    
    const {from,msg,topic} = action.payload;

    switch(action.type){
        case 'RECEIVE_MESSAGE':
            console.log('çççç');
            return {
                ...state,
                [topic]: [
                   ...state[topic],
                   {from, msg}
                ]
            }

        default:
             return state;   
    }
}

let socket;

function sendChatAction(value){
    socket.emit('chat message',value)
}

export default function Store(props) {

    const [allChats,dispatch] = useReducer(reducer,initalState)

    if(!socket){
        socket = io(':3001');
        socket.on('chat message',function(msg){
            console.log('looged',{msg})
            dispatch({type:'RECEIVE_MESSAGE',payload:msg});
        });
    }
    
    const user = 'aaron' + Math.random(100).toFixed(2);
    
    return (
        <context.Provider value={{allChats,sendChatAction,user}} >
                { props.children }
        </context.Provider>
    )
}