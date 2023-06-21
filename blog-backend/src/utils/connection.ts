import { connect } from "mongoose";

export const connectToDatabase = async () => {
    try {
        await connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/?retryWrites=true&w=majority`);
    } catch (err) {
        console.error({err});
        throw err;
    }
}
