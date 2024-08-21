import {
  Outlet,
  NavLink,
  Form,
  useLoaderData,
  redirect,
  useNavigation,
  useSubmit,
} from "react-router-dom";
import { getContacts, createContact } from "../contactsApi";
import { useEffect } from "react";

export async function Loader({ request }) {  // with searching
  //fetch contacts  in Loader and this attach in route and load this contacts  (useLoaderData)
  const url = new URL(request.url);
  const q = url.searchParams.get("q");
  const contacts = await getContacts(q);
  return { contacts , q };
}


export async function Action() {
  const contact = await createContact();
  return redirect(`/contacts/${contact.id}/edit`);
}

export default function Root() {
  const { contacts, q } = useLoaderData();
  const navigation = useNavigation();
  const submit = useSubmit();

  const searching = navigation.location && new URLSearchParams(navigation.location.search).has('q');

  useEffect(() =>{
    document.getElementById('q').Value = q;
  }, [q])

  return (
    <>
      <div id="sidebar">
        <h1>React Contacts</h1>
        <div>
          <Form id="search-form" role="search">
            <input
              id="q"
              className= {searching? "loading" : ""}   //loading during searching
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
              defaultValue={q}
              onChange={(event) => {
                const isFirstSearch = q == null;
                submit(event.currentTarget.form, {replace: !isFirstSearch});  //if it is not first search so replace it
              }} 
             // onChange={(event) => {submit(event.currentTarget.form);}}  //it make search history 
            />
            <div id="search-spinner" aria-hidden hidden={!searching} />
            <div className="sr-only" aria-live="polite"></div>
          </Form>
          <Form method="post">
            <button type="submit">New</button>
          </Form>
        </div>
        <nav>
          {contacts.length ? (
            <ul>
              {contacts.map((contact) => (
                <li key={contact.id}>
                  <NavLink
                    to={`contacts/${contact.id}`}
                    className={({ isActive, isPending }) =>
                      isActive ? "active" : isPending ? "pending" : ""
                    }
                  >
                    {contact.first || contact.last ? (
                      <>
                        {contact.first} {contact.last}
                      </>
                    ) : (
                      <i>No Name</i>
                    )}{" "}
                    {contact.favorite && <span>★</span>}
                  </NavLink>
                </li>
              ))}
            </ul>
          ) : (
            <p>
              <i>No Contacts</i>
            </p>
          )}
        </nav>
      </div>
      <div
        id="detail"
        className={navigation.state === "loading" ? "loading" : 0}
      >
        <Outlet /> {/* Child routes display here */}
      </div>
    </>
  );
}
