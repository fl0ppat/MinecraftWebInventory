/**
 *
 *
 * @export
 * @class MinecraftWebInventory
 */
export default class MinecraftWebInventory {
  /**
   * Creates an instance of MinecraftWebInventory.
   * @param {Array} size Array.length = 2. Array[0] = cols, array[1] = rows
   * @param {Object} items Items, blocks, etc. in inventory. Example in script.js
   * @param {Object} config Items, blocks, etc. in inventory
   * @memberof MinecraftWebInventory
   */
  constructor(items, config) {
    this._items = items;
    this._config = config;
    this._tooltip;
    this._tooltipContent;
    this._ifShift = false;
    this._size = 0;
  }

  /**
   * Draw Inventory
   *
   * @param {Object} elem Where inventory was rendered
   * @memberof MinecraftWebInventory
   */
  createTable(elem) {
    if (elem.dataset.size) {
      this._size = parseInt(elem.dataset.size);
    } else {
      this._size = 9;
    }

    elem.appendChild(this._parseItems());

    this._tooltip = document.createElement("div");
    this._tooltip.classList.add("MinecraftWebInventory__tooltip");

    this._tooltipContent = document.createElement("div");
    this._tooltipContent.classList.add("MinecraftWebInventory__tooltipWrapper");
    this._tooltip.appendChild(this._tooltipContent);

    elem.insertAdjacentElement("beforebegin", this._tooltip);
    document.addEventListener("keydown", (e) => {
      if (this._ifShift) {
        return;
      }
      this._showShiftData(e);
    });
    document.addEventListener("keyup", (e) => {
      this._hideShiftData(e);
    });

    elem.querySelector(".MinecraftWebInventory").style.gridTemplateColumns = `repeat(${this._size}, 32px)`;
  }

  _setEventListners(cell) {
    cell.addEventListener("mouseenter", (e) => {
      this._showTooltip(e);
    });
    cell.addEventListener("mouseleave", (e) => {
      this._hideTooltip(e);
    });
    cell.addEventListener("mousemove", (e) => {
      this._tooltipFollowCursor(e);
    });
  }

  _prepareDataForTooltip(e) {
    const item = this._items.itemsList[e.target.dataset.id];
    this._addLineToTooltp(item.displayName);
    if (item.description) {
      item.description.forEach((line) => {
        this._addLineToTooltp(line);
      });
    }

    if (item.shift) {
      item.shift.forEach((line) => {
        this._addLineToTooltp(line, "shift");
      });
      this._addLineToTooltp("Зажмите SHIFT для большей информации.", "reverse");
    }
    if (item.mod) {
      this._addLineToTooltp(item.mod);
    } else {
      this._addLineToTooltp("&9Minecraft");
    }
  }

  _addLineToTooltp(line, shift) {
    const elem = document.createElement("p");
    elem.textContent = line.slice(2);
    if (shift === "shift") {
      elem.classList.add(`MinecraftWebInventory__tooltipContent_shift`);
    } else if (shift === "reverse") {
      elem.classList.add(`MinecraftWebInventory__tooltipContent_reverse-shift`);
    } else {
      elem.classList.add(`MinecraftWebInventory__tooltipContent`);
    }
    if (line[0] === "&") {
      elem.classList.add("tooltip_color_" + line[1]);
      elem.textContent = line.slice(2);
    } else {
      elem.classList.add("tooltip_color_" + 7);
      elem.textContent = line;
    }

    this._tooltipContent.append(elem);
  }

  _showTooltip(e) {
    this._prepareDataForTooltip(e);
    this._tooltip.style.visibility = "visible";
    this._tooltip.style.left = `${e.x + 10}px`;
  }

  _hideTooltip() {
    this._tooltip.style.visibility = "hidden";
    while (this._tooltipContent.firstChild) {
      this._tooltipContent.removeChild(this._tooltipContent.firstChild);
    }
  }

  _tooltipFollowCursor(e) {
    this._tooltip.style.left = `${e.pageX + 10}px`;
    this._tooltip.style.top = `${e.pageY + 10}px`;
  }

  _showShiftData(e) {
    if (e.key === "Shift") {
      this._ifShift = true;
      const shift = this._tooltipContent.querySelectorAll(".MinecraftWebInventory__tooltipContent_shift");
      if (shift.length > 0) {
        shift.forEach((elem) => {
          elem.style.display = "block";
        });
      }
      const reverse = this._tooltipContent.querySelector(".MinecraftWebInventory__tooltipContent_reverse-shift");
      if (reverse) reverse.style.display = "none";
    }
  }

  _hideShiftData(e) {
    if (e.key === "Shift") {
      this._ifShift = false;
      const shift = this._tooltipContent.querySelectorAll(".MinecraftWebInventory__tooltipContent_shift");
      if (shift.length > 0) {
        shift.forEach((elem) => {
          elem.style.display = "none";
        });
      }
      const reverse = this._tooltipContent.querySelector(".MinecraftWebInventory__tooltipContent_reverse-shift");
      if (reverse) reverse.style.display = "block";
    }
  }

  _createCell(item, index, empty) {
    const cell = document.createElement("li");

    if (empty) {
      cell.classList.add("MinecraftWebInventory_empty");
      return cell;
    }

    if (item.glow) {
      const glow = document.createElement("div");
      glow.classList.add("MinecraftWebInventory__glow");
      glow.style.maskImage = `url(${this._config.path}/${item.itemName}.png)`;
      glow.style.webkitMaskBoxImage = `url(${this._config.path}/${item.itemName}.png)`;
      cell.append(glow);
    }
    const image = document.createElement("img");
    cell.dataset.id = index;
    image.src = `${this._config.path}/${item.itemName}.png`;
    image.alt = item.displayName;

    if (item.count) {
      const count = document.createElement("span");
      count.textContent = item.count;
      cell.append(count);
    }

    cell.append(image);
    this._setEventListners(cell);
    return cell;
  }

  _parseItems() {
    const inventory = document.createElement("ul");
    inventory.classList.add("MinecraftWebInventory");
    this._items.itemsList.map((item, index) => inventory.appendChild(this._createCell(item, index)));

    this._addEmptyCells(inventory);

    return inventory;
  }

  _addEmptyCells(elem) {
    const listLength = this._items.itemsList.length;
    const rows = Math.ceil(listLength / this._size);
    const needToAddCells = rows * this._size - listLength;

    if (needToAddCells > 0) {
      for (let index = 0; index < needToAddCells; index++) {
        elem.appendChild(this._createCell(0, 0, true));
      }
    }
  }

  _clearEmptyCells(elem) {
    const arrOfEmptyCells = elem.querySelectorAll(".MinecraftWebInventory_empty");
    arrOfEmptyCells.forEach((cell) => {
      cell.remove();
    });
  }

  changeSize(elem, size) {
    console.log(elem);
    this._size = size;
    this._clearEmptyCells(elem);
    this._addEmptyCells(elem);
    elem.style.gridTemplateColumns = `repeat(${size}, 32px)`;
  }

  debugLog() {
    console.log(`DEBUG:
    Inventory Size: ${this._size[0]}/${this._size[1]}`);
    console.table([this._items]);
  }
}
