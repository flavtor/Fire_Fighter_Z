export default class Animate {
  constructor() {
    this.position = 350; // Starting position for the animation, represent the first image
    this.interval = 100; // Interval time for animation update
    this.diff = 350; // Difference between each animation frame
    this.tID = null;
  }

  // Function to stop the animation

  stopAnimate() {
    clearInterval(this.tID);
  }

  // Function to animate an sprite with the name in parameter and the imageSize of animation
  // (interval parameter is as 100 by default)

  animateSprite(sprite, imageSize, interval = this.interval) {
    this.tID = setInterval(() => {
      const spriteSelector = document.querySelector(`.${sprite}`);
      spriteSelector.classList.add("animation");
      spriteSelector.style.backgroundPosition = `-${this.position}px 0px`;
      if (this.position < imageSize) {
        this.position += this.diff;
      } else {
        this.position = 350;
        spriteSelector.classList.remove("animation");
        this.stopAnimate();
      }
    }, interval);
  }
}
