
const Item = require("./Item.js");
const Player = require("./Player.js");
const GameSettings = require("./GameSettings.js");
const SharedSettings = require("../public/js/SharedSettings.js");
module.exports = class World {
  constructor(io) {
    this.io = io; 
    this.setPlayer = new Set();
    this.setItem = new Set();

    for (let i = 0; i < GameSettings.ITEM_COUNT; i++) {
      const fX_left =
        Math.random() *
        (SharedSettings.FIELD_WIDTH - SharedSettings.ITEM_WIDTH);
      const fY_bottom =
        Math.random() *
        (SharedSettings.FIELD_HEIGHT - SharedSettings.ITEM_HEIGHT);
      const item = new Item(
        fX_left + SharedSettings.ITEM_WIDTH * 0.5,
        fY_bottom + SharedSettings.ITEM_HEIGHT * 0.5
      );
      this.setItem.add(item);
    }
  }

  // 更新処理
  update(fDeltaTime) {
    // オブジェクトの座標値の更新
    this.updateObjects(fDeltaTime);

    // 衝突チェック
    this.checkCollisions();

    // 新たな行動（特に、ボットに関する生成や動作
    this.doNewActions(fDeltaTime);
  }

  // オブジェクトの座標値の更新
  updateObjects(fDeltaTime) {
    const rectItemField = {
      fLeft: 0 + SharedSettings.ITEM_WIDTH * 0.5,
      fBottom: 0 + SharedSettings.ITEM_HEIGHT * 0.5,
      fRight: 0 + SharedSettings.FIELD_WIDTH - SharedSettings.ITEM_WIDTH * 0.5,
      fTop: 0 + SharedSettings.FIELD_HEIGHT - SharedSettings.ITEM_HEIGHT * 0.5,
    };
    this.setPlayer.forEach((player) => {
      player.update(fDeltaTime, rectItemField, this.setItem);
    });
  }

  checkCollisions() {}

  doNewActions(fDeltaTime) {}

  createPlayer() {
    const rectPlayerField = {
      fLeft: 0 + SharedSettings.PLAYER_WIDTH * 0.5,
      fBottom: 0 + SharedSettings.PLAYER_HEIGHT * 0.5,
      fRight:
        0 + SharedSettings.FIELD_WIDTH - SharedSettings.PLAYER_WIDTH * 0.5,
      fTop:
        0 + SharedSettings.FIELD_HEIGHT - SharedSettings.PLAYER_HEIGHT * 0.5,
    };

    const player = new Player(rectPlayerField, this.setItem);
    this.setPlayer.add(player);
    return player;
  }

  destroyPlayer(player) {
    this.setPlayer.delete(player);
  }
};
