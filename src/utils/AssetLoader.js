export class AssetLoader {
    constructor() {
        this.assets = new Map();
        this.promises = [];
    }

    loadImage(key, src) {
        const promise = new Promise((resolve, reject) => {
            const image = new Image();
            image.src = src;
            image.onload = () => {
                this.assets.set(key, image);
                resolve(image);
            };
            image.onerror = (err) => {
                console.error(`Failed to load image: ${src}`);
                reject(err);
            };
        });
        this.promises.push(promise);
    }

    async loadAll() {
        await Promise.all(this.promises);
        console.log('All assets loaded.');
    }

    get(key) {
        const asset = this.assets.get(key);
        if (!asset) {
            throw new Error(`Asset not found: ${key}`);
        }
        return asset;
    }
}