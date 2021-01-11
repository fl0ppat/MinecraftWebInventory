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
  }

  /**
   * Draw Inventory
   *
   * @param {Object} elem Where inventory was rendered
   * @memberof MinecraftWebInventory
   */
  createTable(elem) {
    elem.appendChild(this._parseItems());

    this._tooltip = document.createElement("div");
    this._tooltip.classList.add("MinecraftWebInventory__tooltip");

    this._tooltipContent = document.createElement("span");
    this._tooltipContent.classList.add("MinecraftWebInventory__tooltipContent");
    this._tooltip.appendChild(this._tooltipContent);

    elem.insertAdjacentElement("beforebegin", this._tooltip);

    elem.querySelector(".MinecraftWebInventory").style.gridTemplateColumns = `repeat(${elem.dataset.size}, 32px)`;
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

  _showTooltip(e) {
    this._tooltip.style.visibility = "visible";
    this._tooltip.style.left = `${e.x + 10}px`;
    this._tooltipContent.textContent = e.target.dataset.name;
  }

  _hideTooltip() {
    this._tooltip.style.visibility = "hidden";
  }

  _tooltipFollowCursor(e) {
    this._tooltip.style.left = `${e.x + 10}px`;
    this._tooltip.style.top = `${e.y + 10}px`;
  }

  _createCell(item) {
    //console.log(item);
    const cell = document.createElement("li");
    cell.dataset.name = item.displayName;
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
