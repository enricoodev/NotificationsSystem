document.addEventListener('DOMContentLoaded', () => {
    const Config = {
        info: {
            color: '#3498db',
            icon: 'fa-regular fa-circle-question',
        },
        success: {
            color: '#0abf30',
            icon: 'fa-regular fa-circle-check',
        },
        error: {
            color: '#e24d4c',
            icon: 'fa-regular fa-circle-xmark',
        },
        warning: {
            color: '#e9bd0c',
            icon: 'fas fa-triangle-exclamation',
        }
    };

    const types = Object.keys(Config);
    const ul = document.querySelector('ul');
    const soundNotify = new Audio('sound/sound.mp3');

    let soundOn = false;
    let lastNotification = { type: null, message: null };

    function applyAnimation(element, duration) {
        element.classList.add('fadeIn');
        element.addEventListener('animationend', () => {
            element.classList.remove('fadeIn');
        });

        setTimeout(function() {
            element.classList.add('fadeOut');
            element.addEventListener('animationend', () => {
                element.classList.remove('fadeOut');
                element.remove();

                lastNotification = { type: null, message: null };

            }); 
        }, duration)
    }

    function dotsHidden(element, duration) {
        const dotDuration = duration / 3; 

        const dots = element.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            setTimeout(() => {
                dot.style.opacity = '0'; 
            }, dotDuration * (index + 1));
        });
    }

    function playSound() {
        soundNotify.volume = 0.5;
        soundNotify.play().then(() => {
            soundOn = false;
        }).catch(error => {
            console.error('Failed to play the audio:', error);
        });
    }

    function addNewNotify(title, text, color, icon, duration) {
        let newItem = document.createElement('li');
        newItem.innerHTML = `
            <i class="${icon} icon" style="color: ${color};"></i>
            <div class="content">
                <h4 class="titolo" style="color: ${color};">${title}</h4>
                <p class="testo">${text}</p>
            </div>
            <div class="more-options">
                <div class="dot" style="background-color: ${color};"></div>
                <div class="dot" style="background-color: ${color};"></div>
                <div class="dot" style="background-color: ${color};"></div>
            </div>   
        `;

        ul.appendChild(newItem);
        
        applyAnimation(newItem, duration);
        dotsHidden(newItem, duration);
    
    }

    window.addEventListener('message', function(event) {
        if (event.data.action === "notify") {
            if (types.includes(event.data.type)) {
                if(lastNotification.message === event.data.message && lastNotification.type === event.data.type) { 
                    console.log("Duplicate notification prevented");
                    return; 
                }

                lastNotification = {
                    type: event.data.type,
                    message: event.data.message
                };

                console.log("message of the notification: "+event.data.message);
                
                if (!soundOn) {
                    soundOn = true;
                    playSound();
                }

                addNewNotify(event.data.title, event.data.message, Config[event.data.type].color, Config[event.data.type].icon,  event.data.duration);
            
            } else {
                console.log('Notify Type does not exist');
            }
        }
    });
    
});
