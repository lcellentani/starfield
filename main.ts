let screenWidth = scene.screenWidth();
let screenHeight = scene.screenHeight();
let screenHalfWidth = screenWidth / 2;
let screenHalfHeight = screenHeight / 2;

const makeStars = (count: number) => {
    const out = [];
    for (let i = 0; i < count; i++) {
        const s = {
            x: (Math.random() * screenWidth) - screenHalfWidth,
            y: (Math.random() * screenHeight) - screenHalfHeight,
            z: Math.random() * 1000
        };
        out.push(s);
    }
    return out;
}

const clearImage = (image: Image, color: number) => {
    image.fillRect(0, 0, screenWidth, screenHeight, color)
};

const putPixel = (x: number, y: number, image: Image, color: number) => {
    image.setPixel(x, y, color)
};

const moveStars = (distance: number) => {
    const count = stars.length;
    for (let i = 0; i < count; i++) {
        const s = stars[i];
        s.z -= distance;
        while (s.z <= 1) {
            s.z += 1000;
        }
    }
}

let stars = makeStars(120);
let backgroundImage = scene.backgroundImage();
let colors = [1, 1, 1, 1, 9, 9, 9, 9, 8, 8];

game.onUpdate(function () {
    moveStars(10);

    clearImage(backgroundImage, 15);
    const count = stars.length;
    for (let i = 0; i < count; i++) {
        const star = stars[i];
        let z = star.z * 0.001;
        let x = (star.x / z) + screenHalfWidth;
        let y = (star.y / z) + screenHalfHeight;
        if (x < 0 || x >= screenWidth || y < 0 || y >= screenHeight) {
            continue;
        }
        let index = Math.round(z / 0.1);
        const color = colors[index];

        putPixel(x, y, backgroundImage, color);
    }
});
