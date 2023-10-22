import express from 'express';
import { User } from '../dataBase/entities/User.js';
import { UserMute } from '../dataBase/entities/UserMute.js';

export const mute = async (req: express.Request, res: express.Response) => {
  const username = req.cookies['Username'];
  if (!username) {
    res.status(401).send({ message: "you must login!" });
    return;
  }

  const muteUsername = req.body.mute;
  if (!muteUsername) {
    res.status(400).send({ message: "you must enter the username!" });
    return;
  }

  const isExistMuter = await User.findOne({ where: { Username: username } });
  if (!isExistMuter) {
    res.status(404).send({ message: "the user is not exist!" });
    return;
  }

  const isExistMuted = await User.findOne({ where: { Username: muteUsername } });
  if (!isExistMuted) {
    res.status(404).send({ message: "the user is not exist!" });
    return;
  }

  const isMuted = await UserMute.findOne({
    where: {
      MutedId: { UserId: isExistMuted.UserId },
      MuterId: { UserId: isExistMuter.UserId }
    }
  });

  if (isMuted) {
    res.status(409).send({ message: "the user is already muted!" });
    return;
  }

  const muteUser = new UserMute();
  muteUser.MutedId = isExistMuted;
  muteUser.MuterId = isExistMuter;
  await muteUser.save();
  res.status(200).send({ message: "User muted successfully" });
};


export const unmute = async (req: express.Request, res: express.Response) => {
  const username = req.cookies['Username'];
  if (!username) {
    res.status(401).send({ message: "you must login!" });
    return;
  }

  const unmuteUsername = req.body.unmute;
  if (!unmuteUsername) {
    res.status(400).send({ message: "you must enter the username!" });
    return;
  }

  const isExistMuter = await User.findOne({ where: { Username: username } });
  if (!isExistMuter) {
    res.status(404).send({ message: "the user is not exist!" });
    return;
  }

  const isExistMuted = await User.findOne({ where: { Username: unmuteUsername } });
  if (!isExistMuted) {
    res.status(404).send({ message: "the user is not exist!" });
    return;
  }

  const isMuted = await UserMute.findOne({
    where: {
      MutedId: { UserId: isExistMuted.UserId },
      MuterId: { UserId: isExistMuter.UserId }
    }
  });

  if (!isMuted) {
    res.status(404).send({ message: "the user is not muted!" });
    return;
  }

  await UserMute.delete({
    MutedId: { UserId: isExistMuted.UserId },
    MuterId: { UserId: isExistMuter.UserId }
  });

  res.status(200).send({ message: "User unmuted successfully" });
};
