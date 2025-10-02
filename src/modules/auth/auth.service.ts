import type { NextFunction, Request, Response } from "express";
import { UserRepository } from '../../DB';
import { compareHash, ConflictException, ForbiddenException } from "../../utils";
import { IRegisterDTO, LoginDTO, VerifyAccountDTO } from "./auth.dto";
import { AuthFactoryService } from './factory/index';
import { authProvider } from "./provider/auth.provider";
import { generateToken } from "../../utils/token";


class AuthService {

  private userRepository = new UserRepository();
  private AuthFactoryService = new AuthFactoryService();

  constructor() {}

  register = async (req: Request, res: Response) => {
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

  verifyAccount = async  (req: Request, res: Response) => {
    const verifyAccountDTO: VerifyAccountDTO = req.body;
    await authProvider.checkOTP(verifyAccountDTO);
    await this.userRepository.update(
      { email: verifyAccountDTO.email },
      { isVerified: true, $unset: { otp: "", otpExpiredAt: "" } }
    );
    return res.sendStatus(204);
  };

  login = async (req: Request, res: Response) => {
    const loginDTO: LoginDTO = req.body;
    const userExist = await this.userRepository.exist({ email: loginDTO.email });
    if(!userExist) {
      throw new ForbiddenException("User not found with this email");
    };
    if(!compareHash(loginDTO.password, userExist.password)) {
      throw new ForbiddenException("Invalid credentials");
    };
    if(!userExist.isVerified) {
      throw new ForbiddenException("User is not verified");
    };

    const accessToken = generateToken({
      payload: { _id: userExist._id, role: userExist.role },
      options: { expiresIn: '1d' }
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      data: { accessToken }
    });
  };
  
}

export default new AuthService();
