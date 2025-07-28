import React, { useState } from 'react'

const App = () => {
  const [doorHeight, setDoorHeight] = useState(7)
  const [drumType, setDrumType] = useState('400-8')
  const [turns, setTurns] = useState(0)

  const calculateTurns = () => {
    let baseTurns = parseFloat(doorHeight)
    if (drumType === '400-8') baseTurns += 0.625
    setTurns(baseTurns.toFixed(3))
  }

  return (
    <div className="max-w-xl mx-auto p-4 text-center">
      <h1 className="text-2xl font-bold mb-4">Garage Spring Calculator</h1>
      <div className="mb-2">
        <label className="mr-2">Door Height (ft):</label>
        <input type="number" value={doorHeight} onChange={e => setDoorHeight(e.target.value)} className="border p-1" />
      </div>
      <div className="mb-2">
        <label className="mr-2">Drum Type:</label>
        <select value={drumType} onChange={e => setDrumType(e.target.value)} className="border p-1">
          <option value="400-8">400-8 (Standard)</option>
          <option value="HighLift">High-Lift</option>
        </select>
      </div>
      <button onClick={calculateTurns} className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Calculate Turns</button>
      <div className="mt-4 text-lg font-semibold">Required Turns: {turns}</div>
    </div>
  )
}

export default App