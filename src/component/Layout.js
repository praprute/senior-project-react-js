import React, {Component} from 'react';
import Navbar from "../component/navbar/nav"
import {Jumbotron, Button, Container} from 'react-bootstrap'

const Layout = ({
    title = "Title",
    description = "Description",
    className,
    children
}) => (
    <div>
        <Navbar />
        <Jumbotron>
        <Container>
            <h2>{title}</h2>
            <p className="lead">{description}</p>
            <p>
              This is a simple hero unit, a simple jumbotron-style component for calling
              extra attention to featured content or information.
            </p>
            <p>
              <Button variant="primary">Learn more</Button>
            </p>
        </Container>   
        </Jumbotron>
        <div className={className}>{children}</div>
    </div>
);
export default Layout