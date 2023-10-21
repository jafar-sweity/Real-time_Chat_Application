  import express from 'express';
  import { User } from '../dataBase/entities/User.js';
  import { UserBlock } from '../dataBase/entities/UserBlock.js';

  export const BlockUser = async (req: express.Request, res: express.Response) => {
    try {
      const  blocked  = req.body.blocked;
      const Blocker = req.cookies['Username'];

      if (!Blocker) {
        console.log({ message: 'You must re-login!' });
        res.status(401).send({ message: 'Please log in to block users.' });
        return;
      }

      const Blocked = await User.findOne({ where: { Username: blocked } });

      if (!Blocked) {
        console.log({ message: 'User not found:', blocked });
        res.status(404).send({ message: 'User not found' });
        return;
      }

      // Check if the user is already blocked
      const existingBlock = await UserBlock.findOne({
        where: { Blocked: blocked, Blocker: Blocker },
      });

      if (existingBlock) {
        console.log({ message: 'User is already blocked' });
        res.status(400).send({ message: 'User is already blocked' });
        return;
      }

      const userBlock = new UserBlock();
      userBlock.Blocked = Blocked;
      userBlock.Blocker = Blocker;

      
      await UserBlock.save(userBlock);

      res.status(200).send({ message: 'User blocked successfully' });
    } catch (error:any) {
      console.error('Error in BlockUser:', error.message);
      res.status(500).send({ message: 'An error occurred while blocking the user.' });
    }
  };
  

