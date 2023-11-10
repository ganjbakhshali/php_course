document.addEventListener('DOMContentLoaded', function () {
    const rightHand = document.querySelector('.shape.b2');
    const leftHand = document.querySelector('.shape.b1');
    const body = document.querySelector('#body');
    const rightEye = document.querySelector('.eyes.a2');
    const leftEye = document.querySelector('.eyes.a1');

    rightHand.addEventListener('click', function (event) {
        moveHand(rightHand, event);
    });

    leftHand.addEventListener('click', function (event) {
        moveHand(leftHand, event);
    });

    body.addEventListener('click', function () {
        toggleEyes();
    });

    function moveHand(hand, event) {
        // Check if the click event target is the leg (shape) element
        if (event.target === hand) {
            const currentRotation = getRotation(hand);
            const newRotation = currentRotation === 0 ? 45 : 0;
            hand.style.transform = `rotate(${newRotation}deg)`;
        }
    }

    function toggleEyes() {
        const rightEyeState = getEyeState(rightEye);
        const leftEyeState = getEyeState(leftEye);

        setEyeState(rightEye, !rightEyeState);
        setEyeState(leftEye, !leftEyeState);
    }

    function getRotation(element) {
        const transform = window.getComputedStyle(element).getPropertyValue('transform');
        const matrix = new DOMMatrix(transform);
        return Math.round(Math.atan2(matrix.b, matrix.a) * (180 / Math.PI));
    }

    function getEyeState(eye) {
        return eye.classList.contains('closed');
    }

    function setEyeState(eye, closed) {
        if (closed) {
            eye.classList.add('closed');
        } else {
            eye.classList.remove('closed');
        }
    }
});
