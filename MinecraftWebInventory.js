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
  constructor(size, items, config) {
    this._size = size;
    this._items = items;
    this._config = config;
  }

  /**
   * Draw Inventory
   *
   * @param {Object} elem Where inventory was rendered
   * @memberof MinecraftWebInventory
   */
  createTable(elem) {
    elem.appendChild(this._parseItems());
    elem.querySelector(".MinecraftWebInventory").style.gridTemplateColumns = `repeat(${elem.dataset.size}, 32px)`;
  }

  _setEventListners(cell) {
    cell.addEventListener("mouseover", console.log("MouseOver"));
  }

  _showTooltip() {}

  _createCell(item) {
    console.log(item);
    const cell = document.createElement("li");
    const image = document.createElement("img");

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
    this._items.itemsList.map((item) => inventory.appendChild(this._createCell(item)));
    return inventory;
  }

  changeSize(elem, cells) {
    elem.querySelector(".MinecraftWebInventory").style.gridTemplateColumns = `repeat(${cells}, 32px)`;
  }

  debugLog() {
    console.log(`DEBUG:
    Inventory Size: ${this._size[0]}/${this._size[1]}`);
    console.table([this._items]);
  }
}
