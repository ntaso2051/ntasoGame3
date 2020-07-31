// モジュール
const GameObject = require("./GameObject.js");

const OverlapTester = require("./OverlapTester.js");

// 設定
const SharedSettings = require("../public/js/SharedSettings.js");
const GameSettings = require("./GameSettings.js");

module.exports = class Player extends GameObject {
  constructor(rectField, setItem) {
    super(
      SharedSettings.PLAYER_WIDTH,
      SharedSettings.PLAYER_HEIGHT,
      0.0,
      0.0,
      Math.random() * 2 * Math.PI
    );

    this.objMovement = {};
    this.fSpeed = GameSettings.PLAYER_SPEED;
    this.fRotationSpeed = GameSettings.PLAYER_ROTATION_SPEED;

    do {
      this.setPos(
        rectField.fLeft + Math.random() * (rectField.fRight - rectField.fLeft),
        rectField.fBottom + Math.random() * (rectField.fTop - rectField.fBottom)
      );
    } while (this.overlapItems(setItem));
  }

  update(fDeltaTime, rectField, setItem) {
    const fX_old = this.fX;
    const fY_old = this.fY;
    let bDrived = false;

    if (this.objMovement["forward"]) {
      const fDistance = this.fSpeed * fDeltaTime;
      this.setPos(this.fX, this.fY + fDistance);
      bDrived = true;
    }
    if (this.objMovement["back"]) {
      const fDistance = this.fSpeed * fDeltaTime;
      this.setPos(this.fX, this.fY - fDistance);
      bDrived = true;
    }

    if (this.objMovement["left"]) {
      const fDistance = this.fSpeed * fDeltaTime;
      this.setPos(this.fX - fDistance, this.fY);
      bDrived = true;
    }
    if (this.objMovement["right"]) {
      const fDistance = this.fSpeed * fDeltaTime;
      this.setPos(this.fX + fDistance, this.fY);
      bDrived = true;
    }
    if (bDrived) {
      let bCollision = false;
      if (!OverlapTester.pointInRect(rectField, { fX: this.fX, fY: this.fY })) {
        bCollision = true;
      } else if (this.overlapItems(setItem)) {
        bCollision = true;
      }
      if (bCollision) {
        this.setPos(fX_old, fY_old);
        bDrived = false;
      }
    }

    return bDrived;
  }
};
