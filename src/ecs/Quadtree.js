export class Rectangle {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
    }

    contains(point) {
        return (
            point.x >= this.x &&
            point.x < this.x + this.width &&
            point.y >= this.y &&
            point.y < this.y + this.height
        );
    }

    intersects(range) {
        return !(
            range.x > this.x + this.width ||
            range.x + range.width < this.x ||
            range.y > this.y + this.height ||
            range.y + range.height < this.y
        );
    }
}

export class Quadtree {
    constructor(bounds, capacity = 4) {
        this.bounds = bounds; // A Rectangle object
        this.capacity = capacity;
        this.points = [];
        this.divided = false;
    }

    subdivide() {
        const { x, y, width, height } = this.bounds;
        const hw = width / 2;
        const hh = height / 2;

        const ne = new Rectangle(x + hw, y - hh, hw, hh);
        this.northeast = new Quadtree(ne, this.capacity);
        const nw = new Rectangle(x - hw, y - hh, hw, hh);
        this.northwest = new Quadtree(nw, this.capacity);
        const se = new Rectangle(x + hw, y + hh, hw, hh);
        this.southeast = new Quadtree(se, this.capacity);
        const sw = new Rectangle(x - hw, y + hh, hw, hh);
        this.southwest = new Quadtree(sw, this.capacity);

        this.divided = true;
    }

    insert(point) { // point should have x, y and an entity id
        if (!this.bounds.contains(point)) {
            return false;
        }

        if (this.points.length < this.capacity) {
            this.points.push(point);
            return true;
        } else {
            if (!this.divided) {
                this.subdivide();
            }

            if (this.northeast.insert(point)) return true;
            if (this.northwest.insert(point)) return true;
            if (this.southeast.insert(point)) return true;
            if (this.southwest.insert(point)) return true;
        }
    }

    query(range, found) {
        if (!found) {
            found = [];
        }

        if (!this.bounds.intersects(range)) {
            return found;
        }

        for (let p of this.points) {
            if (range.contains(p)) {
                found.push(p);
            }
        }

        if (this.divided) {
            this.northwest.query(range, found);
            this.northeast.query(range, found);
            this.southwest.query(range, found);
            this.southeast.query(range, found);
        }

        return found;
    }
    
    clear() {
        this.points = [];
        this.divided = false;
        if (this.northeast) this.northeast.clear();
        if (this.northwest) this.northwest.clear();
        if (this.southeast) this.southeast.clear();
        if (this.southwest) this.southwest.clear();
    }
}