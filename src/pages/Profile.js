import { Container, Button, Row } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import React, { useContext, useState, useEffect } from "react";
import AddRealtModal from '../components/modals/AddRealtModal'; 
import {  fetchUsersRealts } from "../http/realtAPI";
import RealtItem from "../components/RealtItem";
import UserFilterModal from "../components/modals/UserFilterModal";

const Home = observer(() => {
    const { user } = useContext(Context)
    const {realt} = useContext(Context)
    const [showModal, setShowModal] = useState(false)
    const [showUserFilterModal, setShowUserFilterModal] = useState(false)

    const logOut = () => {
        localStorage.removeItem('token');
        user.setUser({});
        user.setIsAuth(false);
        user.setIsAdmin(false);
        user.setUserId(null);
        user.setUserName(null);
        user.setUsers([]);
        realt.setUsersRealts([])
        realt.setSelectedType(0)
        realt.setSelectedDealType(0)
    };
    
    useEffect(() => {
        if (user.userId) {
            fetchUsersRealts(user.userId).then(data => {  
                realt.setUsersRealts(data);
            });
        }
    }, [user.userId, realt]);

    return (
        <Container className="mt-5 mb-3"  style={{ minHeight: '74.74vh'}}>
            <div className="d-flex justify-content-between align-items-center">
                <h4 className="mb-4">{user.userName}</h4>
                <div className="ms-2">
                    <Button variant="primary" onClick={() => setShowUserFilterModal(true)}>
                        Мои пожелания
                    </Button>
                    <Button variant="primary" onClick={() => setShowModal(true)} className="ms-2">
                        Добавить объявление
                    </Button>
                    <Button variant="outline-dark" onClick={logOut} className="ms-2">Выйти</Button>
                </div>
            </div>
            <hr></hr>
            <h4 className="text-center">Мои объявления</h4>
            
            <Row className="d-flex container vh-90">
                {realt.usersRealts.map(realt => (
                    <RealtItem key={realt.id} realtItem={realt} />
                ))}
            </Row>
            <AddRealtModal show={showModal} onHide={() => setShowModal(false)} />
            <UserFilterModal show={showUserFilterModal} onHide={() => setShowUserFilterModal(false)} />
        </Container>
    );
});

export default Home;