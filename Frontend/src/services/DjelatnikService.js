import { HttpService } from "./HttpService";


async function get() {
    return await HttpService.get('/Djelatnik')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})    
}

async function getBySifra(sifra) {
    return await HttpService.get('/Djelatnik/' + sifra)
    .then((odgovor)=>{
        console.log(odgovor.data);
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Ne postoji djelatnik!'}
    })
}

async function obrisi(sifra) {
    return await HttpService.delete('/Djelatnik/' + sifra)
    .then((odgovor)=>{
        //console.log(odgovor);
        return {greska: false, poruka: odgovor.data}
    })
    .catch(()=>{
        return {greska: true, poruka: 'Djelatnik se ne može obrisati!'}
    })
}

async function dodaj(Djelatnik) {
    return await HttpService.post('/Djelatnik',Djelatnik)
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
                return {greska: true, poruka: 'Djelatnik se ne može dodati!'}
        }
    })
}

async function promjena(sifra,Djelatnik) {
    return await HttpService.put('/Djelatnik/' + sifra,Djelatnik)
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
                return {greska: true, poruka: 'Djelatnik se ne može promjeniti!'}
        }
    })
}

// async function traziDjelatnik(uvjet) {
//     return await HttpService.get('/Djelatnik/trazi/'+uvjet)
//     then((odgovor)=>{
//         //console.table(odgovor.data);
//         return {greska: false, poruka: odgovor.data}
//     })
//     .catch((e)=>{return {greska: true, poruka: 'Problem kod traženja djalatnika'}})
// }

export default{
    get,
    getBySifra,
    obrisi,
    dodaj,
    promjena
}