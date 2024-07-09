import { ChatHandler, chat_names } from './ChatHandler.js';

onload = function () {

    const chatlist = document.getElementById('chat-list');//this is the main chatlist element
    const add = document.getElementById('generate-step'); //this is the button which we used on our mainscreen
    const text = document.getElementById('temptext');
    //by the below two items we get a reference to the list items
    const templates = document.getElementsByTagName('template')[0];
    const chat_item = templates.content.querySelector("li");

    const chatHandler = new ChatHandler(chat_item, chatlist);
    let chats = []; //this array hold the id of all the people who have an ID in the chatlist
    

    //whenever the generate new chat button is clicked,then the following function is executed,a new message may come or a present message can be deleted
    add.onclick = function () {
        //this if condition is to handle the case when any element is deleted from the chat list
        if(Math.random()>0.75 && chats.length > 0){
            let index = Math.floor(Math.random()*chats.length);
            let idToDelete = chats[index];
            chatHandler.deleteMsg(idToDelete);
            text.innerHTML = "Deleted message from "+chat_names[idToDelete] + "<br>" + text.innerHTML;
                chats.splice(index, 1);
        } else{
            //this else conditon enables the friend in the list to message back again
            let idOfMsg = Math.floor(Math.random()*7);
            if(chats.includes(idOfMsg)===false){
                chats.push(idOfMsg);
            }
            chatHandler.newMsg(idOfMsg);
            text.innerHTML = "New message from "+chat_names[idOfMsg] + "<br>" + text.innerHTML;
        }
    };
};