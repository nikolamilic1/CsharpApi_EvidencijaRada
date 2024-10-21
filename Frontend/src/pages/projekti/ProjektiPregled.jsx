import { Button, Container, Table } from "react-bootstrap";
import ProjektService from "../../services/ProjektService";
import { useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../Constants";



export default function ProjektiPregled(){

const[projekti,setProjekti] = useState();

//const[projekt, setProjekt] = useState();

const navigate = useNavigate();

async function dohvatiProjekte() {

    //zaustavi kod u Chrome consoli i tamo se može raditi debug
    //debugger;
    
    await ProjektService.get()
    .then((odgovor)=>{
        setProjekti(odgovor);
    })
    .catch((e)=>{console.log(e)});
}



    useEffect(()=>{
        dohvatiProjekte();
    },[]);




async function obrisiAsync(sifra) {
    const odgovor = await ProjektService.obrisi(sifra);
    if(odgovor.greska){
        alert(odgovor.poruka);
        return;
    }
    dohvatiProjekte();
}

function obrisi(sifra){
    obrisiAsync(sifra);
}

// useEffect(()=>{
//     dohvatiProjekte();
// },[]);

    return(
        <Container>
            <Link to={RoutesNames.PROJEKT_NOVI}>Dodaj novi projekt</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Klijent</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {projekti && projekti.map((projekt,index)=>(
                        <tr key={index}>
                            <td>{projekt.naziv}</td>
                            <td>{projekt.klijent}</td>
                            <td>
                            <Button
                                variant="primary" 
                                onClick={()=>navigate(`/projekti/${projekt.sifra}`)}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;
                                <Button
                                variant="danger" 
                                onClick={()=>obrisi(projekt.sifra)}>
                                    Obriši
                                </Button>
                         
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}