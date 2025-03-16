const getMessages = async () => {
    try {
        const response = await fetch('https://chat.calicheoficial.lat/messages');
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

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

    // Guardar la posición actual del scroll antes de actualizar
    const scrollPosition = ul.scrollTop;
    const isAtBottom = ul.scrollHeight - ul.clientHeight <= scrollPosition + 10;

    messages.forEach((message) => {
        const li = document.createElement('li');

        const user = document.createElement('span');
        
        if (message.user === 'Bran') {
            li.style.marginLeft = '20%';
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

const drawInput = async (ul) => {
    const divify = document.createElement('div');

    const textarea = document.createElement('textarea');

    const button = document.createElement('button');
    button.append('Enviar');

    
    const sendMessage = async () => {
        // msg de menos 140
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
        textarea.value = ''; // Limpia el textarea
        await drawMessages(ul); // Refresca los mensajes
    };

    // "Enter" para hacer submit
    textarea.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) { // shift 
            e.preventDefault(); // Evitar el salto de linea
            sendMessage();
        }
    });

    // enviar con el btn
    button.onclick = sendMessage;

    divify.append(textarea);
    divify.append(button);

    document.body.append(divify);
};

const drawMessagesContainer = async () => {
    const div = document.createElement('div');
    const h1 = document.createElement('h1');

    h1.append('Mensajes de la clase');

    const ul = document.createElement('ul');

    await drawMessages(ul); // Llenar la lista inicialmente

    div.append(h1);
    div.append(ul);

    document.body.append(div);
    return ul;
};

const main = async () => {
    const ul = await drawMessagesContainer(); // Guardamos la referencia de la lista
    await drawInput(ul); // Pasamos la referencia para actualizar la misma lista

    // Auto-refresh
    setInterval(() => drawMessages(ul), 30000);

};

main();