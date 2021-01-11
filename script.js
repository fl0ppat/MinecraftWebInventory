import MinecraftWebInventory from "./MinecraftWebInventory.js";

const config = {
  path: "/items",
};

const minecraftItems = {
  name: "Classic",
  version: "1.7.10",
  itemsList: [
    {
      itemName: "sword", // Technical item name in game
      displayName: "Каменный меч", // Show name in tooltip
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "stone",
      displayName: "Камень",
      count: 42, // Amount of items in cell
    },
    {
      itemName: "leggins",
      displayName: "Штанишки",
      enchants: {
        Защита: 1,
        Прочность: 2,
      },
    },
  ],
};

const inv = new MinecraftWebInventory(minecraftItems, config);
inv.createTable(document.querySelector(".table"));
