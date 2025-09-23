import { MailOptions } from 'nodemailer/lib/sendmail-transport';
import type { NextFunction, Request, Response } from "express";
import { UserRepository } from '../../DB';
import { BadRequestException, ConflictException, NotFoundException } from "../../utils";
import { IRegisterDTO, VerifyAccountDTO } from "./auth.dto";
import { AuthFactoryService } from './factory/index';
import { authProvider } from "./provider/auth.provider";


class AuthService {

  private userRepository = new UserRepository();
  private AuthFactoryService = new AuthFactoryService();

  constructor() {}

  register = async (req: Request, res: Response, next: NextFunction) => {
    const registerDTO: IRegisterDTO = req.body;
    
    const userExist = await this.userRepository.exist({ email: registerDTO.email })
    if(userExist) {
      throw new ConflictException("User already exists with this email");
    }
    const user = this.AuthFactoryService.register(registerDTO);
    const createdUser = await this.userRepository.create(user);

    return res.status(201).json({
      message: "User created successfully",
      success: true,
      user: { id: createdUser.id }
    });
  };

  verifyAccount = async  (req: Request, res: Response, next: NextFunction) => {
    const verifyAccountDTO: VerifyAccountDTO = req.body;
    await authProvider.checkOTP(verifyAccountDTO);
    await this.userRepository.update(
      { email: verifyAccountDTO.email },
      { isVerified: true, $unset: { otp: "", otpExpiredAt: "" } }
    );
    return res.sendStatus(204);
  };
  
}

export default new AuthService();
