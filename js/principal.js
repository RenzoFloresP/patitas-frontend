let msgSuccess;

window.addEventListener('load', function(){
    // Referenciar elementos de la página
    msgSuccess = document.getElementById('msgSuccess');

    // Recuperar nombre del usuario
    const result = JSON.parse(localStorage.getItem('result'));
    if (result) {
        console.log('Resultado del servidor : ', result);
        mostrarAlerta(result.nombreUsuario);

        const logoutLink = document.getElementById('logout_link');
        logoutLink.addEventListener('click', function(){
            alert('Cerrando sesión');
            logout(result.nombreUsuario);
        });
    } else {
        console.error('Error: No se pudo recuperar el resultado');
        mostrarAlerta('Error: No se pudo recuperar el resultado');
    }
});

function mostrarAlerta(mensaje){
    msgSuccess.innerHTML = 'Bienvenido ' + mensaje;
    msgSuccess.style.display = 'block';
}

function ocultarAlerta(){
    msgSuccess.innerHTML = '';
    msgSuccess.style.display = 'none';
}

async function logout(nombreUsuario){
    const url = 'http://localhost:8082/login/logout-async';
    const data = {
        nombreUsuario: nombreUsuario
    };
    console.log('Data a enviar: ', data);
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();
        console.log('Respuesta del servidor: ', result);
        if (result.codigo == '00') {
            window.location.replace('index.html');
        } else {
            mostrarAlerta('Error al finalizar sesion');
        }
    } catch (error) {
        console.error('Ha ocurrido un problema', error);
        mostrarAlerta('Ha ocurrido un problema');
    }
}