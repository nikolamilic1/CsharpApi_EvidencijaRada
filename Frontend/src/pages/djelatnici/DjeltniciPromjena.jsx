import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import DjelatnikService from "../../services/DjelatnikService";
import { RoutesNames } from "../../Constants";
import { Button, Col, Form, Row } from "react-bootstrap";



export default function DjelatniciPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [djelatnik,setDjelatnik] = useState({});

    async function dohvatiDjelatnik() {
        const odgovor = await DjelatnikService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        setDjelatnik(odgovor.poruka);
    }

    useEffect(()=>{
        dohvatiDjelatnik();
    },[]);

    async function promjena(e) {
        const odgovor = await DjelatnikService.promjena(routeParams.sifra,e);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.DJELATNIK_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            email: podaci.get('email')
        });
    }


    return(
        <>
            Promjena Polaznika
            
            <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                    <Form.Label>Ime</Form.Label>
                    <Form.Control type="text" name="ime" required defaultValue={djelatnik.ime}/>
                </Form.Group>

                <Form.Group controlId="prezime">
                    <Form.Label>Prezime</Form.Label>
                    <Form.Control type="text" name="prezime" required  defaultValue={djelatnik.prezime}/>
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="text" name="email" required  defaultValue={djelatnik.email}/>
                </Form.Group>
               
                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    <Link to={RoutesNames.DJELATNIK_PREGLED}
                    className="btn btn-danger siroko">
                    Odustani
                    </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    <Button variant="primary" type="submit" className="siroko">
                        Promjeni djelatnika
                    </Button>
                    </Col>
                </Row>
            </Form>
        </>
    )




}