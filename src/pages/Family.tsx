// TODO: add weight callback to Lightning Studio API - ngrok 

import React, { useRef, useEffect } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

const Family: React.FC = () => {
  const fgRef = useRef<any>();
  const startTimeRef = useRef<number>(Date.now());

  // Define node colors
  const friendColor = '#ffffff';
  const familyColor = '#81c784';
  const buddyColor = '#5ad3e9';
  const userColor = '#ffc107';

  // Raw graph data
  const rawData = {
    nodes: [
      { id: 'activator', group: 'user', name: 'Mimi', color: userColor, fx: 5, fy: 0 },
      { id: 'buddy', group: 'agent', name: 'Mime Buddy', color: buddyColor, fx: -5, fy: 0 },
      { id: 'mom', group: 'family', name: 'Mom', color: familyColor },
      { id: 'dad', group: 'family', name: 'Dad', color: familyColor },
      { id: 'sister', group: 'family', name: 'Sister', color: familyColor },
      { id: 'uncle', group: 'family', name: 'Uncle Joe', color: familyColor },
      { id: 'alice', group: 'friend', name: 'Alice', color: friendColor },
      { id: 'bob', group: 'friend', name: 'Bob', color: friendColor },
      { id: 'carla', group: 'friend', name: 'Carla', color: friendColor },
      { id: 'dave', group: 'friend', name: 'Dave', color: friendColor },
      { id: 'mentor', group: 'agent', name: 'Leo', color: friendColor }
    ],
    links: [
      { source: 'activator', target: 'buddy', weight: 10 },
      { source: 'activator', target: 'mom', weight: 2 },
      { source: 'activator', target: 'dad', weight: 2 },
      { source: 'activator', target: 'sister', weight: 3 },
      { source: 'activator', target: 'uncle', weight: 1 },
      { source: 'activator', target: 'alice', weight: 8 },
      { source: 'activator', target: 'bob', weight: 7 },
      { source: 'activator', target: 'carla', weight: 5 },
      { source: 'activator', target: 'dave', weight: 6 },
      { source: 'buddy', target: 'alice', weight: 3 },
      { source: 'buddy', target: 'bob', weight: 2 },
      { source: 'mentor', target: 'activator', weight: 4 },
      { source: 'mentor', target: 'buddy', weight: 6 },
      { source: 'sister', target: 'carla', weight: 2 },
      { source: 'bob', target: 'dave', weight: 1 }
    ]
  };

  // Compute total weight per node
  const nodeWeightMap: Record<string, number> = {};
  rawData.links.forEach(({ source, target, weight }) => {
    nodeWeightMap[source as string] = (nodeWeightMap[source as string] || 0) + weight;
    nodeWeightMap[target as string] = (nodeWeightMap[target as string] || 0) + weight;
  });

  // Normalize by buddy's weight (or max in general)
  const baseWeight = nodeWeightMap['buddy'] || Math.max(...Object.values(nodeWeightMap));
  const maxVisualSize = 1;
  const minVisualSize = 2;

  const data = {
    ...rawData,
    nodes: rawData.nodes.map((n) => {
      const relWeight = (nodeWeightMap[n.id] || 1) / baseWeight;
      const scaledSize = minVisualSize + relWeight * (maxVisualSize - minVisualSize);
      return {
        ...n,
        size: Math.max(minVisualSize, Math.min(maxVisualSize, scaledSize))
      };
    })
  };

  // Auto-center and zoom
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (fgRef.current) fgRef.current.zoomToFit(10);
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className="page-container"
    >
      <h1>Social Network</h1>
      <p
        style={{
          fontSize: '0.7rem',
          color: '#cccccc',
          textAlign: 'left',
          maxWidth: '640px',
          margin: '0 auto 1rem auto',
          lineHeight: '1.1'
        }}
      >
        Each connection (or "edge") between the activator and other entities—such as friends, family, or agents—has a
        <em> weight</em> representing the strength, frequency, or importance of that relationship. Higher weights suggest
        more meaningful or frequent interactions, which influence the agent's attention, prioritization, and responsiveness.
        For example, a strong link to "Mom" might lead the agent to give more emotional weight or memory to her inputs, while
        weaker ties might be less influential in shaping the agent’s behaviors. This dynamic weighting helps the agent adapt
        more realistically to Mimir personal social graph.
      </p>
  
    <ForceGraph2D
    ref={fgRef}
    graphData={data}
    backgroundColor="transparent"
    linkDirectionalParticles={2}
    linkDirectionalParticleSpeed={0.003}
    linkDirectionalParticleWidth={1}
    linkWidth={(link) => (link.weight ? link.weight / 3 : 1)}
    linkColor={() => '#ffffff44'}
    nodeCanvasObject={(node, ctx, globalScale) => {
        if (typeof node.x !== 'number' || typeof node.y !== 'number') return;

        const now = Date.now();
        const elapsed = (now - startTimeRef.current) / 1000;
        const pulse = 0.5 + Math.sin(elapsed * 2 + node.id.length) * 0.5;

        const label = node.name;
        const fontSize = 14 / globalScale;
        const radius = (node as any).size || 4;
        const glowRadius = radius + 6 * pulse;

        // Outer glow
        const gradient = ctx.createRadialGradient(
        node.x, node.y, radius * 0.2,
        node.x, node.y, glowRadius
        );
        gradient.addColorStop(0, node.color || '#ffffff');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.beginPath();
        ctx.fillStyle = gradient;
        ctx.arc(node.x, node.y, glowRadius, 0, 2 * Math.PI);
        ctx.fill();

        // Orb core
        ctx.beginPath();
        ctx.fillStyle = node.color || '#ffffff';
        ctx.shadowColor = node.color || '#ffffff';
        ctx.shadowBlur = 25;
        ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = `${fontSize}px Droid Sans Mono`;
        const textWidth = ctx.measureText(label).width;
        ctx.fillText(label, node.x - textWidth / 2, node.y + radius + 2);
    }}
    />
    </div>
  );
};

export default Family;