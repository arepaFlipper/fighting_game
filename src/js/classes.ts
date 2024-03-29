import { canvas, c, gravity } from "./canvas";

export class Sprite {
  position = { x: 0, y: 0 };
  height: number = window.innerHeight;
  width: number = window.innerWidth;
  image_src: string = "";
  image: HTMLImageElement = new Image();

  constructor({ position, image_src }: { position: { x: number; y: number }, image_src: string }) {
    this.position = position;
    this.height;
    this.width;
    this.image;
    this.image.src = image_src;
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();
  }

}

export class Fighter {
  position = { x: 0, y: 0 };
  velocity = { x: 0, y: 0 };
  height: number = 150;
  width: number = 50;
  last_key: string = "";
  attack_box = {
    position: { x: 0, y: 0 },
    offset: { x: 0, y: 0 },
    width: 100,
    height: 50,
  };
  color: string = "";
  is_attacking: boolean = false;
  health: number =100;

  constructor({ position, velocity, color, offset, }: {
    position: { x: number; y: number }; offset: { x: number; y: number }; velocity: { x: number; y: number }; color: string;
  }) {
    this.position = position;
    this.velocity = velocity;
    this.height;
    this.width;
    this.last_key;
    this.attack_box = {
      position: { x: 0, y: 0 },
      offset,
      width: 100,
      height: 50,
    };
    this.color = color;
    this.health;
  }

  draw() {
    c.fillStyle = this.color;
    c.fillRect(this.position.x, this.position.y, this.width, 150);

    if (this.is_attacking) {
      c.fillStyle = "green";
      c.fillRect( this.attack_box.position.x, this.attack_box.position.y, this.attack_box.width, this.attack_box.height);
    }
  }

  update() {
    this.draw();
    this.attack_box.position.x = this.position.x + this.attack_box.offset.x;
    this.attack_box.position.y = this.position.y + this.attack_box.offset.y;

    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;

    if (this.position.y + this.height + this.velocity.y >= canvas.height * (.835) ) {
      // touch the ground
      this.velocity.y = 0;
    } else {
      this.velocity.y += gravity;
    }

    if ( this.position.x + this.velocity.x <= 0 || this.position.x + this.velocity.x >= canvas.width - 50) {
      this.velocity.x = 0;
      if (this.position.x >= canvas.width - 50) {
        this.position.x = canvas.width - 50;
      } else if (this.position.x <= 0) {
        this.position.x = 0;
      }
    }
  }

  attack() {
    this.is_attacking = true;
    setTimeout(() => {
      this.is_attacking = false;
    }, 100);
  }
}


