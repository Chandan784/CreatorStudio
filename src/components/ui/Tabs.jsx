import { useState } from "react";

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div>
      <div className="flex border-b">
        {children.map((child) => (
          <button
            key={child.props.value}
            className={`py-2 px-4 font-semibold ${
              activeTab === child.props.value
                ? "border-b-2 border-purple-600 text-purple-600"
                : "text-gray-600"
            }`}
            onClick={() => setActiveTab(child.props.value)}
          >
            {child.props.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {children.find((child) => child.props.value === activeTab)}
      </div>
    </div>
  );
}

export function Tab({ children }) {
  return <div>{children}</div>;
}
