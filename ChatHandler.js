export { ChatHandler, chat_names}
// these are some constants declared that would be used every now and then
const chat_names = ["Vaibhav", "Ratnesh Gupta", "Munna Bhaiya", "Gourav Pareek", "Tarun Bhai", "Shiva Patel", "Praveen Saraswat"];
const chat_names_length = chat_names.length;
const chat_msg = ["Why didn't he come and talk to me himse...",
    "Perfect, I am really glad to hear that!...",
    "This is what I understand you're telling me..",
    "I’m sorry, I don’t have the info on that.."];
const chat_msg_length = chat_msg.length;
const chat_img_length = 7;

class ChatHandler{
// chat list is the list of contacts that we see
// chat template has the structure 
    constructor(chat_template, chat_list){
        this.hashmap = new Map(); //here we created a hashmap
        this.linked_list = null;  //this variable points to the head of my doubly linked list
        this.chat_template = chat_template; //this is a HTML Template which we assign in here
        this.chat_list = chat_list; //this is th reference of the chatlist we are storing here
       //the lines below this are used to set the value of time in our chat_template
        let clock = new Date();
        this.hours = clock.getHours();
        this.mins = clock.getMinutes();
    }


// Here the job of gettime function is to return appropiate time in HH:MM format
// wherever we will need time we would be using this
    getTime(){
        // Time Stamp creation for messages
        this.mins += 1;
        if(this.mins === 60){
            this.hours += 1;
            this.mins = 0;
        }

        if(this.hours === 24){
            this.hours = 0;
        }

        return ("0" + this.hours).slice(-2)+":"+("0" + this.mins).slice(-2);
    }
  // this basically makes a new node with the given ID, that is inserted into the linked list
    createNode(id){
        // Creating node element
        let node = {};
        // Pointers to prev and next,ie the typical structure of DLL
        node['next'] = null;
        node['prev'] = null;
        // Create a copy of chat template into the data variable(named as chat_item in here) of the DLL
        let chat_item = this.chat_template.cloneNode(true);// this clone node function returnes copy of the template structure from index.html 
        // Setting name, message, image to template item
        chat_item.querySelector('#Name').innerText = chat_names[id%chat_names_length]; //this assigns name to corresponding ID into the chat template
        chat_item.querySelector('#Message').innerText = chat_msg[id%chat_msg_length]; // this assigns the message that has to be  shown in that ID
        console.log("./images/avatar" + eval(1+(id%chat_img_length)) + ".png");
        chat_item.querySelector('#Image').src = "./images/avatar" + eval(1+(id%chat_img_length)) + ".png"; //this assigns Image that has to be displayed into the chat item the images are stored in such a way that this code works
        node['chat_item'] = chat_item; //simply putting this caht item into the hashmap
        return node; // and the returning this Node
    }
   // this function nwemsg handles the case where a new message is sent
   //the id passed into the argument is uniuqe for differnt contacts who are present in our chatlist
    newMsg(id){
        let node = null;
        // this is the case when our id(passed in arguments) does not exist in the hash map
        if((id in this.hashmap ) === false){
            // If node not in linked list
            node = this.createNode(id); // this makes the call to createNode function
            this.hashmap[id] = node;
        } else{// if Node is present in the hashmap
            // If node in linked list then we need to remove it and link its neighbouring nodes,this is done by grtkistfromnode function
            node = this.getNodeFromList(id);
        }
        //After getting the requiored node from the linked list,there can be the following cases
        if(this.linked_list === null){// Case 1: when there is no element in th linked list
            // Setting head of empty list
            this.linked_list = node;
        } else{//here linked list is not empty and we replace the head of our linked list with Node we currently got from the get_node function
            // Adding node to head of linked list
            node['next'] = this.linked_list;
            if(this.linked_list!==null)
                this.linked_list['prev'] = node;
            this.linked_list = node; //changed the head of the previous linked list and assigned a new head
        }
        this.updateList();
    }
    //we use this deleteMsg function to remove the LRU(Least Recently Used) Element from the cache when the size of cache is full
    deleteMsg(id){
        let node = this.getNodeFromList(id);
        // No use of node since it has been deleted
        delete this.hashmap[id];
        // Clear entry from hashmap
        this.updateList();
    }


    //this function just removes the Node from the linked list and returnes it
    getNodeFromList(id){
        let node = this.hashmap[id];
        let prevNode = node['prev'];
        let nextNode = node['next'];

        // Update prev and next node pointers
        if(prevNode!==null)
            prevNode['next'] = nextNode;
        if(nextNode!==null)
            nextNode['prev'] = prevNode;

        // Update head of the linked list
        if(node===this.linked_list){
            this.linked_list = nextNode;
        }
        node['next'] = null;
        node['prev'] = null;
        return node;
    }
    // basic purpose of this function is to update the chatlist we usually see
    updateList(){
        // Update the contents of the chat list
        let innerHTML = ''; //we took a string named innerHTML
        let head = this.linked_list; //iterator for the linked list
        while(head!==null){
            let element = head['chat_item'];
            if(head===this.linked_list){ //the head(at the top of the chatlist)node looks a bit different from other nodes,as its classname is differnt 
                element.className = "ks-item ks-active";
                element.querySelector('#Time').innerText = this.getTime();
            } else{
                element.className = "ks-item"; //if that element is not head then we assign normal look to them 
            }
            innerHTML += element.outerHTML; //We keep on adding this to our final string
            head = head['next'];// this is to iterate the linked list
        }
        this.chat_list.innerHTML = innerHTML; // this simply updates the list
    }

}