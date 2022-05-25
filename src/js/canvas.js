import platform from '../img/platform.png'
import hills from '../img/hills.png'
import background from '../img/background.png'
import platformSmallTall from '../img/platformSmallTall.png'

import spriteMarioRunLeft from '../img/spriteMarioRunLeft.png'
import spriteMarioRunRight from '../img/spriteMarioRunRight.png'
import spriteMarioStandLeft from '../img/spriteMarioStandLeft.png'
import spriteMarioStandRight from '../img/spriteMarioStandRight.png'
import spriteMarioJumpRight from '../img/spriteMarioJumpRight.png'
import spriteMarioJumpLeft from '../img/spriteMarioJumpLeft.png'

import spriteGoomba from '../img/spriteGoomba.png'

//project setup
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = 1024
canvas.height = 576

const gravity = 1.5

//player creation
class Player {
  constructor() {
    this.speed = 10
    this.position = {
      x: 100,
      y: 100
    }
    this.velocity = {
      x: 0,
      y: 0
    }

    this.scale = 0.3
    this.width = 398 * this.scale
    this.height = 353 * this.scale

    //this.image = createImage(spriteStandRight)
    this.frames = 0
    this.sprites = {
      stand: {
        right: createImage(spriteMarioStandRight),
        left: createImage(spriteMarioStandLeft),
        cropWidth: 398,
        width: 398 * this.scale
      },
      run: {
        right: createImage(spriteMarioRunRight),
        left: createImage(spriteMarioRunLeft),
        cropWidth: 398,
        width: 398 * this.scale
      },
      jump: {
        right: createImage(spriteMarioJumpRight),
        left: createImage(spriteMarioJumpLeft),
        cropWidth: 398,
        width: 398 * this.scale
      }
    }

    this.currentSprite = this.sprites.stand.right
    this.currentCropWidth = this.sprites.stand.cropWidth
  }

  draw() {
    c.drawImage(
      this.currentSprite,
      this.currentCropWidth * this.frames,
      0,
      this.currentCropWidth,
      353,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  //player update function + gravity
  update() {
    this.frames++

    if (
      this.frames > 58 &&
      (this.currentSprite === this.sprites.stand.right ||
        this.currentSprite === this.sprites.stand.left)
    )
      this.frames = 0
    else if (
      this.frames > 28 &&
      (this.currentSprite === this.sprites.run.right ||
        this.currentSprite === this.sprites.run.left)
    )
      this.frames = 0
    else if (
      this.currentSprite === this.sprites.jump.right ||
      this.currentSprite === this.sprites.jump.left
    )
      this.frames = 0

    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity
      // else this.velocity.y = 0
  }
}

class Platform {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }

    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class GenericObject {
  constructor({ x, y, image }) {
    this.position = {
      x,
      y
    }

    this.image = image
    this.width = image.width
    this.height = image.height
  }

  draw() {
    c.drawImage(this.image, this.position.x, this.position.y)
  }
}

class Goomba {
  constructor({
    position,
    velocity,
    distance = {
      limit: 50,
      traveled: 0
    }
  }) {
    this.position = {
      x: position.x,
      y: position.y
    }

    this.velocity = {
      x: velocity.x,
      y: velocity.y
    }

    this.width = 43.33
    this.height = 50

    this.image = createImage(spriteGoomba)
    this.frames = 0

    this.distance = distance
  }

  draw() {
    // c.fillStyle = 'red'
    // c.fillRect(this.position.x, this.position.y, this.width, this.height)

    c.drawImage(
      this.image,
      130 * this.frames,
      0,
      130,
      150,
      this.position.x,
      this.position.y,
      this.width,
      this.height
    )
  }

  update() {
    this.frames++
    if (this.frames >= 58) this.frames = 0
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.height + this.velocity.y <= canvas.height)
      this.velocity.y += gravity

    //change goomba direction
    this.distance.traveled += Math.abs(this.velocity.x)

    if (this.distance.traveled > this.distance.limit) {
      this.distance.traveled = 0
      this.velocity.x = -this.velocity.x
    }
    console.log(this.distance.traveled)
  }
}


class Particle {
  constructor({ position, velocity, radius }) {
    this.position = {
      x: position.x,
      y: position.y
    }

    this.velocity = {
      x: velocity.x,
      y: velocity.y
    }

    this.radius = radius
    this.ttl = 300
  }

