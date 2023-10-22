import express from 'express';
import { User } from '../dataBase/entities/User.js';
import { UserBlock } from '../dataBase/entities/UserBlock.js';

export const blockUser = async (req: express.Request, res: express.Response) => {
  const username = req.cookies['Username'];
  if (!username) {
    res.status(401).send({ message: "You must log in!" });
    return;
  }

  const blockedUsername = req.body.blocked;
  if (!blockedUsername) {
    res.status(400).send({ message: "You must enter the username!" });
    return;
  }

  const blocker = await User.findOne({ where: { Username: username } });
  if (!blocker) {
    res.status(404).send({ message: "The user is not found!" });
    return;
  }

  const blocked = await User.findOne({ where: { Username: blockedUsername } });
  if (!blocked) {
    res.status(404).send({ message: "The user is not found!" });
    return;
  }

  const existingBlock = await UserBlock.findOne({
    where: {
      Blocker: { UserId: blocker.UserId},
      Blocked: { UserId: blocked.UserId},
    },
  });

  if (existingBlock) {
    res.status(409).send({ message: "The user is already blocked!" });
    return;
  }

  const userBlock = new UserBlock();
  userBlock.Blocker = blocker;
  userBlock.Blocked = blocked;

  await userBlock.save();
  res.status(200).send({ message: "User blocked successfully" });
};

export const unblockUser = async (req: express.Request, res: express.Response) => {
  const username = req.cookies['Username'];
  if (!username) {
    res.status(401).send({ message: "You must log in!" });
    return;
  }

  const unblockedUsername = req.body.unblocked;
  if (!unblockedUsername) {
    res.status(400).send({ message: "You must enter the username!" });
    return;
  }

  const unblocker = await User.findOne({ where: { Username: username } });
  if (!unblocker) {
    res.status(404).send({ message: "The user is not found!" });
    return;
  }

  const unblocked = await User.findOne({ where: { Username: unblockedUsername } });
  if (!unblocked) {
    res.status(404).send({ message: "The user is not found!" });
    return;
  }

  const existingBlock = await UserBlock.findOne({
    where: {
      Blocker:{ UserId: unblocker.UserId },
      Blocked: { UserId: unblocked.UserId},
    },
  });

  if (!existingBlock) {
    res.status(404).send({ message: "The user is not blocked!" });
    return;
  }

  await UserBlock.remove(existingBlock);
  res.status(200).send({ message: "User unblocked successfully" });
};
