let tID;

//stop animation
export default function stopAnimate() {
    clearInterval(tID); 
}

// animate script
export default function animateScript() {
    let position = 538;
    const  interval = 100;
    const diff = 538;

    tID = setInterval ( () => {
        document.getElementById("image").style.backgroundPosition = 
        `-${position}px 0px`;
        if (position < 5380) {
            position += diff;
        } else {
            position = 538;
            stopAnimate();
        }
    }
    , interval);
}