  draw() {
    c.beginPath()
    c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
    c.fillStyle = '#654428'
    c.fill()
    c.closePath()
  }

  update() {
    this.ttl--
    this.draw()
    this.position.x += this.velocity.x
    this.position.y += this.velocity.y

    if (this.position.y + this.radius + this.velocity.y <= canvas.height)
      this.velocity.y += gravity * 0.4
  }
}

//o functie pentru a implementa mai multe imagini
function createImage(imageSrc) {
  const image = new Image()
  image.src = imageSrc
  return image
}

function createImageAsync(imageSrc) {
  return new Promise((resolve) => {
    const image = new Image()
    image.onload = () => {
      resolve(image)
    }
    image.src = imageSrc
  })
}

let platformImage
let platformSmallTallImage

let player = new Player()
let platforms = []
let genericObjects = []
let goombas = []
let particles = []

let lastKey
const keys = {
  right: {
    pressed: false
  },
  left: {
    pressed: false
  }
}

let scrollOffset = 0

function isOnTopOfPlatform({ object, platform }) {
  return (
    object.position.y + object.height <= platform.position.y &&
    object.position.y + object.height + object.velocity.y >=
      platform.position.y &&
    object.position.x + object.width >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width
  )
}

function collisionTop({ object1, object2 }) {
  return (
    object1.position.y + object1.height <= object2.position.y &&
    object1.position.y + object1.height + object1.velocity.y >=
      object2.position.y &&
    object1.position.x + object1.width >= object2.position.x &&
    object1.position.x <= object2.position.x + object2.width
  )
}

function isOnTopOfPlatformCircle({ object, platform }) {
  return (
    object.position.y + object.radius <= platform.position.y &&
    object.position.y + object.radius + object.velocity.y >=
      platform.position.y &&
    object.position.x + object.radius >= platform.position.x &&
    object.position.x <= platform.position.x + platform.width
  )
}

async function init() {
  platformImage = await createImageAsync(platform)
  platformSmallTallImage = await createImageAsync(platformSmallTall)

  player = new Player()
  goombas = [
    new Goomba({
      position: {
        x: 800,
        y: 100
      },
      velocity: {
        x: -0.3,
        y: 0
      },
      distance: {
        limit: 200,
        traveled: 0
      }
    }),
    new Goomba({
      position: {
        x: 1400,
        y: 100
      },
      velocity: {
        x: -0.3,
        y: 0
      }
    }),
    new Goomba({
      position: {
        x: 4400,
        y: 100
      },
      velocity: {
        x: -0.3,
        y: 0
      }
    }),
    new Goomba({
      position: {
        x: 4700,
        y: 100
      },
      velocity: {
        x: -0.3,
        y: 0
      }
    }),
    new Goomba({
      position: {
        x: 6400,
        y: 250
      },
      velocity: {
        x: -0.3,
        y: 0
      }
    }),
    new Goomba({
      position: {
        x: 6800,
        y: 250
      },
      velocity: {
        x: -0.3,
        y: 0
      }
    }),
  ]
  particles = []
  //const platform = new Platform()
  platforms = [
    new Platform({
      x:
        platformImage.width * 4 +
        300 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: createImage(platformSmallTall)
    }),
    new Platform({
      x:
        platformImage.width * 7 +
        420 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: createImage(platformSmallTall)
    }),
    new Platform({
      x:
        platformImage.width * 8 +
        120 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 170,
      image: createImage(platformSmallTall)
    }),
    new Platform({
      x:
        platformImage.width * 8 +
        120 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 250,
      image: createImage(platformSmallTall)
    }),
    new Platform({
      x:
        platformImage.width * 10 +
        120 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 250,
      image: createImage(platformSmallTall)
    }),
    /*new Platform({
      x:
        platformImage.width * 7 +
        420 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 270,
      image: createImage(platformSmallTall)
    }),*/
    new Platform({
      x:
        platformImage.width * 8 +
        120 -
        2 +
        platformImage.width -
        platformSmallTallImage.width,
      y: 100,
      image: createImage(platformSmallTall)
    }),
    new Platform({
      x: -1,
      y: 470,
      image: platformImage
    }),
    new Platform({ x: platformImage.width - 3, y: 470, image: platformImage }),
    new Platform({
      x: platformImage.width * 2 + 100,
      y: 470,
      image: platformImage
    }),
    new Platform({
      x: platformImage.width * 3 + 300,
      y: 470,
      image: platformImage
    }),
    new Platform({
      x: platformImage.width * 4 + 300 - 2,
      y: 470,
      image: platformImage
    }),
    new Platform({
      x: platformImage.width * 5 + 700 - 2,
      y: 470,
      image: platformImage
    }),
    new Platform({
      x: platformImage.width * 6 + 700 - 2,
      y: 470,
      image: platformImage
    }),
    new Platform({
      x: platformImage.width * 7 + 700 - 2,
      y: 470,
      image: platformImage
    }),
    new Platform({
      x: platformImage.width * 9 + 500 - 2,
      y: 470,
      image: platformImage
    }),
    new Platform({
      x: platformImage.width * 10 + 500 - 2,
      y: 470,
      image: platformImage
    }),
    new Platform({
      x: platformImage.width * 11 + 500 - 2,
      y: 470,
      image: platformImage
    }),
  ]
  genericObjects = [
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(background)
    }),
    new GenericObject({
      x: -1,
      y: -1,
      image: createImage(hills)
    })
  ]

  scrollOffset = 0
}

