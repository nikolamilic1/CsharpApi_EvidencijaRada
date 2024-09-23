import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../Constants";
import ProjektService from "../../services/ProjektService";



export default function ProjektiDodaj(){

    const navigate = useNavigate();

    async function dodaj(projekt) {
        // console.log(projekt);                  // wp4-17.09.2024  od 1:17:25
       // console.log(JSON.stringify(projekt));   //  do  1:27:00
       const odgovor = await ProjektService.dodaj(projekt);
       if(odgovor.greska){
           alert(odgovor.poruka);
           return;
       }
       navigate(RoutesNames.PROJEKT_PREGLED);
    }

    function obradiSubmit(e){
        e.preventDefault();

        const podaci = new FormData(e.target);

        dodaj({
            naziv: podaci.get('naziv'),  // naziv je došao iz atributa name od Form.Control
            klijent: podaci.get('klijent')
        });
    }



    return(
        <>
        <Container>
            Dodavanje novog projekta
            <hr />
            <Form onSubmit={obradiSubmit}>                
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
        </>
    )
}