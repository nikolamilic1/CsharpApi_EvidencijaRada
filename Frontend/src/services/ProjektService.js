import ProjektiPromjena from "../pages/projekti/ProjektiPromjena";
import { HttpService } from "./HttpService";

async function get() {
   return await HttpService.get('/Projekti')
    .then((odgovor)=>{
        //console.log(odgovor.data);        // da vidimo što se događa
        // console.table(odgovor.data);   // stavlja u tablicu
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra) {
    return await HttpService.get('/Projekti/' + sifra)
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
    return await HttpService.delete('/Projekti/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data.poruka}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Projekt se ne može obrisati!'}
    })
}

async function dodaj(projekt) {
    return await HttpService.post('/Projekti', projekt)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        switch (e.status) {
            case 400:
                let poruke='';
                for(const kljuc in e.response.data.errors){
                    poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
        }
        return {greska: true, poruka: poruke}
        default:
            return {greska: true, poruka: 'Projekt se ne može dodati!'}
    }
    })
    
}

async function promjena(sifra, projekt) {
    return await HttpService.put('/Projekti/' + sifra,projekt)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
      switch (e.status) {
        case 400:
            let poruke='';
            for(const kljuc in e.response.data.errors){
                poruke += kljuc + ': ' + e.response.data.errors[kljuc][0] + '\n';
            }
            return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Projekt se ne može promjeniti'}
      }
    })
}

export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}