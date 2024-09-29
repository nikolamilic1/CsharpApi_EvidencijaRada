import { useNavigate } from "react-router-dom";
import DjelatnikService from "../../services/DjelatnikService";
import { RoutesNames } from "../../Constants";



export default function DjelatniciDodaj(){

const navigate = useNavigate();

async function dodaj(e) {
    const odgovor = await DjelatnikService.dodaj(e);
    if(odgovor.greska){
        alert(odgovor.poruka);
        return;
    }
    navigate(RoutesNames.DJELATNIK_PREGLED);    
}

function obradiSubmit(e){
    e.preventDefault();

    const podaci = newFormData(e.target);

    dodaj({
        ime: podaci.get('ime'),
        prezime: podaci.get('prezime'),
        email: podaci.get('email')
    });
}




return(
    <>
        Dodavanje novog Djelatnika
        
        <Form onSubmit={obradiSubmit}>
            <Form.Group controlId="ime">
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="ime" required />
            </Form.Group>

            <Form.Group controlId="prezime">
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="prezime" required />
            </Form.Group>

            <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" name="email" required />
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
                    Dodaj novog djelatnika
                </Button>
                </Col>
            </Row>
        </Form>
    </>
)
}