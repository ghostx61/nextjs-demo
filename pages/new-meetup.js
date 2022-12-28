import { useRouter } from 'next/router';
import Head from 'next/head';
import { Fragment } from 'react';
import NewMeetupForm from '../components/meetups/NewMeetupForm';

function NewMeetupsPage() {
    const router = useRouter();
    const addMeetupHandler = async (newMeetup) => {
        console.log(newMeetup);
        const response = await fetch('/api/new-meetup', {
            method: 'POST',
            body: JSON.stringify(newMeetup),
            headers: {
                'Content-type': 'application/json'
            }
        });
        const data = await response.json();
        console.log(data);
        router.replace('/')
    }
    return (
        <Fragment>
            <Head>
                <title>Add New Meetup</title>
                <meta name='description' content="Add your meetup location and create connections" />
            </Head>
            <NewMeetupForm onAddMeetup={addMeetupHandler} />
        </Fragment>
    )
}

export default NewMeetupsPage;