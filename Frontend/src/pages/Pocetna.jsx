import { useState } from "react";
import { Container } from "react-bootstrap";
import ProjektService from "../services/ProjektService";
import DjelatnikService from "../services/DjelatnikService";



export default function Pocetna(){
    const { showLoading, hideLoading } = useLoading();

    const [djelatnika, setDjelatnika] = useState(0);
    const [projekti, setProjekti] = useState([]);

    async function dohvatiProjekte() {

        // zaustavi kod u Chrome consoli i tamo se može raditi debug
        //debugger;
        
        await ProjektService.dostupniProjekti()
        .then((odgovor)=>{
            //console.log(odgovor);
            setProjekti(odgovor);
        })
        .catch((e)=>{console.log(e)});

    }

    async function dohvatiBrojDjelatnika() {
        await DjelatnikService.ukupnoDjelatnika()
        .then((odgovor)=>{
            //console.log(odgovor);
            setProjekti(odgovor.poruka);
        })
        .catch((e)=>{console.log(e)});
    }


    async function ucitajPodatke() {        
        await dohvatiProjekte();
        await dohvatiBrojDjelatnika();        
      }


    useEffect(()=>{
        ucitajPodatke()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);



    return(
        <>
        <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                    Naši projekti:
                    <ul>
                    {projekti && projekti.map((projekt,index)=>(
                            <li key={index}>{projekt.naziv}</li>
                            
                    ))}
                    </ul>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                    Zaposleno kod nas
                    <div className="brojDjelatnika">
                        {djelatnika}
                    <CountUp
                    start={0}
                    end={djelatnika}
                    duration={10}
                    separator="."></CountUp>
                    </div>
                    djelatnika
                    </Col>
                </Row>
            </>
    )


}