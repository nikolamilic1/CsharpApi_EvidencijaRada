import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../constants";
import moment from "moment";
import SmjerService from "../../services/SmjerService";
import ProjektSevice from "../../services/ProjektSevice";


export default async function ProjektiDodaj() {

const navigate = useNavigate();

async function dodaj(projekt){
    //console.log(projekt);
    //console.log(JSON.stringify(projekt));
    const odgovor = await SmjerService.dodaj(projekt);
    if(odgovor.greska){
        alert(odgovor.poruka);
        return;
    }
    navigate(RoutesNames.PROJEKT_PREGLED);
}

function obradiSubmit(e){ // e predstavlja event
    e.preventDefault();

    const podaci = new FormData(e.target);

    dodaj({
        naziv: podaci.get('naziv'), // 'naziv' je došao iz atributa name od Form.Control
        naziv: klijent.get('klijent')
    });




}

return(
        <Container>
            Dodavanje novog projekta
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required />
                </Form.Group>

                <Form.Group controlId="klijent">
                    <Form.Label>Klijent</Form.Label>
                    <Form.Control type="text" name="klijent" required />
                </Form.Group>
{/* 
                <Form.Group controlId="cijena">
                    <Form.Label>Cijena</Form.Label>
                    <Form.Control type="number" name="cijena" step={0.01}/>
                </Form.Group>

                <Form.Group controlId="izvodiSeOd">
                    <Form.Label>Izvodi se od</Form.Label>
                    <Form.Control type="date" name="izvodiSeOd"  />
                </Form.Group>

                <Form.Group controlId="vaucer">
                    <Form.Check label="Vaučer" name="vaucer" />
                </Form.Group>
 */}

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RoutesNames.PROJEKT_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Dodaj novi projekt
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}