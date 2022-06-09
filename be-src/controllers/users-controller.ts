import { User } from "../models";
import * as fs from "fs";

export async function createUser(userName, userBio, userPic) {
  var stats = fs.statSync(userPic);
  if (stats["size"] > 60) {
    throw "el tamaño de tu imagen es demasiado grande, el limite es de 60mb";
  }

  if (!userName) {
    throw "userName es necesario";
  }

  const user = await User.findOne({
    where: {
      name: userName,
    },
  });

  if (user) {
    throw "error, user exists already";
  } else {
    const userCreated = await User.create({
      userName,
      userBio,
      userPic,
    });
    return user;
  }
}

export async function getUser(userName: string) {
  const user = await User.findOne({ where: { name: userName } });
  return user;
}
