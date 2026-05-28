import { useEffect, useState } from "react";

function App() {
  const [services, setServices] = useState([]);
  const [mileage, setMileage] = useState("");
  const [detail, setDetail] = useState("");
  const [currentMileage, setCurrentMileage] =
    useState("");
  const [editIndex, setEditIndex] =
    useState(null);

  useEffect(() => {
    const data =
      localStorage.getItem("services");

    if (data) {
      setServices(JSON.parse(data));
    }

    const current =
      localStorage.getItem(
        "currentMileage"
      );

    if (current) {
      setCurrentMileage(current);
    }
  }, []);

  const saveService = () => {
    if (!mileage || !detail) return;

    const newService = {
      mileage,
      detail,
      date: new Date().toLocaleDateString(),
    };

    let updated = [];

    if (editIndex !== null) {
      updated = [...services];

      updated[editIndex] = newService;

      setEditIndex(null);
    } else {
      updated = [...services, newService];
    }

    updated.sort(
      (a, b) =>
        Number(a.mileage) -
        Number(b.mileage)
    );

    setServices(updated);

    localStorage.setItem(
      "services",
      JSON.stringify(updated)
    );

    setMileage("");
    setDetail("");
  };

  const deleteService = (index) => {
    const updated = services.filter(
      (_, i) => i !== index
    );

    setServices(updated);

    localStorage.setItem(
      "services",
      JSON.stringify(updated)
    );
  };

  const editService = (index) => {
    setMileage(services[index].mileage);

    setDetail(services[index].detail);

    setEditIndex(index);
  };

  const saveCurrentMileage = (value) => {
    setCurrentMileage(value);

    localStorage.setItem(
      "currentMileage",
      value
    );
  };

  const latestService =
    services.length > 0
      ? services[services.length - 1]
      : null;

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
        
        <h1>Service Forza350</h1>
      </div>

      <div
        style={{
          background: "#1e1e1e",
          padding: 20,
          borderRadius: 15,
          marginTop: 20,
          marginBottom: 20,
        }}
      >
        <h3>เลขไมล์ปัจจุบัน</h3>

        <input
          type="number"
          placeholder="เลขไมล์ปัจจุบัน"
          value={currentMileage}
          onChange={(e) =>
            saveCurrentMileage(
              e.target.value
            )
          }
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            marginBottom: 15,
            boxSizing: "border-box",
          }}
        />

        {latestService && (
          <div
            style={{
              marginBottom: 15,
              color: "#ddd",
            }}
          >
            ล่าสุดทำที่{" "}
            {latestService.mileage} km

            <br />

            ใช้งานไปแล้ว{" "}
            {Number(currentMileage) -
              Number(
                latestService.mileage
              )}{" "}
            km
          </div>
        )}

        <input
          type="number"
          placeholder="เลขไมล์ตอน Service"
          value={mileage}
          onChange={(e) =>
            setMileage(e.target.value)
          }
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            marginBottom: 10,
            boxSizing: "border-box",
          }}
        />

        <textarea
          placeholder="ทำอะไรบ้าง"
          value={detail}
          onChange={(e) =>
            setDetail(e.target.value)
          }
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            border: "none",
            height: 80,
            boxSizing: "border-box",
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
            background:
              editIndex !== null
                ? "#ff9500"
                : "#ff3b30",
            color: "white",
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {editIndex !== null
            ? "บันทึกการแก้ไข"
            : "บันทึก Service"}
        </button>
      </div>

      <h2 style={{ marginBottom: 15 }}>
        ประวัติ
      </h2>

      {services.map((item, index) => (
        <div
          key={index}
          style={{
            background: "white",
            padding: 10,
            borderRadius: 10,
            marginBottom: 8,
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            boxShadow:
              "0 1px 4px rgba(0,0,0,0.08)",
          }}
        >
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: "#111",
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

            <div
              style={{
                fontSize: 12,
                color: "#ff3b30",
                marginTop: 4,
                fontWeight: "bold",
              }}
            >
              ผ่านมาแล้ว{" "}
              {Number(currentMileage) -
                Number(
                  item.mileage
                )}{" "}
              km
            </div>
          </div>

          <div
            style={{
              display: "flex",
              gap: 5,
            }}
          >
            <button
              onClick={() =>
                editService(index)
              }
              style={{
                background: "#007aff",
                border: "none",
                color: "white",
                padding: "6px 10px",
                borderRadius: 8,
                fontSize: 12,
              }}
            >
              แก้
            </button>

            <button
              onClick={() =>
                deleteService(index)
              }
              style={{
                background: "#111",
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
        </div>
      ))}
    </div>
  );
}

export default App;