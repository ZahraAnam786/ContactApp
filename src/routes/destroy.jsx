import { redirect } from "react-router-dom";
import { deleteContact } from "../contactsApi";


export async function Action({params}) {
    await deleteContact(params.contactId);
    return redirect("/");
    //throw new Error("oh dang!");

}