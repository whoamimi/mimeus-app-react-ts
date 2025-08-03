// src/components/WidgetCard.tsx
import React, { useEffect, useState } from 'react';
import '../styles/DashboardWidget.css';

interface Metric {
  label: string;
  value: number; // raw 0–1 score
}

interface ModelEvaluationWidgetProps {
  title: string;
  metrics: Metric[];
}

const ModelEvaluationWidget: React.FC<ModelEvaluationWidgetProps> = ({ title, metrics }) => {
  const [animatedValues, setAnimatedValues] = useState<number[]>(metrics.map(() => 0));

  useEffect(() => {
    const animationDuration = 1000;
    const steps = 30;

    metrics.forEach((metric, index) => {
      const target = metric.value;
      let current = 0;
      const increment = target / steps;
      let frame = 0;

      const animate = () => {
        if (frame <= steps) {
          current += increment;
          setAnimatedValues((prev) => {
            const copy = [...prev];
            copy[index] = Math.min(current, target);
            return copy;
          });
          frame++;
          requestAnimationFrame(animate);
        }
      };

      animate();
    });
  }, [metrics]);

  return (
    <div className="page-container">
      <h1 className="widget-title">{title}</h1>
      <div className="metric-grid">
        {metrics.map((metric, index) => (
          <div key={index} className="metric-item">
            <div className="metric-info">
              <span className="metric-label">{metric.label}</span>
              <span className="metric-value">
                {(animatedValues[index] * 100).toFixed(1)}%
              </span>
              <div className="metric-bar-bg">
                <div
                  className="metric-bar-fill"
                  style={{ width: `${animatedValues[index] * 100}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ModelEvaluationWidget;