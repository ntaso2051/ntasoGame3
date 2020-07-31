const GameObject = require("./GameObject.js");

const SharedSettings = require("../public/js/SharedSettings.js");

module.exports = class Item extends GameObject {
  constructor(fX, fY) {
    super(SharedSettings.ITEM_WIDTH, SharedSettings.ITEM_HEIGHT, fX, fY, 0);
  }
};
