import { useState } from "react";

const springOptions = [
  { wireSize: 0.192, id: 1.75, length: 33, cycles: 10000 },
  { wireSize: 0.207, id: 1.75, length: 32, cycles: 15000 },
  { wireSize: 0.218, id: 2.0, length: 31, cycles: 20000 },
  { wireSize: 0.225, id: 2.0, length: 29, cycles: 25000 },
  { wireSize: 0.234, id: 2.0, length: 27, cycles: 30000 },
  { wireSize: 0.243, id: 2.0, length: 25, cycles: 35000 }
];

export default function App() {
  const [doorHeight, setDoorHeight] = useState(84);
  const [doorWeight, setDoorWeight] = useState(150);
  const [drumDiameter, setDrumDiameter] = useState(4);
  const [results, setResults] = useState(null);

  const calculateTension = () => {
    const drumCircumference = Math.PI * drumDiameter;
    const turns = doorHeight / drumCircumference;
    const torqueRequired = doorWeight * (drumDiameter / 2);

    const recommendedSprings = springOptions
      .map((spring) => {
        const ippt = spring.wireSize * spring.id * 10;
        const totalTorque = ippt * turns;
        const difference = Math.abs(totalTorque - torqueRequired);
        return { ...spring, ippt, totalTorque, difference };
      })
      .sort((a, b) => {
        if (b.cycles === a.cycles) return a.difference - b.difference;
        return b.cycles - a.cycles;
      })
      .slice(0, 3);

    setResults({
      turns: turns.toFixed(2),
      torque: torqueRequired.toFixed(2),
      recommendedSprings
    });
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>Garage Door Spring Tension Calculator</h1>

      <div>
        <label>Door Height (inches):</label>
        <input type="number" value={doorHeight} onChange={(e) => setDoorHeight(Number(e.target.value))} />
      </div>

      <div>
        <label>Door Weight (lbs):</label>
        <input type="number" value={doorWeight} onChange={(e) => setDoorWeight(Number(e.target.value))} />
      </div>

      <div>
        <label>Drum Diameter (inches):</label>
        <input type="number" value={drumDiameter} onChange={(e) => setDrumDiameter(Number(e.target.value))} />
      </div>

      <button onClick={calculateTension}>Calculate</button>

      {results && (
        <div style={{ marginTop: 20 }}>
          <p><strong>Recommended Turns:</strong> {results.turns}</p>
          <p><strong>Required Torque:</strong> {results.torque} in-lbs</p>

          <h3>Top Spring Options:</h3>
          <ul>
            {results.recommendedSprings.map((spring, index) => (
              <li key={index}>
                Wire: {spring.wireSize}" | ID: {spring.id}" | Length: {spring.length}" | Cycles: {spring.cycles}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
