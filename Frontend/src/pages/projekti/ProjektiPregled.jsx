import { Button, Container, Table } from "react-bootstrap";
import ProjektService from "../../services/ProjektService";
import { useEffect, useState } from "react";



export default function ProjektiPregled(){

const[projekti,setProjekti] = useState();

async function dohvatiProjekte() {
    await ProjektService.get()
    .then((odgovor)=>{
        setProjekti(odgovor);
    })
    .catch((e)=>console.error(e));
}

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

useEffect(()=>{
    dohvatiProjekte();
},[]);

    return(
        <Container>
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