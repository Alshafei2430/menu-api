/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as itemService from "./items.services";
import { BaseItem, Item } from "./item.interface";
import { Items } from "./items.interface";

/**
 * Router Definition
 */
export const itemsRouter = express.Router();
/**
 * Controller Definitions
 */

// GET items

itemsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: Item[] = await itemService.findAll();
    res.status(200).send(items);
  } catch (e) {
    res.sendStatus(500);
  }
});

// GET items/:id

itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const item: Item = await itemService.find(id);

    if (item) {
      return res.status(200).send(item);
    }

    res.sendStatus(404);
  } catch (e) {
    res.sendStatus(500);
  }
});

// POST items

itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: BaseItem = req.body;

    const newItem = await itemService.create(item);

    res.status(201).json(newItem);
  } catch (e) {
    res.sendStatus(500);
  }
});

// PUT items/:id

itemsRouter.put("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  try {
    const itemUpdate: Item = req.body;
    const existingItem = await itemService.find(id);

    if (existingItem) {
      const updatedItem = await itemService.update(id, itemUpdate);
      return res.status(200).json(updatedItem);
    }

    const newItem = await itemService.create(itemUpdate);
    res.status(201).json(newItem);
  } catch (e) {
    res.sendStatus(500);
  }
});

// DELETE items/:id
itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await itemService.remove(id);
    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
  }
});
