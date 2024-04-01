import "./App.css";
import ContactForm from "./component/ContactForm";
import ContactList from "./component/ContactList";

function App() {
  return (
    <div className="container pt-8 pb-8 mx-auto">
      <h1 className="mb-8 text-5xl font-bold text-center">Phone Book</h1>
      <div className="flex flex-row gap-6">
        <div className="basis-1/2">
          <ContactForm />
        </div>
        <div className="border-spacing-8 basis-1/2">
          <ContactList />
        </div>
      </div>
    </div>
  );
}
export default App;
