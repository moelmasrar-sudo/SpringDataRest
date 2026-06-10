import React from 'react';
import { Col, Container, Navbar } from "react-bootstrap";

class Footer extends React.Component {

    render() {

        const fullYear = new Date().getFullYear();

        return (
            <Navbar
                bg="white"
                variant="light"
                className="py-3 border-top mt-auto"
            >

                <Container>

                    <Col
                        lg={12}
                        className="text-center"
                    >

                        <div className="text-muted small">

                            {fullYear} - {fullYear + 1} • All Rights Reserved

                        </div>

                    </Col>

                </Container>

            </Navbar>
        );
    }
}

export default Footer;