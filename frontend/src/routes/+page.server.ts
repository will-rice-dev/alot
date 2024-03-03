import db from "$lib/server/db";
import { popsicles } from "$lib/server/schema";

export async function load() {
	return {
        pops: await fetchPopsicles() 
    }
}


const fetchPopsicles = async () => {
    const pops = await db.select().from(popsicles);
    console.log(pops);
    return pops;
}