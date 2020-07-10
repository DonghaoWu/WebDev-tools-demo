import { useRouter } from 'next/router';
import Link from 'next/link';

const Robotinfo = (props) => {
    const { robot } = props;
    return (
        robot ?
            <div style={{ textAlign: "center", color: "white" }}>
                <h1>Robot</h1>
                <img alt='robots' src={`https://robohash.org/${robot.id}?size=200x200`} />
                <p> id: {robot.id}</p>
                <p> name: {robot.name}</p>
                <p> username: {robot.username}</p>
                <p> email: {robot.email}</p>
                <p> phone: {robot.phone}</p>
                <p> website: {robot.website}</p>
                <button><Link href={`/`}>
                    <a>Back --></a>
                </Link></button>
            </div>
            :
            <h1>Loading...</h1>
    )
}

Robotinfo.getInitialProps = async function ({ query }) {
    console.log(`Individual call======>`);
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${query.id}`);
    const data = await response.json();
    return {
        robot: data,
    }
}
export default Robotinfo;