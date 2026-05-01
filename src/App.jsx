import { useEffect, useMemo, useRef, useState } from "react";

const TABS = [
  { id: "projects", label: "🚀 Project Ideas", icon: "🚀" },
  { id: "scores", label: "📊 Score Table", icon: "📊" },
  { id: "top3", label: "🏆 Top 3 Picks", icon: "🏆" },
  { id: "roadmap", label: "🗺️ Final Boss Roadmap", icon: "🗺️" },
  { id: "ask", label: "💬 Ask Strategist", icon: "💬" },
];

const MOCK_CONTENT = {
  projects: `### PROJECT 1: AI Internship Readiness Radar
1. **Project title**: AI Internship Readiness Radar
2. **One sentence powerful description**: A career intelligence system that audits a student's skills, projects, GitHub, and learning gaps to generate a brutally honest internship readiness plan.
3. **Real world problem solved**: Many CSE students do not know exactly why recruiters ignore them.
4. **Why this matters now**: The internship market is crowded, and generic portfolios are no longer enough.
5. **Main features**: GitHub audit, skill gap analysis, project scoring, weekly roadmap, interview preparation tracker.
6. **AI/ML components**: Resume parsing, project ranking, semantic skill matching, recruiter style scoring.
7. **Full stack components**: React dashboard, backend API, database, authentication, analytics.
8. **Minimum impressive version**: Upload resume, paste GitHub link, receive a ranked improvement plan.
9. **Final boss version**: Public student benchmark platform with anonymized ranking, recruiter insights, and verified progress tracking.

### PROJECT 2: Bangladesh Job Skill Graph
1. **Project title**: Bangladesh Job Skill Graph
2. **One sentence powerful description**: A live system that scrapes and analyzes Bangladeshi internship and entry level job posts to reveal exactly which skills are actually demanded.
3. **Real world problem solved**: Students waste months learning tools that may not match local job demand.
4. **Why this stands out**: It connects AI, data engineering, full stack, and local market insight.
5. **Main features**: Job collection, skill extraction, trend dashboard, gap analysis, personalized learning path.
6. **Final boss version**: A public career intelligence platform for Bangladeshi CSE students.

### PROJECT 3: AI Research Paper Coach
1. **Project title**: AI Research Paper Coach
2. **One sentence powerful description**: A research assistant that helps undergrad students evaluate topic novelty, dataset quality, experiment design, and paper readiness.
3. **Real world problem solved**: Many students choose weak thesis topics without knowing the research risk.
4. **AI components**: Literature comparison, novelty checklist, experiment plan generation, weakness detection.
5. **Minimum impressive version**: Topic input to strict reviewer style evaluation.

### PROJECT 4: Low Resource Medical AI Benchmark
1. **Project title**: Low Resource Medical AI Benchmark
2. **One sentence powerful description**: A benchmark and dashboard for testing medical AI models under low compute and noisy data conditions.
3. **Why it matters**: This fits countries like Bangladesh where compute and data quality are limited.
4. **Advanced features**: Model comparison, explainability, robustness checks, reporting.

### PROJECT 5: Agentic Portfolio Builder
1. **Project title**: Agentic Portfolio Builder
2. **One sentence powerful description**: An AI agent that turns raw student work into polished portfolio case studies, README files, LinkedIn posts, and interview stories.
3. **Risk**: It can look fake if it only generates text and does not connect to real project evidence.
4. **How to make it strong**: Connect GitHub commits, screenshots, architecture diagrams, and measurable progress.`,

  scores: `## Project Scoring Table

| Project | Recruiter Impact | AI Depth | Full Stack Depth | Research Potential | Feasibility | Total |
|---|---:|---:|---:|---:|---:|---:|
| AI Internship Readiness Radar | 9 | 8 | 8 | 6 | 8 | 39 |
| Bangladesh Job Skill Graph | 8 | 7 | 9 | 6 | 9 | 39 |
| AI Research Paper Coach | 8 | 9 | 7 | 9 | 7 | 40 |
| Low Resource Medical AI Benchmark | 7 | 9 | 6 | 10 | 5 | 37 |
| Agentic Portfolio Builder | 8 | 8 | 8 | 5 | 8 | 37 |

### Ranking
1. **AI Research Paper Coach** — strongest research positioning.
2. **AI Internship Readiness Radar** — strongest personal career usefulness.
3. **Bangladesh Job Skill Graph** — strongest local market relevance.
4. **Low Resource Medical AI Benchmark** — high research value but risky.
5. **Agentic Portfolio Builder** — useful but must avoid looking like a wrapper.`,

  top3: `## Top 3 Picks

### 1. AI Research Paper Coach
**WHY THIS PROJECT MADE TOP 3**: It directly supports your thesis and research goal. It can prove LLM pipeline design, evaluation thinking, and product sense.

**MINIMUM IMPRESSIVE VERSION**: A user enters a topic, dataset, and method idea. The system gives a strict novelty review, feasibility score, experiment plan, and failure risks.

**RED FLAGS TO AVOID**: Do not make it a simple chatbot. Do not claim publication guarantees. Do not ignore real paper citations in the final version.

### 2. AI Internship Readiness Radar
**WHY THIS PROJECT MADE TOP 3**: It solves your own problem and many students' problem. Recruiters like projects that are useful, complete, and clearly explained.

**MINIMUM IMPRESSIVE VERSION**: Resume plus GitHub analysis with a personalized 30 day improvement plan.

### 3. Bangladesh Job Skill Graph
**WHY THIS PROJECT MADE TOP 3**: It has strong Bangladesh relevance and can become a public data product.

**MINIMUM IMPRESSIVE VERSION**: Scrape 200 to 500 job posts, extract skills, show trends, and recommend what students should learn.

## FINAL RECOMMENDATION
Start with **AI Internship Readiness Radar** because it is feasible, useful for you, and can later connect to the other two ideas.`,

  roadmap: `## Final Boss Roadmap

### 1. Final Project Vision
Build an AI powered career intelligence platform for CSE students that audits their current profile and tells them exactly what to build, learn, fix, and show publicly.

### 2. Architecture Diagram

[User]
  ↓
[React Frontend]
  ↓
[Backend API]
  ↓
[Profile Analyzer Service]
  ↓
[LLM Strategy Engine]
  ↓
[Database + Report Generator]
  ↓
[Dashboard + Roadmap + Portfolio Plan]

### 3. MVP Scope
1. Resume text input
2. GitHub profile input
3. Skill selection
4. AI generated audit report
5. 30 day roadmap
6. Project recommendation list

### 4. API Route Plan
1. POST /api/profile/analyze
2. POST /api/github/audit
3. POST /api/roadmap/generate
4. POST /api/projects/rank
5. GET /api/reports/:id
6. POST /api/chat
7. POST /api/progress/day
8. GET /api/progress/summary
9. POST /api/cv/build
10. GET /api/dashboard

### 5. 12 Week Timeline
1. Week 1: Requirements, wireframe, database plan
2. Week 2: React layout and routing
3. Week 3: Backend API setup
4. Week 4: Resume analyzer
5. Week 5: GitHub analyzer
6. Week 6: LLM report generator
7. Week 7: Roadmap generator
8. Week 8: Progress tracker
9. Week 9: CV builder
10. Week 10: Testing and polish
11. Week 11: README, demo video, portfolio case study
12. Week 12: Public launch and LinkedIn posts`,
};

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return map[char];
  });
}

