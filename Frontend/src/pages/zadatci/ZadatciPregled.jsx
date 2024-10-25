import { useEffect, useState } from "react";
import { Container, Button, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../Constants";
import { FaEdit, FaTrash } from "react-icons/fa";
import { IoIosAdd } from "react-icons/io";
import Service from "../../services/ZadatakService";
import moment from "moment";



export default function ZadatakPregled(){
    const [zadaci, setZadaci] = useState();
    let navigate = useNavigate();

    async function dohvatiZadatke() {
       await Service.get()
       .then((odgovor)=>{
        //console.log(odgovor);
        setZadaci(odgovor);
       })
        .catch((e)=>{console.log(e)});
    }

    async function obrisiZadatak(sifra) {
        const odgovor = await Service.obrisi(sifra);
        console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiZadatke();
    }

    useEffect(()=>{
        dohvatiZadatke();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    function formatirajDatum(pocetak, zavrsetak){
        if(pocetak==null){
            return 'Nije definirano';
        }
        return moment.utc(pocetak, zavrsetak).format('DD. MM. YYYY.');
    }

    return (

        <Container>
            <Link to={RoutesNames.ZADATAK_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
            <Table striped bordered hover responsive>
            <thead>
                    <tr>
                        <th>Naziv</th>
                        <th>Početak</th>
                        <th>Završetak</th>
                        <th>Projekt</th>
                        <th>Opis</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {zadaci && zadaci.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.naziv}</td> 
                            <td className={'sredina'}>
                                {formatirajDatum(entitet.pocetak)}</td>
                            <td className={'sredina'}>
                                {formatirajDatum(entitet.zavrsetak)}</td>
                            <td>{entitet.projekt}</td>
                            <td>{entitet.opis}</td>                           
                            <td className="sredina">
                                
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/zadatak/${entitet.sifra}`)}}
                                    >
                                        <FaEdit 
                                    size={20}
                                    />
                                    </Button>
                                                                                                                  
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiZadatak(entitet.sifra)}
                                    >
                                        <FaTrash
                                        size={20}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>





            </Table>

        </Container>

    );



}