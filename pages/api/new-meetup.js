import { MongoClient } from 'mongodb';

async function handler(req, res) {
    if (req.method === 'POST') {
        const data = req.body;

        const client = await MongoClient.connect('mongodb+srv://admin:RVnCTJpVZV3PU5rB@cluster0.hyfvxbf.mongodb.net/meetupsDB');
        const db = client.db();

        const meetupsCollection = db.collection('meetups');
        const result = await meetupsCollection.insertOne(data);

        console.log(result);
        client.close();

        res.status(201).json({ message: 'success', response: result });
    }

}
export default handler;