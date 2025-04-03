
import { Request, Response } from 'express';
import prisma from '../prisma';
import {hashSync} from 'bcrypt';
import { compareSync } from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET= process.env.JWT_SECRET!

export const createUser  = async (req: Request, res: Response) => {
  const { email, password } = req.body;
      let success=false;

  let user = await prisma.user.findFirst({
    where: { email }
  })
  if(user) {
    throw Error("user already exist")
    }
  user=await prisma.user.create({
    data:{
        email,
        password:hashSync(password,10)
    }
  })
    const token=jwt.sign({
    userId:user.id
  },JWT_SECRET)
  success=true;
  res.json({success,token});
  res.send({user,token})

}

export const loginUser  = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    let success=false;

      
      let user = await prisma.user.findUnique({
        where: { email }
      });
  
      
      if (!user) {
        throw Error("User does not exists")
      }
  
      
      
      
      if (!compareSync(password, user.password)) {
        throw Error("Invalid email or password")
      }
  
      const token=jwt.sign({
        userId:user.id
      },JWT_SECRET)
      success=true;
      res.json({success,token});
      res.send({user,token})
  };
