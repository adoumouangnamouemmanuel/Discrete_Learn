// import React from "react";

interface VennDiagramProps {
  type:
    | "universal"
    | "singleton"
    | "disjoint"
    | "commutative"
    | "associative"
    | "distributive"
    | "negation"
    | "idempotent"
    | "demorgan";
}

export default function VennDiagram({ type }: VennDiagramProps) {
  const renderDiagram = () => {
    switch (type) {
      case "universal":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect x="0" y="0" width="200" height="200" fill="#f0f0f0" />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="#3b82f6"
              fillOpacity="0.3"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text
              x="100"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              U
            </text>
          </svg>
        );
      case "singleton":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect x="0" y="0" width="200" height="200" fill="#f0f0f0" />
            <circle
              cx="100"
              cy="100"
              r="40"
              fill="#3b82f6"
              fillOpacity="0.3"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <text
              x="100"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              x
            </text>
          </svg>
        );
      case "disjoint":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect x="0" y="0" width="200" height="200" fill="#f0f0f0" />
            <circle
              cx="50"
              cy="100"
              r="45"
              fill="#3b82f6"
              fillOpacity="0.3"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <circle
              cx="150"
              cy="100"
              r="45"
              fill="#ef4444"
              fillOpacity="0.3"
              stroke="#ef4444"
              strokeWidth="2"
            />
            <text
              x="70"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              A
            </text>
            <text
              x="130"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              B
            </text>
          </svg>
        );
      case "commutative":
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full">
            <rect x="0" y="0" width="200" height="200" fill="#f0f0f0" />
            <circle
              cx="80"
              cy="100"
              r="60"
              fill="#3b82f6"
              fillOpacity="0.3"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <circle
              cx="120"
              cy="100"
              r="60"
              fill="#ef4444"
              fillOpacity="0.3"
              stroke="#ef4444"
              strokeWidth="2"
            />
            <text
              x="50"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              A
            </text>
            <text
              x="150"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              B
            </text>
            <text
              x="100"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              A ∩ B
            </text>
          </svg>
        );
      case "associative":
        return (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <rect x="0" y="0" width="300" height="200" fill="#f0f0f0" />
            <circle
              cx="100"
              cy="100"
              r="60"
              fill="#3b82f6"
              fillOpacity="0.3"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <circle
              cx="150"
              cy="100"
              r="60"
              fill="#ef4444"
              fillOpacity="0.3"
              stroke="#ef4444"
              strokeWidth="2"
            />
            <circle
              cx="200"
              cy="100"
              r="60"
              fill="#22c55e"
              fillOpacity="0.3"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <text
              x="70"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              A
            </text>
            <text
              x="150"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              B
            </text>
            <text
              x="230"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              C
            </text>
          </svg>
        );
      case "distributive":
        return (
          <svg viewBox="0 0 300 200" className="w-full h-full">
            <rect x="0" y="0" width="300" height="200" fill="#f0f0f0" />
            <circle
              cx="100"
              cy="100"
              r="80"
              fill="#3b82f6"
              fillOpacity="0.3"
              stroke="#3b82f6"
              strokeWidth="2"
            />
            <circle
              cx="180"
              cy="70"
              r="50"
              fill="#ef4444"
              fillOpacity="0.3"
              stroke="#ef4444"
              strokeWidth="2"
            />
            <circle
              cx="180"
              cy="130"
              r="50"
              fill="#22c55e"
              fillOpacity="0.3"
              stroke="#22c55e"
              strokeWidth="2"
            />
            <text
              x="70"
              y="100"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              A
            </text>
            <text
              x="200"
              y="70"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              B
            </text>
            <text
              x="200"
              y="130"
              textAnchor="middle"
              dominantBaseline="middle"
              fill="black"
            >
              C
            </text>
          </svg>
        );
      default:
        return null;
    }
  };

  return <div className="w-full max-w-md mx-auto">{renderDiagram()}</div>;
}
