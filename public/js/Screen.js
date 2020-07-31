class Screen {
  constructor(socket, canvas) {
    this.socket = socket;
    this.canvas = canvas;
    this.context = canvas.getContext("2d");

    this.assets = new Assets();
    this.iProcessingTimeNanoSec = 0;
    this.aPlayer = null;
    this.anItem = null;

    this.canvas.width = SharedSettings.FIELD_WIDTH;
    this.canvas.height = SharedSettings.FIELD_HEIGHT;

    this.initSocket();

    this.context.mozImageSmoothingEnabled = false;
    this.context.webkitImageSmoothingEnabled = false;
    this.context.msImageSmoothingEnabled = false;
    this.context.imageSmoothingEnabled = false;
  }

  initSocket() {
    this.socket.on("connect", () => {
      console.log("connect : socket.id = %s", socket.id);
      this.socket.emit("enter-the-game");
    });

    this.socket.on("update", (aPlayer, anItem, iProcessingTimeNanoSec) => {
      this.aPlayer = aPlayer;
      this.anItem = anItem;
      this.iProcessingTimeNanoSec = iProcessingTimeNanoSec;
    });
  }

  animate(iTimeCurrent) {
    requestAnimationFrame((iTimeCurrent) => {
      this.animate(iTimeCurrent);
    });
    this.render(iTimeCurrent);
  }

  render(iTimeCurrent) {
    console.log("render !!");

    this.context.clearRect(0, 0, canvas.width, canvas.height);

    this.renderField();

    if (null != this.aPlayer) {
      const fTimeCurrentSec = iTimeCurrent * 0.001;
      const iIndexFrame = parseInt(fTimeCurrentSec / 0.2) % 4;
      this.aPlayer.forEach((player) => {
        this.renderPlayer(player, iIndexFrame);
      });
    }

    if (null != this.anItem) {
      this.anItem.forEach((item) => {
        this.renderItem(item);
      });
    }

    this.context.save();
    this.context.strokeStyle = RenderingSettings.FIELD_LINECOLOR;
    this.context.lineWidth = RenderingSettings.FIELD_LINEWIDTH;
    this.context.strokeRect(0, 0, canvas.width, canvas.height);
    this.context.restore();

    this.context.save();
    this.context.font = RenderingSettings.PROCESSINGTIME_FONT;
    this.context.fillStyle = RenderingSettings.PROCESSINGTIME_COLOR;
    this.context.fillText(
      (this.iProcessingTimeNanoSec * 1e-9).toFixed(9) + " [s]",
      this.canvas.width - 30 * 10,
      40
    );
    this.context.restore();
  }

  renderField() {
    this.context.save();

    let iCountX = parseInt(
      SharedSettings.FIELD_WIDTH / RenderingSettings.FIELDTILE_WIDTH
    );
    let iCountY = parseInt(
      SharedSettings.FIELD_HEIGHT / RenderingSettings.FIELDTILE_HEIGHT
    );
    for (let iIndexY = 0; iIndexY < iCountY; iIndexY++) {
      for (let iIndexX = 0; iIndexX < iCountX; iIndexX++) {
        this.context.drawImage(
          this.assets.imageField,
          this.assets.rectFieldInFieldImage.sx,
          this.assets.rectFieldInFieldImage.sy,
          this.assets.rectFieldInFieldImage.sw,
          this.assets.rectFieldInFieldImage.sh,
          iIndexX * RenderingSettings.FIELDTILE_WIDTH,
          iIndexY * RenderingSettings.FIELDTILE_HEIGHT,
          RenderingSettings.FIELDTILE_WIDTH,
          RenderingSettings.FIELDTILE_HEIGHT
        );
      }
    }
    this.context.restore();
  }
  renderPlayer(player, iIndexFrame) {
    this.context.save();
    this.context.translate(player.fX, player.fY);
    this.context.save();
    this.context.drawImage(
      this.assets.imageItems,
      this.assets.arectPlayerInItemsImage[iIndexFrame].sx,
      this.assets.arectPlayerInItemsImage[iIndexFrame].sy,
      this.assets.arectPlayerInItemsImage[iIndexFrame].sw,
      this.assets.arectPlayerInItemsImage[iIndexFrame].sh,
      -SharedSettings.PLAYER_WIDTH * 0.5,
      -SharedSettings.PLAYER_HEIGHT * 0.5,
      SharedSettings.PLAYER_WIDTH,
      SharedSettings.PLAYER_HEIGHT
    );
    this.context.restore();

    this.context.restore();
  }
  renderItem(item) {
    this.context.drawImage(
      this.assets.imageItem,
      this.assets.arectItemInItemsImage[0].sx,
      this.assets.arectItemInItemsImage[0].sy,
      this.assets.arectItemInItemsImage[0].sw,
      this.assets.arectItemInItemsImage[0].sh,
      item.fX - SharedSettings.ITEM_WIDTH * 0.5,
      item.fY - SharedSettings.ITEM_HEIGHT * 0.5,
      SharedSettings.ITEM_WIDTH,
      SharedSettings.ITEM_WIDTH
    );
  }
}
