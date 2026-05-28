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
    if (!mileage || !detail) return;

    const newService = {
      mileage,
      detail,
      date: new Date().toLocaleDateString(),
    };

    const updated = [...services, newService].sort(
  (a, b) => Number(a.mileage) - Number(b.mileage)
);

    setServices(updated);

    localStorage.setItem("services", JSON.stringify(updated));

    setMileage("");
    setDetail("");
  };

  return (
    <div
      style={{
        background: "#ee2525",
        minHeight: "100vh",
        color: "white",
        padding: 20,
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <img
          src="/logo.png"
          alt="logo"
          style={{
            width: 120,
            marginBottom: 10,
          }}
        />

        <h1>Motorcycle Service</h1>
      </div>

      <div
        style={{
          background: "#1e1e1e",
          padding: 20,
          borderRadius: 15,
          marginTop: 20,
        }}
      >
        <input
          type="number"
          placeholder="เลขไมล์"
          value={mileage}
          onChange={(e) => setMileage(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            marginBottom: 10,
          }}
        />

        <textarea
          placeholder="ทำอะไรบ้าง"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            height: 100,
          }}
        />

        <button
          onClick={saveService}
          style={{
            width: "100%",
            padding: 15,
            marginTop: 15,
            borderRadius: 10,
            border: "none",
            background: "#ff3b30",
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          บันทึก Service
        </button>
      </div>

      <h2 style={{ marginTop: 30 }}>ประวัติ</h2>

      {services.map((item, index) => (
  <div
    key={index}
    style={{
      background: "white",
      padding: 10,
      borderRadius: 10,
      marginBottom: 8,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    }}
  >
    <div>
      <div
        style={{
          fontSize: 18,
          fontWeight: "bold",
        }}
      >
        {item.mileage} km
      </div>

      <div
        style={{
          fontSize: 14,
          color: "#666",
          marginTop: 3,
        }}
      >
        {item.detail}
      </div>

      <div
        style={{
          fontSize: 12,
          color: "#999",
          marginTop: 3,
        }}
      >
        {item.date}
      </div>
    </div>

    <button
      onClick={() => {
        const updated = services.filter(
          (_, i) => i !== index
        );

        setServices(updated);

        localStorage.setItem(
          "services",
          JSON.stringify(updated)
        );
      }}
      style={{
        background: "#ff3b30",
        border: "none",
        color: "white",
        padding: "6px 10px",
        borderRadius: 8,
        fontSize: 12,
      }}
    >
      ลบ
    </button>
  </div>
))}
>
  >
    <h3 style={{ margin: 0 }}>
  {item.mileage} km
</h3>

    <p
  style={{
    marginTop: 8,
    marginBottom: 8,
    color: "#555",
  }}
>
  {item.detail}
</p>

    <small style={{ color: "#aaa" }}>
      {item.date}
    </small>

    <br /><br />

    <button
      onClick={() => {
        const updated = services.filter(
          (_, i) => i !== index
        );

        setServices(updated);

        localStorage.setItem(
          "services",
          JSON.stringify(updated)
        );
      }}
      style={{
        background: "#111",
        border: "none",
        color: "white",
        padding: "6px 12px",
        borderRadius: 10,
      }}
    >
      ลบ
    </button>
  </div>
))}
    </div>
  );
}

export default App;