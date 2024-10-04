import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjektService from "../../services/ProjektService";
import { RoutesNames } from "../../Constants";



export default function ZadaciPromjena() {

    const navigate = useNavigate();
    const routeParams = useParams();

    const [projekt, setProjekt] = useState([]);
    const [projektSifra, setProjektSifra] = useState(0);

    const [zadatak, setZadatak] = useState({});

    async function dohvatiProjekt() {
        const odgovor = await ProjektService.get();
    setProjekt(odgovor);
    }


    async function dohvatiZadatak() {
        const odgovor = await Service.getBySifra(routeParams.sifra);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    let zadatak = odgovor.poruka;
    setZadatak(zadatak);
    setProjektSifra(zadatak.projektSifra); 

    }

    async function dohvatiInicijalnePodatke() {
        await dohvatiProjekt();
        await dohvatiZadatak();        
    }

    useEffect(()=>{
        dohvatiInicijalnePodatke();
        // eslint-disable-next-line react-hooks/exhaustive-deps
      },[]);

      async function dodaj(e) {
        const odgovor = await Service.dodaj(e);
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
    }
    navigate(RoutesNames.DJELATNIK_PREGLED);
      }

      function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);


    dodaj({
      naziv: podaci.get('naziv'),     
      pocetak: parseInt(podaci.get('maksimalnopolaznika')),
      zavrsetak: parseInt(podaci.get('maksimalnopolaznika')),
      projektSifra: parseInt(projektSifra),
      opis: podaci.get('opis')
    });
        
      }










}