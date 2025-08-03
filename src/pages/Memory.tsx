import React from 'react';
import '../styles/MemoryTimeline.css';
import '../styles.css'; 

interface Memory {
  id: string;
  timestamp: string;
  summary: string;
  significance: number; // 1 to 10
  relatedToActivator: boolean;
}

const mockMemories: Memory[] = [
  {
    id: '1',
    timestamp: '2025-07-25T10:15:00Z',
    summary: 'Mimi asked about emotional modeling.',
    significance: 4,
    relatedToActivator: true
  },
  {
    id: '2',
    timestamp: '2025-07-30T14:40:00Z',
    summary: 'Watched Star Wars with Mimi. Mimi mentioned she liked the character Darth Vader from Star Wars. I asked her why and she refused to respond.',
    significance: 9,
    relatedToActivator: true
  },
  {
    id: '3',
    timestamp: '2025-08-01T08:22:00Z',
    summary: 'I browsed online for podcast options that would help Mimi sleep better at night.',
    significance: 2,
    relatedToActivator: false
  },
  {
    id: '4',
    timestamp: '2025-08-02T12:00:00Z',
    summary: 'I browsed for common meditation practices to improve Mimi\'s sleep.',
    significance: 4,
    relatedToActivator: false
  },
  {
    id: '5',
    timestamp: '2025-08-03T07:00:00Z',
    summary: 'Mimi said she wanted me to shut the fuck up. According to her Flo App records and her recent mood, it seems plausible that she is on her period.',
    significance: 5,
    relatedToActivator: true
  },
];

const MemoryTimeline: React.FC = () => {
  return (
    <div className="page-container">
      <h2 className="timeline-title">Memory Orbs</h2>
      <div className="timeline">
        {mockMemories.map(memory => (
          <div
            key={memory.id}
            className={`memory-orb ${memory.relatedToActivator ? 'activator' : ''}`}
            style={{
              boxShadow: `0 0 ${memory.significance * 2}px ${memory.relatedToActivator ? '#00e5ff' : '#8884d8'}`,
              width: `${memory.significance * 6 + 20}px`,
              height: `${memory.significance * 6 + 20}px`
            }}
          >
            <div className="tooltip">
              <strong>{new Date(memory.timestamp).toLocaleString()}</strong>
              <br />
              {memory.summary}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemoryTimeline;