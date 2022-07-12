// Schema
import User from '../model/user.js'
import Token from '../model/token.js'
// jwt
import jwt from 'jsonwebtoken'

// for password encryption
import bcrypt from 'bcrypt'

import dotenv from 'dotenv'
dotenv.config()

export const signupUser = async (request, response) => {
    try {
        // const salt = await bcrypt.genSalt();
        // const hashedPassword = await bcrypt.hash(request.body.password, salt);
        // 10 indicates salt of length 10 ,new method no need to gensalt manually
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        const exist = await User.findOne({ username: request.body.username });
        if (exist) {
            return response.status(401).json({ msg: 'User Already Exist' })
        }
        const user = { username: request.body.username, name: request.body.name, password: hashedPassword };
        const newUser = User(user);
        await newUser.save();
        return response.status(200).json({ msg: 'signup successfull' })
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signup user' })
    }
}


export const loginUser = async (request, response) => {
    let user = await User.findOne({ username: request.body.username });
    if (!user) {
        return response.status(400).json({ msg: 'Username does Not Match' })
    }
    try {
        let match = await bcrypt.compare(request.body.password, user.password)
        if (match) {
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, { expiresIn: '15m' })
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)
            const newToken = new Token({ token: refreshToken })
            await newToken.save()

            return response.status(200).json({ accessToken: accessToken, refreshToken: refreshToken, name: user.name, username: user.username })

        } else {
            return response.status(400).json({ msg: 'Password Does Not Match' })
        }
    } catch (error) {
        return response.status(500).json({ msg: 'Error while login user' })
    }





}







