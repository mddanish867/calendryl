
import { requireUser } from "../lib/hooks";

export default async function Dashboard(){    
    const session = await requireUser();    
    return(
        <h1>Hello from dashbard</h1>
    )
}