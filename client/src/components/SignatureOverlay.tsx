import { useState } from "react";

type Props = {
  onDrop: (x: number, y: number) => void;
};

const SignatureOverlay = ({ onDrop }: Props) => {
  const [signatures, setSignatures] = useState<{ x: number; y: number }[]>([]);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Update UI
    setSignatures([...signatures, { x, y }]);

    // Trigger backend save
    onDrop(x, y);

    setDragging(false);
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      className="relative w-full h-[500px] border border-blue-300 dark:border-blue-700"
    >
      {/* Visual Drag Overlay */}
      {dragging && (
        <div className="absolute inset-0 bg-blue-100/70 dark:bg-blue-900/70 flex items-center justify-center text-blue-600 dark:text-blue-400 font-semibold">
          Drop to place signature
        </div>
      )}

      {/* Signature Boxes */}
      {signatures.map((sig, idx) => (
        <div
          key={idx}
          className="absolute w-32 h-10 bg-green-400 dark:bg-green-600 text-white text-sm flex items-center justify-center rounded"
          style={{ top: sig.y, left: sig.x }}
        >
          Signature
        </div>
      ))}
    </div>
  );
};

export default SignatureOverlay;
