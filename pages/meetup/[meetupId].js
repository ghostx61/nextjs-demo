// import { useRouter } from 'next/router';
import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import { Fragment } from 'react';
import MeetupDetails from '../../components/meetups/MeetupDetails';

function MeetupDetailsPage(props) {
    // const router = useRouter();
    // const meetupId = router.query.meetupId;
    const meetupData = props.meetupData;
    // const meetupData = { id: 'm1', title: 'title', address: 'addresss', image: 'fdafda', description: 'desc' };
    return (
        <Fragment>
            <Head>
                <title>{meetupData.title}</title>
                <meta name='description' content={meetupData.description} />
            </Head>
            <MeetupDetails
                id={meetupData.id}
                title={meetupData.title}
                address={meetupData.address}
                description={meetupData.description}
                image={meetupData.image}
            />
        </Fragment>
    );
}

export async function getStaticPaths() {
    const client = await MongoClient.connect('mongodb+srv://admin:RVnCTJpVZV3PU5rB@cluster0.hyfvxbf.mongodb.net/meetupsDB');
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetupIds = await meetupsCollection.find({}).project({ _id: 1 }).toArray();
    client.close();
    const paths = meetupIds.map(el => ({
        params: {
            meetupId: el._id.toString()
        }
    }));
    console.log(paths);
    return {
        fallback: 'blocking',
        paths,
    };
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    // const meetupId = '63abf5325780cfcf72d5087a';
    const client = await MongoClient.connect(
        'mongodb+srv://admin:RVnCTJpVZV3PU5rB@cluster0.hyfvxbf.mongodb.net/meetupsDB'
    );
    const db = client.db();

    const meetupsCollection = db.collection('meetups');
    const meetup = await meetupsCollection.findOne({ _id: ObjectId(meetupId) });
    let meetupData = {
        id: meetup._id.toString(),
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        description: meetup.description
    };
    delete meetupData._id;
    return {
        props: {
            meetupData,
        },
    };
}

export default MeetupDetailsPage;
