import MinecraftWebInventory from "../src/MinecraftWebInventory.js";
import { minecraftItems_1, minecraftItems_2, minecraftItems_3 } from "./minecraftItems.js";

const config = {
  path: "/items_re",
};

const case2_input = document.querySelector(".case-2__input");

const inventory_1 = new MinecraftWebInventory(minecraftItems_1, config);
inventory_1.createTable(document.querySelector("#case-1"));

const inventory_2 = new MinecraftWebInventory(minecraftItems_2, config);
inventory_2.createTable(document.querySelector("#case-2"));

function rangeInputChangeSize() {
  inventory_2.changeSize(this.parentNode.querySelector(".MinecraftWebInventory"), this.value);
}

case2_input.oninput = rangeInputChangeSize;
