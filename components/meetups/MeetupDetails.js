import classes from './MeetupDetails.module.css';
function MeetupDetails(props) {
    return (
        <div className={classes.detail}>
            <img src={props.image} alt={props.title} />
            <h3>{props.title} {props.id}</h3>
            <p>{props.description}</p>
            <address>{props.address}</address>
        </div>
    )
}

export default MeetupDetails;