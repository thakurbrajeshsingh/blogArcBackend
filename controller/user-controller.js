// Schema
import User from '../model/user.js'


export const signupUser = async (request, response) => {
    try {
        const exist = await User.findOne({ username: request.body.username });
        if (exist) {
            return response.status(401).json({ msg: 'User Already Exist' })
        }
        const user = request.body;
        const newUser = User(user);
        await newUser.save();
        return response.status(200).json({ msg: 'signup successfull' })
    } catch (error) {
        return response.status(500).json({ msg: 'Error while signup user' })
    }
}