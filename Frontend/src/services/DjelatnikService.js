import { HttpService } from "./HttpService";


async function get() {
    return await HttpService('/Djelatnik')
    .then((odgovor)=>{
        //console.table(odgovor.data);
        return odgovor.data;
    })
    .catch((e)=>{console.error(e)})    
}

async function getBySifra(sifra) {
    
}

async function name(params) {
    
}