import { Fragment } from 'react';
import Head from 'next/head';
import { MongoClient } from 'mongodb'; /// this import will not be bundled to client site becoz we have used it in staticprops.
import MeetupList from '../components/meetups/MeetupList';

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        image: 'https://images.unsplash.com/photo-1669923804952-c72912e9250e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        title: 'Meetup 1',
        address: '1, some city, 444012',
        description: 'This is the 1st meetup'
    }, {
        id: 'm2',
        image: 'https://images.unsplash.com/photo-1669923804952-c72912e9250e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80',
        title: 'Meetup 2',
        address: '2, some city, 4652432',
        description: 'This is the 2nd meetup'
    }
]
function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>React Meetups</title>
                <meta name='description' content="This is the meetups homepage" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </Fragment>
    )
}

export async function getStaticProps() {
    // fetch data from api (below code will not be exposed to client becoz it is in this function)
    //hence the credientails would not be exposed to client.
    const client = await MongoClient.connect('mongodb+srv://admin:RVnCTJpVZV3PU5rB@cluster0.hyfvxbf.mongodb.net/meetupsDB');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const result = await meetupsCollection.find().toArray();
    const meetups = result.map(meetup =>
    ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        description: meetup.description,
        id: meetup._id.toString()
    })
    )
    client.close();
    console.log(result);

    return {
        props: {
            meetups: meetups
        },
        revalidate: 1
    }
}

export default HomePage;