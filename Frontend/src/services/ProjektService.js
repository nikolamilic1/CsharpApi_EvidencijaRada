import ProjektiPromjena from "../pages/projekti/ProjektiPromjena";
import { HttpService } from "./HttpService";

async function get() {
   return await HttpService.get('/Projekt')
    .then((odgovor)=>{
        // console.log(odgovor.data);   // da vidimo što se događa
        // console.table(odgovor.data);   // stavlja u tablicu
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra() {
    return await HttpService.get('/Projekt/' + sifra)
     .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
         // console.log(odgovor.data);   // da vidimo što se događa
         // console.table(odgovor.data);   // stavlja u tablicu
         return odgovor.data;
     })
     .catch((e)=>{
        return {greska: true, poruka: 'Ne postoji projekt'}    
    })
 }

async function obrisi(sifra) {
    return await HttpService.delete('/Projekt/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data.poruka}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Projekt se ne može obrisati!'}
    })
}

async function dodaj(projekt) {
    return await HttpService.post('/Projekt', projekt)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Projekt se ne može dodati!'}
    })
}

async function promjena(sifra, projekt) {
    return await HttpService.put('/Projekt/' + sifra,projekt)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Projekt se ne može promjeniti!'}
    })
}

export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}