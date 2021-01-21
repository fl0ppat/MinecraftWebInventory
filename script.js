import MinecraftWebInventory from "./MinecraftWebInventory.js";
import minecraftItems from "./minecraftItems.js";

const config = {
  path: "/items_re",
};

const inv = new MinecraftWebInventory(minecraftItems, config);
inv.createTable(document.querySelector(".table"));