function applyInlineMarkdown(value) {
  return value
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/(^|[^*])\*(?!\s)([^*\n]+?)\*(?!\*)/g, "$1<em>$2</em>");
}

function splitTableRow(line) {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((cell) => cell.trim());
}

function isTableSeparator(line) {
  return /^\s*\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?\s*$/.test(line);
}

function renderTable(rows) {
  if (rows.length < 2 || !isTableSeparator(rows[1])) {
    return rows.map(renderLine).join("");
  }

  const headers = splitTableRow(rows[0]);
  const bodyRows = rows.slice(2).map(splitTableRow);

  const headerHtml = headers.map((header) => `<th>${applyInlineMarkdown(header)}</th>`).join("");
  const bodyHtml = bodyRows
    .map((row) => `<tr>${row.map((cell) => `<td>${applyInlineMarkdown(cell)}</td>`).join("")}</tr>`)
    .join("");

  return `<div class="table-scroll"><table><thead><tr>${headerHtml}</tr></thead><tbody>${bodyHtml}</tbody></table></div>`;
}

function renderLine(line) {
  const trimmed = line.trim();
  if (!trimmed) return "";

  if (/^###\s+/.test(trimmed)) {
    return `<h3 class="proj-h3">${applyInlineMarkdown(trimmed.replace(/^###\s+/, ""))}</h3>`;
  }

  if (/^##\s+/.test(trimmed)) {
    return `<h2 class="proj-h2">${applyInlineMarkdown(trimmed.replace(/^##\s+/, ""))}</h2>`;
  }

  const numbered = trimmed.match(/^(\d+)\.\s+(.*)$/);
  if (numbered) {
    return `<p><span class="num-item">${numbered[1]}.</span> ${applyInlineMarkdown(numbered[2])}</p>`;
  }

  if (/^-\s+/.test(trimmed)) {
    return `<p><span class="bullet">▸</span> ${applyInlineMarkdown(trimmed.replace(/^-\s+/, ""))}</p>`;
  }

  return `<p>${applyInlineMarkdown(trimmed)}</p>`;
}

