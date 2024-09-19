import { Container, Table } from "react-bootstrap";
import ProjektSevice from "../../services/ProjektSevice";
import { useEffect, useState } from "react";



export default function ProjektiPregled(){

    const[projekti,setProjekti] = useState();

    async function dohvatiProjekte() {
        await ProjektSevice.get()
        .then((odgovor)=>{
            setProjekti(odgovor);
        })
        .catch((e)=>{console.log(e)});
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
                        <td>{projekt.sifra}</td>
                    </tr>
                ))}
            </tbody>
            </Table>
    </Container>
);

}