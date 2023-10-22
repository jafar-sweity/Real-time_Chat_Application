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

    // Validate the 'blocked' property
    if (!blocked || typeof blocked !== 'string') {
      res.status(400).send({ message: 'Invalid blocked user information' });
      return;
    }

    const blockedUser = await User.findOne({ where: { Username: blocked } });
    const blockerUser = await User.findOne({ where: { Username: BlockerUsername } });

    if (!blockedUser || !blockerUser) {
      res.status(404).send({ message: 'User not found' });
      return;
    }

    const existingBlock = await UserBlock.findOne({
      where: { Blocked: { UserId: blockedUser.UserId }, Blocker: { UserId: blockerUser.UserId } },
    });

    if (existingBlock) {
      res.status(400).send({ message: 'User is already blocked' });
      return;
    }

    const userBlock = new UserBlock();
    userBlock.Blocked = blockedUser; // Assign directly instead of using push()
    userBlock.Blocker = blockerUser;

    await userBlock.save();

    res.status(200).send({ message: 'User blocked successfully' });
  } catch (error) {
    console.error(error); // Log the error details for debugging
    res.status(500).send({ message: 'An error occurred while blocking the user.' });
  }
};

// Unblock a user
export const UnblockUser = async (req: express.Request, res: express.Response) => {
  try {
    const { unblocked } = req.body.unblocked;
    const BlockerUsername = req.cookies['Username'];

    if (!BlockerUsername) {
      return res.status(401).json({ message: 'Please log in to unblock users.' });
    }

    const Unblocked = await User.findOne({ where: { Username: unblocked } });
    const Blocker = await User.findOne({ where: { Username: BlockerUsername } });

    if (!Unblocked || !Blocker) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Updated query to check for both Blocker and Blocked users
    const existingBlock = await UserBlock.findOne({
      where: {
        Blocker: { UserId: Blocker.UserId },
        Blocked: { UserId: Unblocked.UserId }
      }
    });
    
    if (!existingBlock) {
      return res.status(400).json({ message: 'User is not blocked' });
    }
    await UserBlock.delete(
      { Blocked: { UserId: Unblocked.UserId }, Blocker: { UserId: Blocker.UserId } },
    );

    return res.status(200).json({ message: 'User unblocked successfully' });
  } catch (error) {
    console.error('Error in UnblockUser:', error);
    return res.status(500).json({ message: 'An error occurred while unblocking the user.' });
  }
};
