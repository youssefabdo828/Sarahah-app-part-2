import dotenv from 'dotenv'



dotenv.config({ path: [`.${process.env.NODE_ENV}.env`, '.env'] })



const envConfig = {
    database: {
        uri: process.env.DB_URI_LOCAL ?? 'mongodb://localhost/test_db'
    },
    encryption: {
        key: process.env.ENCRYPTION_KEY,
        iv: parseInt(process.env.IV_LENGTH)
    }
}


export default envConfig;