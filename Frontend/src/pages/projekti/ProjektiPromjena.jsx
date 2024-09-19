import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { RoutesNames } from "../constants";
import moment from "moment";
import SmjerService from "../../services/SmjerService";
import { useEffect, useState } from "react";



export default function ProjektiPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [projekt,setProjekt] = useState({});

    async function dohvatiProjekt(){
        const odgovor = await SmjerService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
       // odgovor.poruka.izvodiSeOd = moment.utc(odgovor.poruka.izvodiSeOd).format('yyyy-MM-DD');
       // setSmjer(odgovor.poruka);
    }

    useEffect(()=>{
        dohvatiProjekt();
    },[]);

    async function promjena(projekt){
        //console.log(projekt);
        //console.log(JSON.stringify(projekt));
        const odgovor = await ProjektService.promjena(routeParams.sifra,projekt);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.PROJEKT_PREGLED);
    }

    function obradiSubmit(e){ // e predstavlja event
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            naziv: podaci.get('naziv'), // 'naziv' je došao iz atributa name od Form.Control
            klijent: podaci.get('klijent')
        });


    }



    return(
        <Container>
            Promjena smjera
            
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="naziv">
                    <Form.Label>Naziv</Form.Label>
                    <Form.Control type="text" name="naziv" required 
                    defaultValue={projekt.naziv} />
                </Form.Group>

                <Form.Group controlId="klijent">
                    <Form.Label>Klijent</Form.Label>
                    <Form.Control type="text" name="klijent" required 
                    defaultValue={projekt.naziv} />
                </Form.Group>

            
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
                        Promjeni projekt
                    </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )

}