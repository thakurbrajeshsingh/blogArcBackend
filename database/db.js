import mongoose from 'mongoose'





export const Connection = async (username, password) => {
    const URL = `mongodb://${username}:${password}@blogarc-app-shard-00-00.fdu0a.mongodb.net:27017,blogarc-app-shard-00-01.fdu0a.mongodb.net:27017,blogarc-app-shard-00-02.fdu0a.mongodb.net:27017/?ssl=true&replicaSet=atlas-2ypnct-shard-0&authSource=admin&retryWrites=true&w=majority`
    try {
        await mongoose.connect(URL, { useNewUrlParser: true, })
        console.log("Database Connected Successfully");
    } catch (error) {
        console.log('Error while connecting DB', error);
    }
}



export default Connection;