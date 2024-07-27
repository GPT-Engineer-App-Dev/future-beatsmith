import React, { useState, useEffect, useCallback } from 'react';
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Play, Pause, RotateCcw } from "lucide-react";

const Beatmaker = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [tempo, setTempo] = useState(120);
  const [currentStep, setCurrentStep] = useState(0);
  const [grid, setGrid] = useState(Array(8).fill().map(() => Array(8).fill(false)));

  const toggleCell = (row, col) => {
    const newGrid = [...grid];
    newGrid[row][col] = !newGrid[row][col];
    setGrid(newGrid);
  };

  const playSound = useCallback((row) => {
    // In a real implementation, we would play different sounds for each row
    const frequency = 200 + (row * 100); // Simple way to get different pitches
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(audioContext.destination);
    oscillator.start();
    oscillator.stop(audioContext.currentTime + 0.1);
  }, []);

  useEffect(() => {
    let intervalId;
    if (isPlaying) {
      intervalId = setInterval(() => {
        setCurrentStep((prevStep) => {
          const newStep = (prevStep + 1) % 8;
          grid.forEach((row, index) => {
            if (row[newStep]) {
              playSound(index);
            }
          });
          return newStep;
        });
      }, (60 * 1000) / tempo / 2); // Divide by 2 for eighth notes
    }
    return () => clearInterval(intervalId);
  }, [isPlaying, tempo, grid, playSound]);

  const resetGrid = () => {
    setGrid(Array(8).fill().map(() => Array(8).fill(false)));
    setCurrentStep(0);
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <h1 className="text-4xl font-bold text-center mb-6">Futuristic Beatmaker</h1>
      <div className="grid grid-cols-8 gap-2 mb-6">
        {grid.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <Button
              key={`${rowIndex}-${colIndex}`}
              className={`w-full h-16 ${cell ? 'bg-primary' : 'bg-secondary'} ${currentStep === colIndex ? 'border-2 border-accent' : ''}`}
              onClick={() => toggleCell(rowIndex, colIndex)}
            />
          ))
        ))}
      </div>
      <div className="flex items-center justify-center space-x-4">
        <Button onClick={() => setIsPlaying(!isPlaying)}>
          {isPlaying ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
          {isPlaying ? 'Pause' : 'Play'}
        </Button>
        <Button onClick={resetGrid} variant="outline">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset
        </Button>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-sm font-medium">Tempo: {tempo} BPM</span>
        <Slider
          min={60}
          max={240}
          step={1}
          value={[tempo]}
          onValueChange={(value) => setTempo(value[0])}
          className="w-64"
        />
      </div>
    </div>
  );
};

export default Beatmaker;
