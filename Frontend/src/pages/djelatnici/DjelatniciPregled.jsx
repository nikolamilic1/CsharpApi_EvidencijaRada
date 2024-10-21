import { Link, useNavigate } from "react-router-dom";
import DjelatnikService from "../../services/DjelatnikService";
import { RoutesNames } from "../../Constants";
import { useState, useEffect } from "react";
import { Button, Container, Table } from "react-bootstrap";



export default function DjelatniciPregled(){

    const[djelatnici,setDjelatnik] = useState();

    const navigate = useNavigate();

    async function dohvatiDjelatnike() {

        // zaustavi kod u Chrome consoli i tamo se može raditi debug
        //debugger;
        
        await DjelatnikService.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setDjelatnik(odgovor);
        })
        .catch((e)=>console.error(e));
    }



    // npm run lint
    // javlja upozorenje
    // 28:7  warning  React Hook useEffect has a missing dependency: 'dohvatie'. Either include it or remove the dependency array  react-hooks/exhaustive-deps

    useEffect(()=>{
        dohvatiDjelatnike();
    },[]);    



    async function obrisiAsync(sifra) {
        const odgovor = await DjelatnikService.obrisi(sifra);
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiDjelatnike();
    }

    function obrisi(sifra){
        obrisiAsync(sifra);
    }


    return(
        <Container>
            <Link to={RoutesNames.DJELATNIK_NOVI}>Dodaj novog djelatnika</Link>            
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Email</th>                        
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {djelatnici && djelatnici.map((e, index)=>(
                        <tr key={index}>
                            <td>{e.ime}</td>
                            <td>{e.prezime}</td>
                            <td>{e.email}</td>                            
                           
                            <td>
                            <Button
                                variant="primary"
                                onClick={()=>navigate(`/djelatnici/${e.sifra}`)}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                variant="danger"
                                onClick={()=>obrisi(e.sifra)}>
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