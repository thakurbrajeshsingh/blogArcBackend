// Schema
import User from '../model/user.js'

// for password encryption
import bcrypt from 'bcrypt'

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