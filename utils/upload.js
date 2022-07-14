import multer from 'multer';

import dotenv from 'dotenv'

import { GridFsStorage } from 'multer-gridfs-storage'


dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const storage = new GridFsStorage({
    url: `mongodb://${username}:${password}@blogarc-app-shard-00-00.fdu0a.mongodb.net:27017,blogarc-app-shard-00-01.fdu0a.mongodb.net:27017,blogarc-app-shard-00-02.fdu0a.mongodb.net:27017/?ssl=true&replicaSet=atlas-2ypnct-shard-0&authSource=admin&retryWrites=true&w=majority`,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];
        if (match.indexOf(file.memeType) === -1) 
            return `${Date.now()}-blog-${file.originalname}`;
        
        return {
            bucketName: 'photos',
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});


export default multer({ storage })