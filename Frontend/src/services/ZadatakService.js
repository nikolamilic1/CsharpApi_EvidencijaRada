import { HttpService } from "./HttpService"


async function get(){
    return await HttpService.get('/Zadatak')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})
}

async function getBySifra(sifra) {
    return await HttpService.get('/Zadatak/' + sifra)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Ne postoji zadatak!'}
    })    
}

async function obrisi(sifra) {
    return await HttpService.delete('/Zadatak/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Zadatak se ne može obrisati!'}
    })
}

async function dodaj(Zadatak) {
    return await HttpService.post('/Zadatak', Zadatak)
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
                return {greska: true, poruka: 'Zadatak se ne može dodati!'}
        }
    })
}

async function promjena(sifra,Zadatak) {
    return await HttpService.put('/Zadatak/' + sifra,Zadatak)
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
                console.log(poruke)
                return {greska: true, poruka: poruke}
            default:
                return {greska: true, poruka: 'Zadatak se ne može promjeniti!'}
        }
    })
}

async function getDjelatnici(sifra) {
    return await HttpService.get('/Zadatak/Djelatnik/'+ sifra)
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{return {greska: true, poruka: 'Problem kod dohvaćanja djelatnika'}})    
}


async function dodajDjelatnika(zadatak, djelatnik) {
    return await HttpService.post('/Zadatak/' + zadatak + '/dodaj/'+djelatnik)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data }
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Djelatnik se ne može dodati na grupu'}
    })
}

async function obrisiDjelatnika(zadatak, djelatnik) {
    return await HttpService.delete('/Zadatak/' + zadatak + '/obrisi/' + djelatnik)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}        
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Djelatnik se ne može obrisati iz grupe'}
    })
}

export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena,
    getDjelatnici,
    dodajDjelatnika,
    obrisiDjelatnika
}