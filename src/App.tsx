import { useState } from "react";
import "./App.css";
import { CarSpecification } from "./components/car";
import { Dropdown } from "./components/dropdown";
import { colors, SpecificationList } from "./data";

function App() {
  const [addSpecification, setAddSpecification] = useState(false);
  const [carList, setCarList] = useState<string[]>([]);
  const [carSpecifications, setCarSpecifications] = useState({});
  const [airSuspension, setAirSuspension] = useState(false);
  const [signatureHood, setSignatureHood] = useState("");

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(event);
    for (let i of event.target) {
      console.log(i);
      if (i.getAttribute("name") === "name") {
        setCarList([...carList, i.value]);
      }
      if (i.getAttribute("name") === "item") {
        let obName = i.getAttribute("id");
        setCarSpecifications({ ...carSpecifications, [obName]: i.value });
      }
      if (i.getAttribute("type") === "checkbox") {
        setAirSuspension(i.value);
      }
      if (i.getAttribute("name") === "hood") {
        setSignatureHood(i.value);
      }
    }
    setAddSpecification(false);
  };

  const viewSpecificantions = () => {
    let list = [];
    for (let i in carSpecifications) {
      list.push(
        // <div className="specification-list" key={i}>
        //   <input
        //     id={i}
        //     type="text"
        //     name="item"
        //     className="item-name"
        //     required
        //   />
        //   <label className="label-name">
        //     <span className="content-name">{i}</span>
        //   </label>
        // </div>
        <Dropdown placeHolder={i} options={colors} isSearchable key={i} />
      );
    }
    return list;
  };

  const addSpecificationItem = () => {
    let item = prompt("Please enter specification name:");
    setCarSpecifications({ ...carSpecifications, [item as string]: "" });
  };

  return (
    <div className="App">
      <header className="App-header">Car Specification</header>
      <main className="App-main">
        {!addSpecification ? (
          <>
            <form onSubmit={handleSubmit}>
              {/* <div className="car-name-input">
                <input type="text" name="name" className="car-name" required />
                <label className="label-name">
                  <span className="content-name">Name of specification</span>
                </label>
              </div> */}
              <div className="list-panel">
                {SpecificationList.map((list) => (
                  <Dropdown
                    placeHolder={list.label}
                    options={list.value}
                    isSearchable
                    key={list.label}
                  />
                ))}
                {viewSpecificantions()}
              </div>
              {/* <div className="air-check">
                <input type="checkbox" id="" />
                <label>Air suspension</label>
              </div>
              <div className="hood-input">
                <input type="text" name="hood" className="hood-name" required />
                <label className="label-name">
                  <span className="content-name">Signature on hood</span>
                </label>
              </div> */}
              <div className="btn-group">
                <input
                  type="button"
                  value="+ new configuration option"
                  onClick={addSpecificationItem}
                />
                <input type="submit" value="Save" />
              </div>
            </form>
          </>
        ) : (
          <>
            {carList.map((car) => (
              <CarSpecification
                title={car}
                items={carSpecifications}
                air={airSuspension}
                hood={signatureHood}
                key={car}
              />
            ))}
            <button
              className="add-specification"
              onClick={() => setAddSpecification(true)}
            >
              + Make new specification
            </button>
          </>
        )}
      </main>
    </div>
  );
}

export default App;
