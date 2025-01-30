import { useState } from 'react'
import './Stat.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2'

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
)

function Stat() {
  const timeLabels = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59']

  const [chartData] = useState({
    temperature: {
      labels: timeLabels,
      datasets: [{
        label: 'Temperatura (°C)',
        data: [22, 21, 23, 25, 24, 22, 21],
        borderColor: '#00acc1',
        backgroundColor: 'rgba(0, 172, 193, 0.3)',
        fill: true,
        tension: 0.4
      }]
    },
    humidity: {
      labels: timeLabels,
      datasets: [{
        label: 'Humedad (%)',
        data: [65, 63, 68, 70, 65, 62, 64],
        borderColor: '#4caf50',
        backgroundColor: 'rgba(76, 175, 80, 0.3)',
        fill: true,
        tension: 0.4
      }]
    },
    ph: {
      labels: timeLabels,
      datasets: [{
        label: 'pH',
        data: [6.5, 6.3, 6.4, 6.6, 6.5, 6.4, 6.3],
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255, 152, 0, 0.3)',
        fill: true,
        tension: 0.4
      }]
    },
    ec: {
      labels: timeLabels,
      datasets: [{
        label: 'EC (mS/cm)',
        data: [1.8, 1.7, 1.9, 2.0, 1.9, 1.8, 1.7],
        borderColor: '#9c27b0',
        backgroundColor: 'rgba(156, 39, 176, 0.3)',
        fill: true,
        tension: 0.4
      }]
    }
  })

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#666',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      },
      x: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        }
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  }

  return (
    <div className="sensor-stats-container">      
      <div className="sensor-stats-grid">
        <div className="sensor-stat-card">
          <h2 className="sensor-stat-card-title">Temperatura</h2>
          <div className="sensor-chart-container">
            <Line data={chartData.temperature} options={chartOptions} />
          </div>
        </div>

        <div className="sensor-stat-card">
          <h2 className="sensor-stat-card-title">Humedad</h2>
          <div className="sensor-chart-container">
            <Line data={chartData.humidity} options={chartOptions} />
          </div>
        </div>

        <div className="sensor-stat-card">
          <h2 className="sensor-stat-card-title">pH</h2>
          <div className="sensor-chart-container">
            <Line data={chartData.ph} options={chartOptions} />
          </div>
        </div>

        <div className="sensor-stat-card">
          <h2 className="sensor-stat-card-title">Conductividad Eléctrica</h2>
          <div className="sensor-chart-container">
            <Line data={chartData.ec} options={chartOptions} />
          </div>
        </div><br /><br /><br />
      </div>
    </div>
  )
}

export default Stat