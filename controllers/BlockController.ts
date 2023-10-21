import express from 'express';
import { User } from '../dataBase/entities/User.js';
import { UserBlock } from '../dataBase/entities/UserBlock.js';


export const BlockUser = async (req: express.Request, res: express.Response) => {
  try {
    const { blocked } = req.body;
    const BlockerUsername = req.cookies['Username'];

    if (!BlockerUsername) {
      res.status(401).send({ message: 'Please log in to block users.' });
      return;
    }

  
    const Blocked = await User.findOne({ where: { Username: blocked } });
    const Blocker = await User.findOne({ where: { Username: BlockerUsername } });

    if (!Blocked || !Blocker) {
      res.status(404).send({ message: 'User not found' });
      return;
    }
     const existingBlock = await UserBlock.findOne({
      where: { Blocked: Blocked, Blocker: Blocker },
    });

    if (existingBlock) {
      res.status(400).send({ message: 'User is already blocked' });
      return;
    }



    const userBlock = new UserBlock();
    userBlock.Blocked = Blocked;
    userBlock.Blocker = Blocker;

    await userBlock.save();

    res.status(200).send({ message: 'User blocked successfully' });
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while blocking the user.' });
  }
};



export const UnblockUser = async (req: express.Request, res: express.Response) => {
  try {
    const { unblocked } = req.body;
    const BlockerUsername = req.cookies['Username'];

    if (!BlockerUsername) {
      res.status(401).send({ message: 'Please log in to unblock users.' });
      return;
    }

    const Unblocked = await User.findOne({ where: { Username: unblocked } });
    const Blocker = await User.findOne({ where: { Username: BlockerUsername } });

    if (!Unblocked || !Blocker) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    // Find the UserBlock entity to delete
    const existingBlock = await UserBlock.findOne({
      where: { Blocked: Unblocked, Blocker: Blocker },
    });

    if (!existingBlock) {
      res.status(404).send({ message: 'User is not blocked' });
      return;
    }


    await UserBlock.remove(existingBlock);

    res.status(200).send({ message: 'User unblocked successfully' });
  
  } catch (error) {
    res.status(500).send({ message: 'An error occurred while unblocking the user.' });
  }
};