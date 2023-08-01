const slider = document.querySelector('.slider');
const thumb = document.querySelector('.slider-thumb');
const sliderValue = document.querySelector('.slider-value');

thumb.addEventListener('mousedown', startDragging);
thumb.addEventListener('touchstart', startDragging, { passive: true });
slider.addEventListener('mousedown', jumpToPosition);
slider.addEventListener('touchstart', jumpToPosition, { passive: true });

function startDragging(e) {
    e.preventDefault();
    document.addEventListener('mousemove', moveThumb);
    document.addEventListener('touchmove', moveThumb, { passive: false });
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging, { passive: true });
}

function moveThumb(e) {
    const x = e.clientX || (e.touches && e.touches.length > 0 ? e.touches[0].clientX : 0);    
    const sliderRect = slider.getBoundingClientRect();
    const leftOffset = x - sliderRect.left;
    const sliderWidth = sliderRect.width;
    const thumbWidth = thumb.offsetWidth;

    let percentage = (leftOffset - thumbWidth / 2) / (sliderWidth - thumbWidth);
    percentage = Math.min(Math.max(percentage, 0), 1);

    thumb.style.left = `${percentage * 100 - 2}%`;
    slider.querySelector('.slider-track').style.width = `${percentage * 100}%`;

    // Display the current value of the slider
    const minValue = 0;
    const maxValue = 100;
    const currentValue = Math.round(percentage * (maxValue - minValue) + minValue);
    sliderValue.textContent = currentValue;
    sliderUpdated(currentValue);
}

function stopDragging() {
    document.removeEventListener('mousemove', moveThumb);
    document.removeEventListener('touchmove', moveThumb);
    document.removeEventListener('mouseup', stopDragging);
    document.removeEventListener('touchend', stopDragging);
}

function jumpToPosition(e) {
    moveThumb(e);
    startDragging(e);
}


// Called whenever slider value changes
function sliderUpdated(val){
    console.log(val);
    // Edit as required
}