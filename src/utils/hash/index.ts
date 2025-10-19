import bcrypt from 'bcryptjs';

export const generateHash = (planText: string) => {
    return bcrypt.hashSync(planText, 10);
};

export const compareHash = (password: string, hash: string) => {
    return bcrypt.compareSync(password, hash);
}