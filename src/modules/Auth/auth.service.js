import { hash } from "argon2";
import { encrypt } from '../../Utils/Security/encryption.security.js';
import { compareTwoHashes } from "../../Utils/Security/hash.security.js";
import UserRepository from "../../DB/Repositories/user.repository.js";
import HttpAppError from "../../Utils/Errors/app.error.js";
import { BadRequestException, ConflictException } from "../../Utils/Errors/exception.error.js";

const userRepo = new UserRepository()

export const registerUser = async (body) => { 
    const { firstName, lastName, email, password , gender , age , phone } = body

const existingUser = await userRepo.findUserByEmail(email);
  if (existingUser) {
    throw new ConflictException('User with this email already exists', {duplicatedEmail:email} , 'EMAIL_CONFLICT');
  }

let encryptPhone;
 if (phone) encryptPhone = encrypt(phone)

 const hashedPassword = await hash(password)

return userRepo.createNewDocument({firstName, lastName, email, password:hashedPassword , gender , age , phoneNumber:encryptPhone || undefined})
}

export const login = async (body) => {

const { email, password } = body

  const isEmailExist = await userRepo.findUserByEmail( email )
  if (!isEmailExist) throw new BadRequestException('Invalid email or password')

  const isPasswordMatched = await compareTwoHashes(isEmailExist.password , password)
if(!isPasswordMatched) throw new BadRequestException('invalid email or password')

return true
};
