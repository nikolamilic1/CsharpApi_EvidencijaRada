import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DjelatnikService from "../../services/DjelatnikService";
import { RoutesNames } from "../../Constants";



export default function DjelatniciPromjena(){

    const navigate = useNavigate();
    const routeParams = useParams();
    const [djelatnik,setDjelatnik] = useState({});

    async function dohvatiProjekt() {
        const odgovor = await DjelatnikService.getBySifra(routeParams.sifra);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        setDjelatnik(odgovor.poruka);
    }

    useEffect(()=>{
        dohvatiDjelatnik();
    },[]);

    async function promjena(e) {
        const odgovor = await DjelatnikService.promjena(routeParams.sifra.e);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.DJELATNIK_PREGLED);
    }




}