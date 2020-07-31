class SharedSettings {
  static get FIELD_WIDTH() {
    return 1024.0;
  }
  static get FIELD_HEIGHT() {
    return 1024.0;
  }

  static get PLAYER_WIDTH() {
    return 80.0;
  }
  static get PLAYER_HEIGHT() {
    return 80.0;
  }

  static ITEM_WIDTH() {
    return 50.0;
  }
  static ITEM_HEIGHT() {
    return 50.0;
  }
}

if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = SharedSettings;
}
