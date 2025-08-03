// pages/Dashboard.tsx
import '../styles.css';
import ModelEvaluationWidget from '../components/WidgetCard';

const evaluationMetrics = [
  { label: 'Accuracy', value: 0.923 },
  { label: 'Precision', value: 0.887 },
  { label: 'Recall', value: 0.901 },
  { label: 'F1 Score', value: 0.894 }
];

function Dashboard() {
  return (
    <div className="page-container">
      <ModelEvaluationWidget
        title="📊 Multimodal Training Logs"
        metrics={evaluationMetrics}
      />
    </div>
  );
}

export default Dashboard; // ✅ Add this line!