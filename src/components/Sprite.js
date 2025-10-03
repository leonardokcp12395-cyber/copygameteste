export class Sprite {
    constructor(image, width, height, frame = 0, scale = 1) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.frame = frame;
        this.scale = scale;
        this.opacity = 1;
    }
}