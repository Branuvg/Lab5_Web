const getMessages = async () => {
    try {
        const response = await fetch('https://chat.calicheoficial.lat/messages');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

document.body.style.backgroundImage = "url('https://i.pinimg.com/564x/f8/2e/e5/f82ee56e77a8cf3dcfb737c6d0ddf403.jpg')";

const postMessages = async (message) => {
    const body = JSON.stringify(message);
    await fetch('https://chat.calicheoficial.lat/messages', {
        method: 'POST',
        body
    });
};

const drawMessages = async (ul) => {
    ul.innerHTML = ''; // Limpiar la lista antes de actualizar
    const messages = await getMessages();

    const scrollPosition = ul.scrollTop;
    const isAtBottom = ul.scrollHeight - ul.clientHeight <= scrollPosition + 10;

    messages.forEach((message) => {
        const li = document.createElement('li');
        li.style.backgroundColor = '#9A8C98';
        li.style.maxWidth = '50%';
        li.style.height = 'auto';
        li.style.padding = '5px';
        li.style.margin = '5px';
        li.style.border = '2px solid black';
        li.style.borderRadius = '10px';
        li.style.whiteSpace = 'pre-wrap'; 
        li.style.wordBreak = 'break-word';

        const user = document.createElement('span');
        user.style.fontWeight='bold';
        
        if (message.user === 'Bran') {
            li.style.marginLeft = '48%';
            li.style.backgroundColor = '#6a97c4';
        }

        user.append(`${message.user}: `);
        
        const text = document.createElement('span');
        text.append(message.text);

        li.append(user);
        li.append(text);
        
        ul.append(li);
    });

    if (isAtBottom) {
        ul.scrollTop = ul.scrollHeight; 
    } else {
        ul.scrollTop = scrollPosition; 
    }
};

const messagesContainer = async () => {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');

    h1.append('Mensajes de la clase');
    h1.style.textAlign = "center"
    h1.style.color = "white"
    h1.style.fontSize = "40px"

    const ul = document.createElement('ul');
    ul.style.listStyle = 'none';
    ul.style.width = '90%';
    ul.style.height = '70vh';

     ul.style.overflowY = 'auto'
     ul.style.overflow = 'auto';
     ul.style.setProperty('overflow', 'auto');
     ul.style.setProperty('scrollbar-width', 'none');
     ul.style.border = '4px solid black';
     ul.style.borderRadius = '10px';
     ul.style.padding = '10px';
     ul.style.margin = 'auto';
     ul.style.display = 'block';
     ul.style.backgroundColor = '#6AC59C';
 

    await drawMessages(ul); // Llenar la lista inicialmente

    div.append(h1);
    div.append(ul);

    document.body.append(div);
    return ul;
};


const drawInput = async (ul) => {
    const divify = document.createElement('div');
    divify.style.display = 'flex';
    divify.style.flexDirection = 'row';
    divify.style.marginTop = '10px';
    divify.style.gap = '10px';
    divify.style.width = '90%';  // Alineado con la lista de mensajes
    divify.style.margin = 'auto'; // Centrarlo
    divify.style.marginTop = '10px'

    const textarea = document.createElement('textarea');
    textarea.style.resize = 'none';
    textarea.style.width = '110%'; // Ocupar todo el ancho del div
    textarea.style.border = '2px solid black';
    textarea.style.borderRadius = '10px';
    textarea.style.padding = '10px';
    textarea.style.fontSize = '16px';

    const button = document.createElement('button');
    button.append('Enviar');
    
    const sendMessage = async () => {
        const messageText = textarea.value;

        if (messageText.length > 140) {
            alert('El mensaje no puede exceder los 140 caracteres.');
            return;
        }

        const message = {
            text: textarea.value,
            user: 'Bran'
        };
        await postMessages(message);
        textarea.value = ''; 
        await drawMessages(ul); 
    };

    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { 
            e.preventDefault(); 
            sendMessage();
        }
    });

    button.onclick = sendMessage;

    divify.append(textarea);
    divify.append(button);

    document.body.append(divify);
};

const main = async () => {
    const ul = await messagesContainer();
    await drawInput(ul); 

    // Auto-refresh
    setInterval(() => drawMessages(ul), 30000);

};

main();