import {socket, getTemplate} from "./index.js";

//Una vez recibido el template.ejs activo los sockets:
const initChat = (templateEJS) => {
    //HISTORIAL de CHAT
    socket.on('chatHistoric', arrayMsjs =>{ 
        addMessageToDom(templateEJS, arrayMsjs);
    });

    //NUEVO MENSAJE
    socket.on('newMessage', arrayMsj =>{
        addMessageToDom(templateEJS, arrayMsj);
    });
};

const addMessageToDom = (templateEJS, arrayMsjs) => {
    const htmlCode = ejs.render(templateEJS,  {messages: arrayMsjs});
    document.querySelector('.messagesList').insertAdjacentHTML('beforeend', htmlCode);
}

//Solicito el template (archivo y callback)
getTemplate('chatTemp.ejs', initChat);

//LISTENER ENVIAR MENSAJE
document.querySelector('#sendMessageForm').addEventListener('submit', (e)=>{
    e.preventDefault();
    //creo el objeto
    const objMessage={
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };
    //envío el objeto
    socket.emit('newMessage', objMessage);
    //elimino el mensaje del textbox y hago foco:
    document.getElementById('message').value="";
    document.getElementById('message').focus();
});

