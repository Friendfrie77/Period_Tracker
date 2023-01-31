import axios from 'axios';
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
function Index(){
    const username = "test"
    function test(){
        
    }
    return(
        <section>
            <h1>Welcome back, {username}</h1>
            <button type='submit' onClick={(test)}>test</button>
            <Link to= '/login'>test</Link>
        </section>
    )
};

export default Index


