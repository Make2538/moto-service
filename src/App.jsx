import { useEffect, useState } from "react";

function App() {
  const [services, setServices] = useState([]);
  const [mileage, setMileage] = useState("");
  const [detail, setDetail] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("services");
    if (data) {
      setServices(JSON.parse(data));
    }
  }, []);

  const saveService = () => {
    const newService = {
      mileage,
      detail,
      date: new Date().toLocaleDateString(),
    };

    const updated = [newService, ...services];

    setServices(updated);

    localStorage.setItem("services", JSON.stringify(updated));

    setMileage("");
    setDetail("");
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>ประวัติ Service รถ</h1>

      <input
        type="number"
        placeholder="เลขไมล์"
        value={mileage}
        onChange={(e) => setMileage(e.target.value)}
      />

      <br /><br />

      <textarea
        placeholder="ทำอะไรบ้าง"
        value={detail}
        onChange={(e) => setDetail(e.target.value)}
      />

      <br /><br />

      <button onClick={saveService}>
        บันทึก
      </button>

      <hr />

      {services.map((item, index) => (
        <div key={index}>
          <h3>{item.mileage} km</h3>
          <p>{item.detail}</p>
          <small>{item.date}</small>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default App;