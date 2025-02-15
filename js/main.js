// Configuración para imágenes aleatorias
function getRandomImage(width, height) {
    const randomId = Math.floor(Math.random() * 1000);
    return `https://picsum.photos/${width}/${height}?random=${randomId}`;
}

// Generar 24 posts con diferentes proporciones
const samplePosts = Array.from({ length: 24 }, (_, i) => ({
    user: `user${i + 1}`,
    img: getRandomImage(500, Math.floor(Math.random() * 300 + 400)),
    likes: Math.floor(Math.random() * 5000),
    caption: `Foto increíble #${i + 1}`,
    ratio: Math.random() > 0.5 ? 'vertical' : 'horizontal'
}));

// Función para generar publicaciones dinámicamente
function generatePosts(containerId, posts) {
    const container = $(`#${containerId}`);

    posts.forEach(post => {
        const colClass = post.ratio === 'vertical' ?
            'col-12 col-sm-6 col-md-4 col-lg-3' :
            'col-12 col-md-6 col-lg-4';

        const postHtml = `
        <div class="${colClass}">
            <div class="card hover-effect">
                <img src="${post.img}" 
                     class="card-img" 
                     alt="${post.caption}"
                     loading="lazy">
                <div class="card-img-overlay d-flex flex-column justify-content-end">
                    <div class="content-overlay">
                        <h5 class="text-white">@${post.user}</h5>
                        <p class="text-white-50 mb-0">${post.caption}</p>
                        <div class="d-flex align-items-center mt-2">
                            <i class="fas fa-heart text-danger me-2"></i>
                            <span class="text-white">${post.likes}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;

        container.append(postHtml);
    });

    // Inicializar Masonry
    const masonry = new Masonry(container[0], {
        itemSelector: '.col',
        percentPosition: true,
        transitionDuration: 0
    });
}

$(document).ready(function () {
    // Generar publicaciones en el timeline
    if ($('#timelinePosts').length) {
        generatePosts('timelinePosts', samplePosts);
    }

    // Generar publicaciones en el perfil
    if ($('#userPosts').length) {
        generatePosts('userPosts', samplePosts.slice(0, 3));  // Cargar al menos 3 publicaciones
    }

    // Validación del formulario de login
    $('#loginForm').submit(function (e) {
        e.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();

        // Validar campos vacíos
        if (!username || !password) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        // Simular login exitoso
        if (username === 'demo' && password === 'demo123') {
            alert('Inicio de sesión exitoso. Redirigiendo...');
            window.location.href = 'profile.html';  // Redirigir a la página de perfil
        } else {
            alert('Usuario o contraseña incorrectos.');
        }
    });

    // Mostrar campo "Otro" en género
    $('#gender').change(function () {
        if ($(this).val() === 'Otro') {
            $('#otherGender').removeClass('d-none');
        } else {
            $('#otherGender').addClass('d-none');
        }
    });

    // Validación del formulario de registro
    $('#registerForm').submit(function (e) {
        e.preventDefault();

        const username = $('#username').val();
        const email = $('#email').val();
        const password = $('#password').val();
        const confirmPassword = $('#confirmPassword').val();
        const firstName = $('#firstName').val();
        const gender = $('#gender').val();
        const birthdate = $('#birthdate').val();

        // Validar campos vacíos
        let errors = [];
        if (!username) errors.push('Usuario');
        if (!email) errors.push('Email');
        if (!password) errors.push('Contraseña');
        if (!confirmPassword) errors.push('Confirmar Contraseña');
        if (!firstName) errors.push('Nombre');
        if (!gender) errors.push('Género');
        if (!birthdate) errors.push('Fecha de Nacimiento');

        if (errors.length > 0) {
            alert('Por favor, completa los siguientes campos: ' + errors.join(', '));
            return;
        }

        // Validar contraseñas coincidentes
        if (password !== confirmPassword) {
            alert('Las contraseñas no coinciden.');
            return;
        }

        // Validar edad mínima (18 años)
        const birthDate = new Date(birthdate);
        const minDate = new Date();
        minDate.setFullYear(minDate.getFullYear() - 18);
        if (birthDate >= minDate) {
            alert('Debes ser mayor de 18 años para registrarte.');
            return;
        }

        // Simular registro exitoso
        alert('Registro exitoso. Redirigiendo...');
        window.location.href = 'login.html';
    });
});