function markdownToHtml(rawText) {
  const safeText = escapeHtml(rawText);
  const lines = safeText.split("\n");
  const blocks = [];
  let tableBuffer = [];

  const flushTable = () => {
    if (tableBuffer.length) {
      blocks.push(renderTable(tableBuffer));
      tableBuffer = [];
    }
  };

  for (const line of lines) {
    const looksLikeTableLine = line.trim().startsWith("|") && line.includes("|");
    if (looksLikeTableLine) {
      tableBuffer.push(line);
      continue;
    }

    flushTable();
    blocks.push(renderLine(line));
  }

  flushTable();
  return blocks.join("");
}

function StreamingText({ text, isStreaming }) {
  const endRef = useRef(null);
  const html = useMemo(() => markdownToHtml(text), [text]);

  useEffect(() => {
    if (isStreaming && endRef.current) {
      endRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [text, isStreaming]);

  return (
    <div className="stream-container">
      <div className="stream-text" dangerouslySetInnerHTML={{ __html: html }} />
      {isStreaming && <span className="cursor-blink">▊</span>}
      <div ref={endRef} />
    </div>
  );
}

function ChatMessage({ role, content }) {
  const html = useMemo(() => markdownToHtml(content), [content]);

  return (
    <div className={`chat-msg ${role}`}>
      <div className="chat-label">{role === "user" ? "YOU" : "STRATEGIST"}</div>
      <div className="chat-body" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState("projects");
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState({});
  const [streamText, setStreamText] = useState({});
  const [chatHistory, setChatHistory] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [chatStream, setChatStream] = useState("");
  const chatEndRef = useRef(null);

  function simulateTyping(tabId, text) {
    setLoading((previous) => ({ ...previous, [tabId]: true }));
    setStreamText((previous) => ({ ...previous, [tabId]: "" }));

    let index = 0;
    const timer = window.setInterval(() => {
      index += 14;
      setStreamText((previous) => ({ ...previous, [tabId]: text.slice(0, index) }));

      if (index >= text.length) {
        window.clearInterval(timer);
        setContent((previous) => ({ ...previous, [tabId]: text }));
        setStreamText((previous) => ({ ...previous, [tabId]: "" }));
        setLoading((previous) => ({ ...previous, [tabId]: false }));
      }
    }, 8);
  }

  function fetchSection(tabId) {
    if (content[tabId] || loading[tabId]) return;
    simulateTyping(tabId, MOCK_CONTENT[tabId] || "Preview content is not available for this tab.");
  }

  useEffect(() => {
    fetchSection("projects");
  }, []);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [chatHistory, chatStream, chatLoading]);

  function handleTabClick(tabId) {
    setActiveTab(tabId);
    if (tabId !== "ask") fetchSection(tabId);
  }

  async function sendChat(customMessage) {
  const userMsg = String(customMessage ?? chatInput).trim();
  if (!userMsg || chatLoading) return;

  setChatInput("");

  const newHistory = [...chatHistory, { role: "user", content: userMsg }];
  setChatHistory(newHistory);
  setChatLoading(true);
  setChatStream("");

  try {
    const apiResponse = await fetch("/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: userMsg }),
    });

    const data = await apiResponse.json();

    if (!apiResponse.ok) {
      throw new Error(data.error || "Something went wrong.");
    }

    const responseText = data.reply || "No reply received.";

    let index = 0;
    const timer = window.setInterval(() => {
      index += 12;
      setChatStream(responseText.slice(0, index));

      if (index >= responseText.length) {
        window.clearInterval(timer);
        setChatHistory([...newHistory, { role: "assistant", content: responseText }]);
        setChatStream("");
        setChatLoading(false);
      }
    }, 6);
  } catch (error) {
    const errorMessage = `## Error

The AI chat failed.

Possible reasons:
1. Gemini API key is missing.
2. The API key is wrong.
3. The backend route is not running.
4. The free limit is reached.

Technical message: **${error.message}**`;

    setChatHistory([...newHistory, { role: "assistant", content: errorMessage }]);
    setChatStream("");
    setChatLoading(false);
  }
}
const displayText = (tabId) => content[tabId] || streamText[tabId] || "";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --bg: #0a0a0f;
          --surface: #111118;
          --surface2: #1a1a24;
          --border: #2a2a3a;
          --accent: #ff6b35;
          --accent2: #00d4ff;
          --accent3: #a855f7;
          --text: #e8e8f0;
          --muted: #6b6b80;
          --success: #22c55e;
        }

        body {
          background: var(--bg);
          color: var(--text);
          font-family: 'JetBrains Mono', monospace;
          min-height: 100vh;
        }

        .app {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 16px 40px;
        }

        .header {
          padding: 32px 0 24px;
          border-bottom: 1px solid var(--border);
          margin-bottom: 24px;
        }

        .header-badge {
          display: inline-block;
          background: var(--accent);
          color: #000;
          font-size: 10px;
          font-weight: 700;
          padding: 3px 8px;
          letter-spacing: 2px;
          margin-bottom: 12px;
          font-family: 'Syne', sans-serif;
        }

        .header h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(22px, 4vw, 36px);
          font-weight: 800;
          line-height: 1.1;
          color: #fff;
        }

        .header h1 span { color: var(--accent); }

        .header-sub {
          margin-top: 8px;
          font-size: 12px;
          color: var(--muted);
          letter-spacing: 0.5px;
        }

        .preview-note {
          margin-top: 14px;
          border: 1px solid var(--border);
          background: var(--surface2);
          color: var(--accent2);
          padding: 10px 12px;
          font-size: 11px;
          line-height: 1.6;
        }

        .tabs {
          display: flex;
          gap: 4px;
          margin-bottom: 24px;
          flex-wrap: wrap;
          border-bottom: 1px solid var(--border);
          padding-bottom: 0;
        }

        .tab-btn {
          background: none;
          border: none;
          color: var(--muted);
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 10px 16px;
          cursor: pointer;
          letter-spacing: 0.5px;
          border-bottom: 2px solid transparent;
          margin-bottom: -1px;
          transition: all 0.15s;
          white-space: nowrap;
        }

        .tab-btn:hover { color: var(--text); }
        .tab-btn.active {
          color: var(--accent);
          border-bottom-color: var(--accent);
        }

        .content-box {
          background: var(--surface);
          border: 1px solid var(--border);
          border-radius: 4px;
          min-height: 400px;
          padding: 28px;
          position: relative;
        }

        .loading-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          gap: 16px;
        }

        .loader-ring {
          width: 40px;
          height: 40px;
          border: 2px solid var(--border);
          border-top-color: var(--accent);
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin { to { transform: rotate(360deg); } }

        .loading-text {
          font-size: 11px;
          color: var(--muted);
          letter-spacing: 2px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        @keyframes pulse { 0%,100% { opacity: 0.4; } 50% { opacity: 1; } }

        .stream-container { position: relative; }

        .stream-text {
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          line-height: 1.8;
          color: var(--text);
        }

        .stream-text p { margin-bottom: 12px; }

        .stream-text .proj-h3 {
          font-family: 'Syne', sans-serif;
          font-size: 16px;
          font-weight: 700;
          color: var(--accent);
          margin: 24px 0 12px;
          padding-left: 12px;
          border-left: 3px solid var(--accent);
        }

        .stream-text .proj-h2 {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #fff;
          margin: 32px 0 16px;
        }

        .stream-text strong { color: var(--accent2); font-weight: 600; }
        .stream-text em { color: var(--accent3); font-style: normal; }

        .stream-text .num-item {
          color: var(--accent);
          font-weight: 700;
          min-width: 24px;
          display: inline-block;
        }

        .stream-text .bullet {
          color: var(--accent2);
          margin-right: 4px;
        }

        .table-scroll {
          overflow-x: auto;
          margin: 16px 0;
          border: 1px solid var(--border);
          border-radius: 4px;
        }

        .stream-text table,
        .chat-body table {
          width: 100%;
          border-collapse: collapse;
          min-width: 720px;
          font-size: 12px;
        }

        .stream-text th,
        .stream-text td,
        .chat-body th,
        .chat-body td {
          border-bottom: 1px solid var(--border);
          border-right: 1px solid var(--border);
          padding: 8px 10px;
          text-align: left;
          vertical-align: top;
        }

        .stream-text th,
        .chat-body th {
          color: var(--accent);
          background: var(--surface2);
          font-family: 'Syne', sans-serif;
          font-weight: 700;
        }

        .cursor-blink {
          color: var(--accent);
          animation: blink 0.7s step-end infinite;
          font-size: 14px;
        }

        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        .chat-wrap {
          display: flex;
          flex-direction: column;
          height: 520px;
        }

        .chat-msgs {
          flex: 1;
          overflow-y: auto;
          padding-right: 8px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .chat-msgs::-webkit-scrollbar { width: 4px; }
        .chat-msgs::-webkit-scrollbar-track { background: var(--surface); }
        .chat-msgs::-webkit-scrollbar-thumb { background: var(--border); }

        .chat-msg {
          padding: 14px 16px;
          border-radius: 4px;
          font-size: 13px;
          line-height: 1.7;
        }

        .chat-msg.user {
          background: var(--surface2);
          border-left: 3px solid var(--accent2);
          margin-left: 40px;
        }

        .chat-msg.assistant {
          background: #0f0f1a;
          border-left: 3px solid var(--accent);
          margin-right: 40px;
        }

        .chat-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 8px;
          font-family: 'Syne', sans-serif;
        }

        .chat-msg.user .chat-label { color: var(--accent2); }
        .chat-msg.assistant .chat-label { color: var(--accent); }

        .chat-body { color: var(--text); }
        .chat-body p { margin-bottom: 8px; }
        .chat-body strong { color: var(--accent2); }
        .chat-body .proj-h3 {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          color: var(--accent);
          margin: 12px 0 6px;
        }
        .chat-body .num-item { color: var(--accent); font-weight: 700; }
        .chat-body .bullet { color: var(--accent2); margin-right: 4px; }

        .chat-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100%;
          gap: 12px;
          color: var(--muted);
        }

        .chat-empty-icon { font-size: 32px; }
        .chat-empty-title {
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          font-weight: 700;
          color: var(--text);
        }
        .chat-empty-sub { font-size: 11px; text-align: center; max-width: 300px; line-height: 1.6; }

        .suggested-qs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 12px;
        }

        .suggest-q {
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--accent2);
          font-family: 'JetBrains Mono', monospace;
          font-size: 11px;
          padding: 6px 10px;
          border-radius: 2px;
          cursor: pointer;
          transition: all 0.15s;
        }

        .suggest-q:hover {
          background: var(--accent2);
          color: #000;
          border-color: var(--accent2);
        }

        .chat-input-row {
          display: flex;
          gap: 8px;
          margin-top: 16px;
          padding-top: 16px;
          border-top: 1px solid var(--border);
        }

        .chat-input {
          flex: 1;
          background: var(--surface2);
          border: 1px solid var(--border);
          color: var(--text);
          font-family: 'JetBrains Mono', monospace;
          font-size: 13px;
          padding: 10px 14px;
          border-radius: 4px;
          outline: none;
          transition: border-color 0.15s;
        }

        .chat-input:focus { border-color: var(--accent); }
        .chat-input::placeholder { color: var(--muted); }

        .send-btn {
          background: var(--accent);
          border: none;
          color: #000;
          font-family: 'Syne', sans-serif;
          font-size: 12px;
          font-weight: 700;
          padding: 10px 20px;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 1px;
          transition: opacity 0.15s;
          white-space: nowrap;
        }

        .send-btn:hover { opacity: 0.85; }
        .send-btn:disabled { opacity: 0.4; cursor: not-allowed; }

        .streaming-chat {
          background: #0f0f1a;
          border-left: 3px solid var(--accent);
          padding: 14px 16px;
          border-radius: 4px;
          margin-right: 40px;
        }

        .streaming-chat .chat-label {
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 8px;
          font-family: 'Syne', sans-serif;
          color: var(--accent);
        }

        .generate-btn {
          background: linear-gradient(135deg, var(--accent), #ff8c5a);
          border: none;
          color: #000;
          font-family: 'Syne', sans-serif;
          font-size: 13px;
          font-weight: 800;
          padding: 14px 28px;
          border-radius: 4px;
          cursor: pointer;
          letter-spacing: 1px;
          display: block;
          margin: 40px auto 0;
          transition: transform 0.15s, opacity 0.15s;
        }

        .generate-btn:hover { transform: translateY(-1px); opacity: 0.9; }

        .tab-placeholder {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 300px;
          gap: 16px;
          text-align: center;
        }

        .tab-placeholder-icon { font-size: 40px; }

        .tab-placeholder-title {
          font-family: 'Syne', sans-serif;
          font-size: 18px;
          font-weight: 800;
          color: #fff;
        }

        .tab-placeholder-desc {
          font-size: 12px;
          color: var(--muted);
          max-width: 400px;
          line-height: 1.6;
        }
      `}</style>

      <div className="app">
        <div className="header">
          <div className="header-badge">AI CAREER STRATEGIST</div>
          <h1>Your Personal <span>Weapons Lab</span><br />for World Class Tech Companies</h1>
          <p className="header-sub">
            Powered by Claude · For Bangladesh CSE students targeting Google, OpenAI, Anthropic, Meta, DeepMind
          </p>
          <div className="preview-note">
            Preview mode: this shows the fixed UI and interactions with mock AI responses. The real version uses your server API route and Anthropic key.
          </div>
        </div>

        <div className="tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`tab-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="content-box">
          {activeTab !== "ask" && (
            <>
              {loading[activeTab] && !streamText[activeTab] && (
                <div className="loading-state">
                  <div className="loader-ring" />
                  <div className="loading-text">STRATEGIST IS THINKING...</div>
                </div>
              )}

              {(streamText[activeTab] || content[activeTab]) && (
                <StreamingText text={displayText(activeTab)} isStreaming={!!loading[activeTab]} />
              )}
            </>
          )}

          {activeTab === "ask" && (
            <div className="chat-wrap">
              <div className="chat-msgs">
                {chatHistory.length === 0 && !chatLoading && (
                  <div className="chat-empty">
                    <div className="chat-empty-icon">💬</div>
                    <div className="chat-empty-title">Ask Your Career Strategist</div>
                    <p className="chat-empty-sub">
                      Ask anything about projects, skills, how to approach recruiters, what to build first, or how to explain your work in interviews.
                    </p>
                    <div className="suggested-qs">
                      {[
                        "What skill should I learn first?",
                        "How do I get GitHub stars?",
                        "How do I cold email a recruiter?",
                        "Is a research paper necessary?",
                        "Best open source project to contribute to?",
                      ].map((q) => (
                        <button key={q} className="suggest-q" onClick={() => setChatInput(q)}>
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {chatHistory.map((msg, i) => (
                  <ChatMessage key={`${msg.role}-${i}`} role={msg.role} content={msg.content} />
                ))}

                {chatLoading && chatStream && (
                  <div className="streaming-chat">
                    <div className="chat-label">STRATEGIST</div>
                    <StreamingText text={chatStream} isStreaming={true} />
                  </div>
                )}

                {chatLoading && !chatStream && (
                  <div className="streaming-chat">
                    <div className="chat-label">STRATEGIST</div>
                    <span className="cursor-blink">▊</span>
                  </div>
                )}

                <div ref={chatEndRef} />
              </div>

              <div className="chat-input-row">
                <input
                  className="chat-input"
                  placeholder="Ask anything about your career, projects, or strategy..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendChat();
                    }
                  }}
                  disabled={chatLoading}
                />
                <button className="send-btn" onClick={() => sendChat()} disabled={chatLoading || !chatInput.trim()}>
                  {chatLoading ? "..." : "SEND →"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}