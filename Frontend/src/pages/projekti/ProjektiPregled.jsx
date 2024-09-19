import { Container, Table } from "react-bootstrap";
import ProjektSevice from "../../services/ProjektSevice";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import moment from "moment";
import { GrValidate } from "react-icons/gr";
import { RoutesNames } from "../constants";
import { Link, useNavigate } from "react-router-dom";



export default function ProjektiPregled(){

    const[projekti,setProjekti] = useState();

    const navigate = useNavigate();

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







    // function formatirajDatum(datum){
    //     if(datum==null){
    //         return 'Nije definirano';
    //     }
    //     return moment.utc(datum).format('DD. MM. YYYY.');
    // }

    // function vaucer(v){
    //     if(v==null) return 'gray';
    //     if(v) return 'green';
    //     return 'red'
    // }

    async function obrisiAsync(sifra) {
        const odgovor = await ProjektSevice.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiProjekte();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }


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
                        <td>{projekt.sifra}</td>
                        <td>
                            <Button
                                variant="primary"
                                onClick={()=>navigate(`/projekti/${projekt.sifra}`)}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;&nbsp;
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
);

}