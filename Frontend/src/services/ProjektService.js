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

async function obrisi(sifra) {
    return await HttpService.delete('/Projekt/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data.poruka}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Projekt se ne može obrisati!'}
    })
}

export default{
    get,
    obrisi
}