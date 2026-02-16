import { useState } from "react";
import type { SkillFile } from "@/lib/mock-data";

const FileViewer = ({ files }: { files: SkillFile[] }) => {
  const [activeFile, setActiveFile] = useState(0);

  return (
    <div className="rounded-lg border border-border bg-card overflow-hidden">
      {/* File tabs */}
      <div className="flex border-b border-border bg-secondary/30 overflow-x-auto">
        {files.map((file, i) => (
          <button
            key={file.name}
            onClick={() => setActiveFile(i)}
            className={`px-4 py-2.5 text-xs font-mono whitespace-nowrap transition-colors border-b-2 ${
              i === activeFile
                ? "border-primary text-primary bg-card"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {file.name}
          </button>
        ))}
      </div>

      {/* File content */}
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-secondary-foreground leading-relaxed">
          <code>{files[activeFile]?.content}</code>
        </pre>
      </div>
    </div>
  );
};

export default FileViewer;
