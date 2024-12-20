import { Container, Row} from "react-bootstrap";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { fetchUser } from "../http/userAPI";
import { fetchUsersRealts } from "../http/realtAPI";
import RealtItem from "../components/RealtItem";


const UserPage = observer(() => {

    const [user, setUser] = useState({});
    const { id } = useParams();
    const [realts, setRealts] = useState([])

    useEffect(() => {
        fetchUser(id).then(data => setUser(data))
        
        fetchUsersRealts(id).then(data => {  
            setRealts(data);
         });
    }, [id]);

    return (
        <div style={{minHeight: '100vh'}}>
        <Container className="mt-5 mb-5" style={{ background: "rgba(255,255,255,1)", borderRadius: "20px", padding: "20px"}}>
            <h4>{user.firstName + ' ' + user.lastName}</h4>

            <p>Номер телефона: <span>{user.phoneNumber}</span></p>
            <p>Email: <span>{user.login}</span></p>
            <hr></hr>
            <h4>Товары пользователя:</h4>

            <Row className="vh-90">
                {realts.map(realt => (
                    <RealtItem key={realt.id} realtItem={realt} />
                ))}
            </Row>
        </Container>
        </div>
    );
});

export default UserPage;