function animate() {
  requestAnimationFrame(animate)
  c.fillStyle = 'white'
  c.fillRect(0, 0, canvas.width, canvas.height)

  genericObjects.forEach((genericObject) => {
    genericObject.draw()
  })

  platforms.forEach((platform) => {
    platform.draw()
  })

  goombas.forEach((goomba, index) => {
      //platform.draw()
    goomba.update()

    // goomba stomp
    if (
      collisionTop({
        object1: player,
        object2: goomba
      })
      //console.log('death')
    ) {
      for (let i = 0; i < 50; i++) {
        particles.push(
          new Particle({
            position: {
              x: goomba.position.x + goomba.width / 2,
              y: goomba.position.y + goomba.height / 2
            },
            velocity: {
              x: (Math.random() - 0.5) * 7,
              y: (Math.random() - 0.5) * 15
            },
            radius: Math.random() * 3
          })
        )
      }
      player.velocity.y -= 40
      setTimeout(() => {
        goombas.splice(index, 1)
      }, 0)
    } else if (
      player.position.x + player.width >= goomba.position.x &&
      player.position.y + player.height >= goomba.position.y &&
      player.position.x <= goomba.position.x + goomba.width
    )
      init()
  })

  particles.forEach((particle) => {
    particle.update()
  })
  player.update()

  if (keys.right.pressed && player.position.x < 400) {
    player.velocity.x = player.speed
  } else if (
    (keys.left.pressed && player.position.x > 100) ||
    (keys.left.pressed && scrollOffset === 0 && player.position.x > 0)
  ) {
    player.velocity.x = -player.speed
  } else {
    player.velocity.x = 0

    // scrolling code
    if (keys.right.pressed) {
      scrollOffset += player.speed
      platforms.forEach((platform) => {
        platform.position.x -= player.speed
      })
      genericObjects.forEach((genericObject) => {
        genericObject.position.x -= player.speed * 0.66
      })

      goombas.forEach((goomba) => {
        goomba.position.x -= player.speed
      })

      particles.forEach((particle) => {
        particle.position.x -= player.speed
      })
    } else if (keys.left.pressed && scrollOffset > 0) {
      scrollOffset -= player.speed

      platforms.forEach((platform) => {
        platform.position.x += player.speed
      })

      genericObjects.forEach((genericObject) => {
        genericObject.position.x += player.speed * 0.66
      })

      goombas.forEach((goomba) => {
        goomba.position.x += player.speed
      })

      particles.forEach((particle) => {
        particle.position.x += player.speed
      })
    }
  }

  // platform collision detection
  platforms.forEach((platform) => {
    if (
      isOnTopOfPlatform({
        object: player,
        platform
      })
    ) {
      player.velocity.y = 0
    }

    // particles bounce
    particles.forEach((particle, index) => {
      if (
        isOnTopOfPlatformCircle({
          object: particle,
          platform
        })
      ) {
        particle.velocity.y = -particle.velocity.y * 0.9

        if (particle.radius - 0.4 < 0) particles.splice(index, 1)
        else particle.radius -= 0.4
      }

      if (particle.ttl < 0) particles.splice(index, 1)
    })

    goombas.forEach((goomba) => {
      if (
        isOnTopOfPlatform({
          object: goomba,
          platform
        })
      )
        goomba.velocity.y = 0
    })
  })

  // sprite switching
  if (player.velocity.y === 0) {
    if (
      keys.right.pressed &&
      lastKey === 'right' &&
      player.currentSprite !== player.sprites.run.right
    ) {
      player.frames = 1
      player.currentSprite = player.sprites.run.right
      player.currentCropWidth = player.sprites.run.cropWidth
      player.width = player.sprites.run.width
    } else if (
      keys.left.pressed &&
      lastKey === 'left' &&
      player.currentSprite !== player.sprites.run.left
    ) {
      player.currentSprite = player.sprites.run.left
      player.currentCropWidth = player.sprites.run.cropWidth
      player.width = player.sprites.run.width
    } else if (
      !keys.left.pressed &&
      lastKey === 'left' &&
      player.currentSprite !== player.sprites.stand.left
    ) {
      player.currentSprite = player.sprites.stand.left
      player.currentCropWidth = player.sprites.stand.cropWidth
      player.width = player.sprites.stand.width
    } else if (
      !keys.right.pressed &&
      lastKey === 'right' &&
      player.currentSprite !== player.sprites.stand.right
    ) {
      player.currentSprite = player.sprites.stand.right
      player.currentCropWidth = player.sprites.stand.cropWidth
      player.width = player.sprites.stand.width
    }
  }

  // win condition
  if (platformImage && scrollOffset > platformImage.width * 5 + 300 - 2) {
    console.log('you win')
  }

  // lose condition
  if (player.position.y > canvas.height) {
    init()
  }
}

init()
animate()

addEventListener('keydown', ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed = true
      lastKey = 'left'

      break

    case 83:
      console.log('down')
      break

    case 68:
      console.log('right')
      keys.right.pressed = true
      lastKey = 'right'

      break

    case 87:
      console.log('up')
      player.velocity.y -= 25

      if (lastKey === 'right') player.currentSprite = player.sprites.jump.right
      else player.currentSprite = player.sprites.jump.left

      break
  }
})

addEventListener('keyup', ({ keyCode }) => {
  // console.log(keyCode)
  switch (keyCode) {
    case 65:
      console.log('left')
      keys.left.pressed = false
      break

    case 83:
      console.log('down')
      break

    case 68:
      console.log('right')
      keys.right.pressed = false

      break

    case 87:
      console.log('up')
      break
  }
})