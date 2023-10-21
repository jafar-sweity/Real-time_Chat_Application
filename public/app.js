const socket = io('ws://localhost:3000')

const input = document.querySelector('#message')
const name = document.querySelector('#name')
const ChatRoom = document.querySelector('#room')
const activity = document.querySelector('.activity')
const userlist = document.querySelector('.user-list')
const roomlist = document.querySelector('.room-list')
const chatdisplay = document.querySelector('.chat-display')

const sendMessage =(message)=>{
    message.preventDefault()
    if(input.value && name.vlaue && ChatRoom.input){
        socket.emit('message',{
            "name":name.value,
            "text":input.value

        })
    input.value= '';
    }

    input.focus()


    
}

const enterRoom = (Event)=>{
    Event.preventDefault()
    if(name.value && ChatRoom.value){
        socket.emit('enterRoom',{
            "name":name.value,
            "room":ChatRoom.value
        })
    }
}
document.querySelector('form')
.addEventListener('submit',sendMessage)


socket.on('message',(data)=>{
activity.textContent='';

})
