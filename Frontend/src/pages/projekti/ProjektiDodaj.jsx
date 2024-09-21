import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RoutesNames } from "../../Constants";



export default function ProjektiDodaj(){


    return(
        <Container>
            Dodavanje novog projekta
            <hr />
            <Form>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>   
                    <Form.Control type="text" name="naziv" required />                    
                    </Form.Group>      

                    <Form.Group controlId="klijent">
                    <Form.Label>Klijent</Form.Label>   
                    <Form.Control type="text" name="klijent" required />                    
                    </Form.Group>      
                    <hr />
            <Row>
                <Col xs={6} sm={6} md={3} lg={6} xxl={6}>
                <Link to={RoutesNames.PROJEKT_PREGLED}
                className="btn btn-danger siroko">
                Odustani
                </Link>                
                </Col>
                <Col xs={6} sm={6} md={9} lg={6} xxl={6}>
                <Button variant="primary" type="submit" className="siroko">
                Dodaj novi projekt
                </Button>
                </Col>
            </Row>
            </Form>
        </Container>
    )
}