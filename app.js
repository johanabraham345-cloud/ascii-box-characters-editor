const DEFAULT_ROWS = 12;
const DEFAULT_COLS = 20;
const STORE_KEY = "artcii-box-studio-projects";
const LAST_KEY = "artcii-box-studio-last";
const U = 1;
const R = 2;
const D = 4;
const L = 8;

const els = {
  projectName: document.querySelector("#projectName"),
  projectList: document.querySelector("#projectList"),
  saveProject: document.querySelector("#saveProject"),
  newProject: document.querySelector("#newProject"),
  layers: document.querySelector("#layers"),
  deleteLayer: document.querySelector("#deleteLayer"),
  addLayer: document.querySelector("#addLayer"),
  exportToggle: document.querySelector("#exportToggle"),
  exportMenu: document.querySelector("#exportMenu"),
  copyEcho: document.querySelector("#copyEcho"),
  copyText: document.querySelector("#copyText"),
  downloadImage: document.querySelector("#downloadImage"),
  toolDraw: document.querySelector("#toolDraw"),
  toolErase: document.querySelector("#toolErase"),
  undo: document.querySelector("#undo"),
  redo: document.querySelector("#redo"),
  stage: document.querySelector("#stage"),
  artFrame: document.querySelector("#artFrame"),
  grid: document.querySelector("#grid"),
  rowsInput: document.querySelector("#rowsInput"),
  colsInput: document.querySelector("#colsInput"),
  brushPreview: document.querySelector("#brushPreview"),
  brushInput: document.querySelector("#brushInput"),
  nerdFont: document.querySelector("#nerdFont"),
  emojiToggle: document.querySelector("#emojiToggle"),
  emojiPanel: document.querySelector("#emojiPanel"),
  specialChar: document.querySelector("#specialChar"),
  specialPanel: document.querySelector("#specialPanel"),
  styleCycle: document.querySelector("#styleCycle"),
  sideUp: document.querySelector("#sideUp"),
  sideRight: document.querySelector("#sideRight"),
  sideDown: document.querySelector("#sideDown"),
  sideLeft: document.querySelector("#sideLeft"),
  sideCenter: document.querySelector("#sideCenter"),
  fgColors: document.querySelector("#fgColors"),
  bgColors: document.querySelector("#bgColors"),
  toast: document.querySelector("#toast"),
};

const glyphs = {
  single: {
    [0]: " ",
    [U]: "╵",
    [R]: "╶",
    [D]: "╷",
    [L]: "╴",
    [U | D]: "│",
    [L | R]: "─",
    [D | R]: "┌",
    [D | L]: "┐",
    [U | R]: "└",
    [U | L]: "┘",
    [U | D | R]: "├",
    [U | D | L]: "┤",
    [D | L | R]: "┬",
    [U | L | R]: "┴",
    [U | R | D | L]: "┼",
  },
  heavy: {
    [0]: " ",
    [U]: "╹",
    [R]: "╺",
    [D]: "╻",
    [L]: "╸",
    [U | D]: "┃",
    [L | R]: "━",
    [D | R]: "┏",
    [D | L]: "┓",
    [U | R]: "┗",
    [U | L]: "┛",
    [U | D | R]: "┣",
    [U | D | L]: "┫",
    [D | L | R]: "┳",
    [U | L | R]: "┻",
    [U | R | D | L]: "╋",
  },
  rounded: {
    [0]: " ",
    [U]: "╵",
    [R]: "╶",
    [D]: "╷",
    [L]: "╴",
    [U | D]: "│",
    [L | R]: "─",
    [D | R]: "╭",
    [D | L]: "╮",
    [U | R]: "╰",
    [U | L]: "╯",
    [U | D | R]: "├",
    [U | D | L]: "┤",
    [D | L | R]: "┬",
    [U | L | R]: "┴",
    [U | R | D | L]: "┼",
  },
  double: {
    [0]: " ",
    [U]: "╵",
    [R]: "╶",
    [D]: "╷",
    [L]: "╴",
    [U | D]: "║",
    [L | R]: "═",
    [D | R]: "╔",
    [D | L]: "╗",
    [U | R]: "╚",
    [U | L]: "╝",
    [U | D | R]: "╠",
    [U | D | L]: "╣",
    [D | L | R]: "╦",
    [U | L | R]: "╩",
    [U | R | D | L]: "╬",
  },
};

const mixedGlyphs = {
  "0000": " ",
  "1000": "╵",
  "0100": "╷",
  "0010": "╴",
  "0001": "╶",
  "2000": "╹",
  "0200": "╻",
  "0020": "╸",
  "0002": "╺",
  "1100": "│",
  "0011": "─",
  "0101": "┌",
  "0110": "┐",
  "1001": "└",
  "1010": "┘",
  "1101": "├",
  "1110": "┤",
  "0111": "┬",
  "1011": "┴",
  "1111": "┼",
  "2200": "┃",
  "0022": "━",
  "0202": "┏",
  "0220": "┓",
  "2002": "┗",
  "2020": "┛",
  "2202": "┣",
  "2220": "┫",
  "0222": "┳",
  "2022": "┻",
  "2222": "╋",
  "0201": "┎",
  "0102": "┍",
  "0210": "┒",
  "0120": "┑",
  "2001": "┖",
  "1002": "┕",
  "2010": "┚",
  "1020": "┙",
  "2101": "┞",
  "1201": "┟",
  "2102": "┡",
  "1202": "┢",
  "2110": "┦",
  "1210": "┧",
  "2111": "╀",
  "1211": "╁",
  "2211": "╂",
  "1121": "┽",
  "1112": "┾",
  "1122": "┿",
  "1221": "╅",
  "1212": "╆",
  "2122": "╇",
  "1222": "╈",
  "2221": "╉",
  "2212": "╊",
};

const styleOrder = ["single", "heavy", "rounded", "double"];
const styleLabels = {
  single: "○",
  heavy: "●",
  rounded: "◜",
  double: "◎",
};

const palette = ["white", "black", "red", "green", "yellow", "blue", "magenta", "cyan"];
const bgPalette = ["transparent", ...palette];
const emojiChars = "😀 😎 🔥 ⭐ ❤️ ✅ ⚡ 🎯 🚀 🌙 ☀️ 🍀 💎 👑 🧠 🎵 🎮 🛠️ ✨".split(" ");
const specialChars = Array.from(
  "┄┅┆┇┈┉┊┋▀▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▐░▒▓▔▕▖▗▘▙▚▛▜▝▞▟◆◇○●◐◑◒◓◢◣◤◥▲▼◀▶"
);

const reverseGlyphs = new Map();
for (const [style, table] of Object.entries(glyphs)) {
  for (const [mask, char] of Object.entries(table)) {
    if (char !== " ") reverseGlyphs.set(char, { mask: Number(mask), style });
  }
}

const blankCell = () => ({ c: " ", fg: "white", bg: "transparent", conn: 0, style: "single" });
const cloneCell = (cell) => ({ c: cell.c, fg: cell.fg, bg: cell.bg, conn: cell.conn || 0, style: cell.style || "single" });
const makeGrid = (rows, cols) => Array.from({ length: rows }, () => Array.from({ length: cols }, blankCell));
const newLayer = (name, rows, cols) => ({ name, show: true, g: makeGrid(rows, cols) });

let state = {
  rows: DEFAULT_ROWS,
  cols: DEFAULT_COLS,
  layers: [newLayer("Layer 1", DEFAULT_ROWS, DEFAULT_COLS), newLayer("Layer 2", DEFAULT_ROWS, DEFAULT_COLS)],
  selectedLayer: 0,
  tool: "draw",
  fg: "white",
  bg: "transparent",
  brushChar: "#",
  brushKind: "char",
  brushMask: 0,
  lineStyle: "single",
  sideWeights: [1, 1, 2, 1],
  specialIndex: 0,
  projectId: crypto.randomUUID(),
  projectName: "Untitled Artwork",
};

let drawing = false;
let dragStarted = false;
let lastCell = null;
let temporaryTool = null;
let undoStack = [];
let redoStack = [];
let toastTimer = 0;

function snapshot() {
  return JSON.parse(JSON.stringify({
    rows: state.rows,
    cols: state.cols,
    layers: state.layers,
    selectedLayer: state.selectedLayer,
    fg: state.fg,
    bg: state.bg,
    brushChar: state.brushChar,
    brushKind: state.brushKind,
    brushMask: state.brushMask,
    lineStyle: state.lineStyle,
    sideWeights: state.sideWeights,
    specialIndex: state.specialIndex,
    projectId: state.projectId,
    projectName: state.projectName,
  }));
}

function restore(data) {
  Object.assign(state, data);
  state.layers = state.layers.map((layer) => ({
    ...layer,
    g: layer.g.map((row) => row.map((cell) => ({ ...blankCell(), ...cell }))),
  }));
  state.selectedLayer = Math.min(state.selectedLayer, state.layers.length - 1);
  render();
}

function pushHistory() {
  undoStack.push(snapshot());
  if (undoStack.length > 90) undoStack.shift();
  redoStack = [];
  updateHistoryButtons();
}

function undo() {
  if (!undoStack.length) return;
  redoStack.push(snapshot());
  restore(undoStack.pop());
}

function redo() {
  if (!redoStack.length) return;
  undoStack.push(snapshot());
  restore(redoStack.pop());
}

function mutate(fn, historic = true) {
  if (historic) pushHistory();
  fn();
  render();
}

function normalizeCell(cell) {
  return { ...blankCell(), ...cell };
}

function resizeGrid(grid, rows, cols) {
  return Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) => normalizeCell(grid[r]?.[c] || blankCell()))
  );
}

function compositeGrid() {
  const out = makeGrid(state.rows, state.cols);
  for (let i = state.layers.length - 1; i >= 0; i -= 1) {
    const layer = state.layers[i];
    if (!layer.show) continue;
    for (let r = 0; r < state.rows; r += 1) {
      for (let c = 0; c < state.cols; c += 1) {
        const cell = normalizeCell(layer.g[r]?.[c] || blankCell());
        if (cell.c !== " " || cell.bg !== "transparent") out[r][c] = cloneCell(cell);
      }
    }
  }
  return out;
}

function gridText() {
  return compositeGrid().map((row) => row.map((cell) => cell.c || " ").join("")).join("\n");
}

function glyphForMask(mask, style = state.lineStyle) {
  return glyphs[style]?.[mask] || glyphs.single[mask] || " ";
}

function maskFromWeights(weights) {
  return (weights[0] ? U : 0) | (weights[1] ? D : 0) | (weights[2] ? L : 0) | (weights[3] ? R : 0);
}

function charFromWeights(weights) {
  if (state.lineStyle === "double" && weights.every((v) => v === 0 || v === 2)) {
    return glyphForMask(maskFromWeights(weights), "double");
  }
  const code = weights.join("");
  return mixedGlyphs[code] || glyphForMask(maskFromWeights(weights), state.lineStyle);
}

function setBrush(char, kind = "char", mask = 0, style = state.lineStyle) {
  state.brushChar = char || " ";
  state.brushKind = kind;
  state.brushMask = mask;
  state.lineStyle = style;
  renderControls();
}

function selectedGrid() {
  return state.layers[state.selectedLayer].g;
}

function parseBoxChar(char) {
  return reverseGlyphs.get(char) || null;
}

function boxCell(mask, style) {
  return { c: glyphForMask(mask, style), fg: state.fg, bg: state.bg, conn: mask, style };
}

function placeCell(row, col) {
  const grid = selectedGrid();
  if (!grid[row]?.[col]) return;
  if (state.tool === "erase") {
    grid[row][col] = blankCell();
    return;
  }
  grid[row][col] = {
    c: state.brushChar,
    fg: state.fg,
    bg: state.bg,
    conn: state.brushKind === "box" ? state.brushMask : 0,
    style: state.lineStyle,
  };
}

function connectCell(row, col, bit, style) {
  const grid = selectedGrid();
  const current = normalizeCell(grid[row]?.[col] || blankCell());
  const parsed = current.conn ? { mask: current.conn, style: current.style } : parseBoxChar(current.c);
  const baseMask = parsed && parsed.style === style ? parsed.mask : 0;
  grid[row][col] = boxCell(baseMask | bit, style);
}

function connectBetween(prev, next) {
  const dr = next.row - prev.row;
  const dc = next.col - prev.col;
  if (Math.abs(dr) + Math.abs(dc) !== 1) {
    placeCell(next.row, next.col);
    return;
  }
  const style = state.lineStyle;
  if (dr === 1) {
    connectCell(prev.row, prev.col, D, style);
    connectCell(next.row, next.col, U, style);
  } else if (dr === -1) {
    connectCell(prev.row, prev.col, U, style);
    connectCell(next.row, next.col, D, style);
  } else if (dc === 1) {
    connectCell(prev.row, prev.col, R, style);
    connectCell(next.row, next.col, L, style);
  } else if (dc === -1) {
    connectCell(prev.row, prev.col, L, style);
    connectCell(next.row, next.col, R, style);
  }
}

function drawAt(row, col) {
  if (state.tool === "erase") {
    placeCell(row, col);
  } else if (lastCell && (state.brushKind === "box" || parseBoxChar(state.brushChar))) {
    connectBetween(lastCell, { row, col });
  } else {
    placeCell(row, col);
  }
  lastCell = { row, col };
  renderGrid();
}

function renderGrid() {
  const grid = compositeGrid();
  const fragment = document.createDocumentFragment();
  for (let r = 0; r < state.rows; r += 1) {
    const row = document.createElement("div");
    row.className = "grid-row";
    for (let c = 0; c < state.cols; c += 1) {
      const cell = grid[r][c];
      const span = document.createElement("span");
      span.className = "cell";
      span.dataset.row = r;
      span.dataset.col = c;
      span.textContent = cell.c === " " ? "\u00a0" : cell.c;
      span.style.color = cell.fg;
      if (cell.bg !== "transparent") span.style.backgroundColor = cell.bg;
      row.appendChild(span);
    }
    fragment.appendChild(row);
  }
  els.grid.replaceChildren(fragment);
}

function renderLayers() {
  els.layers.replaceChildren();
  state.layers.forEach((layer, index) => {
    const item = document.createElement("div");
    item.className = `layer${index === state.selectedLayer ? " selected" : ""}${layer.show ? "" : " hidden"}`;
    item.draggable = true;
    item.dataset.index = index;

    const icon = document.createElement("span");
    icon.textContent = "▱";

    const input = document.createElement("input");
    input.value = layer.name;
    input.ariaLabel = `Layer ${index + 1} name`;
    input.addEventListener("change", () => {
      mutate(() => {
        state.layers[index].name = input.value || `Layer ${index + 1}`;
      });
    });

    const visibility = document.createElement("button");
    visibility.title = layer.show ? "Hide layer" : "Show layer";
    visibility.textContent = layer.show ? "◉" : "○";
    visibility.addEventListener("click", (event) => {
      event.stopPropagation();
      mutate(() => {
        state.layers[index].show = !state.layers[index].show;
      });
    });

    const up = document.createElement("button");
    up.title = "Move layer up";
    up.textContent = "↑";
    up.addEventListener("click", (event) => {
      event.stopPropagation();
      moveLayer(index, Math.max(0, index - 1));
    });

    const handle = document.createElement("button");
    handle.title = "Drag layer";
    handle.textContent = "⋮";

    item.append(icon, input, visibility, up, handle);
    item.addEventListener("click", () => {
      state.selectedLayer = index;
      renderLayers();
    });
    item.addEventListener("dragstart", (event) => {
      event.dataTransfer.setData("text/plain", String(index));
    });
    item.addEventListener("dragover", (event) => event.preventDefault());
    item.addEventListener("drop", (event) => {
      event.preventDefault();
      moveLayer(Number(event.dataTransfer.getData("text/plain")), index);
    });
    els.layers.appendChild(item);
  });
}

function moveLayer(from, to) {
  if (from === to || from < 0 || to < 0) return;
  mutate(() => {
    const [layer] = state.layers.splice(from, 1);
    state.layers.splice(to, 0, layer);
    if (state.selectedLayer === from) state.selectedLayer = to;
    else if (from < state.selectedLayer && to >= state.selectedLayer) state.selectedLayer -= 1;
    else if (from > state.selectedLayer && to <= state.selectedLayer) state.selectedLayer += 1;
  });
}

function renderSwatches() {
  const make = (parent, colors, current, onPick) => {
    parent.replaceChildren();
    colors.forEach((color) => {
      const button = document.createElement("button");
      button.className = `swatch${current === color ? " selected" : ""}`;
      button.title = color;
      button.style.backgroundColor = color === "transparent" ? "transparent" : color;
      button.addEventListener("click", () => {
        mutate(() => onPick(color), false);
      });
      parent.appendChild(button);
    });
  };
  make(els.fgColors, palette, state.fg, (color) => {
    state.fg = color;
  });
  make(els.bgColors, bgPalette, state.bg, (color) => {
    state.bg = color;
  });
}

function renderControls() {
  els.projectName.value = state.projectName;
  els.rowsInput.value = state.rows;
  els.colsInput.value = state.cols;
  els.brushInput.value = state.brushChar;
  els.toolDraw.classList.toggle("active", state.tool === "draw");
  els.toolErase.classList.toggle("active", state.tool === "erase");
  els.styleCycle.textContent = styleLabels[state.lineStyle];
  els.specialChar.textContent = specialChars[state.specialIndex];
  const sideTexts = state.sideWeights.map((weight, index) => {
    const vertical = index < 2;
    if (!weight) return " ";
    if (state.lineStyle === "double") return vertical ? "║" : "═";
    if (state.lineStyle === "heavy" || weight === 2) return vertical ? "┃" : "━";
    return vertical ? "│" : "─";
  });
  els.sideUp.textContent = sideTexts[0];
  els.sideDown.textContent = sideTexts[1];
  els.sideLeft.textContent = sideTexts[2];
  els.sideRight.textContent = sideTexts[3];
  els.sideCenter.textContent = charFromWeights(state.sideWeights);
  renderSwatches();
  updateHistoryButtons();
  renderProjects();
}

function renderProjects() {
  const projects = readProjects();
  els.projectList.replaceChildren();
  const placeholder = document.createElement("option");
  placeholder.textContent = projects.length ? "Open saved project" : "No saved projects yet";
  placeholder.value = "";
  els.projectList.appendChild(placeholder);
  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.id;
    option.textContent = project.name;
    option.selected = project.id === state.projectId;
    els.projectList.appendChild(option);
  });
}

function render() {
  renderGrid();
  renderLayers();
  renderControls();
}

function updateHistoryButtons() {
  els.undo.disabled = undoStack.length === 0;
  els.redo.disabled = redoStack.length === 0;
}

function readProjects() {
  try {
    return JSON.parse(localStorage.getItem(STORE_KEY) || "[]");
  } catch {
    return [];
  }
}

function writeProjects(projects) {
  localStorage.setItem(STORE_KEY, JSON.stringify(projects));
}

function saveProject(showMessage = true) {
  state.projectName = els.projectName.value.trim() || "Untitled Artwork";
  const projects = readProjects().filter((project) => project.id !== state.projectId);
  projects.unshift({ id: state.projectId, name: state.projectName, savedAt: Date.now(), data: snapshot() });
  writeProjects(projects);
  localStorage.setItem(LAST_KEY, state.projectId);
  renderProjects();
  if (showMessage) showToast("Project saved");
}

function loadProject(id) {
  const project = readProjects().find((item) => item.id === id);
  if (!project) return;
  undoStack = [];
  redoStack = [];
  restore(project.data);
  localStorage.setItem(LAST_KEY, id);
  showToast("Project opened");
}

function startNewProject() {
  undoStack = [];
  redoStack = [];
  state = {
    ...state,
    rows: DEFAULT_ROWS,
    cols: DEFAULT_COLS,
    layers: [newLayer("Layer 1", DEFAULT_ROWS, DEFAULT_COLS), newLayer("Layer 2", DEFAULT_ROWS, DEFAULT_COLS)],
    selectedLayer: 0,
    tool: "draw",
    fg: "white",
    bg: "transparent",
    brushChar: "#",
    brushKind: "char",
    brushMask: 0,
    lineStyle: "single",
    sideWeights: [1, 1, 2, 1],
    specialIndex: 0,
    projectId: crypto.randomUUID(),
    projectName: `Artwork ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`,
  };
  localStorage.setItem(LAST_KEY, state.projectId);
  render();
  showToast("New project ready");
}

async function copyToClipboard(text, message) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement("textarea");
    area.value = text;
    area.style.position = "fixed";
    area.style.opacity = "0";
    document.body.appendChild(area);
    area.select();
    document.execCommand("copy");
    area.remove();
  }
  showToast(message);
}

function echoCommand() {
  const fgCodes = { black: 30, red: 31, green: 32, yellow: 33, blue: 34, magenta: 35, cyan: 36, white: 37 };
  const bgCodes = { black: 40, red: 41, green: 42, yellow: 43, blue: 44, magenta: 45, cyan: 46, white: 47 };
  const lines = compositeGrid().map((row) =>
    row.map((cell) => {
      const fg = fgCodes[cell.fg] || 37;
      const bg = cell.bg === "transparent" ? "" : `\x1b[${bgCodes[cell.bg] || 40}m`;
      return `\x1b[${fg}m${bg}${cell.c || " "}`;
    }).join("") + "\x1b[0m"
  );
  return `echo "${lines.join("\\n")}"`;
}

function exportImage() {
  const grid = compositeGrid();
  const fontSize = 36;
  const cellW = Math.ceil(fontSize * 0.62);
  const cellH = fontSize;
  const pad = 24;
  const canvas = document.createElement("canvas");
  canvas.width = state.cols * cellW + pad * 2;
  canvas.height = state.rows * cellH + pad * 2;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.font = `${fontSize}px "Courier New", Consolas, monospace`;
  ctx.textBaseline = "top";
  grid.forEach((row, r) => {
    row.forEach((cell, c) => {
      const x = pad + c * cellW;
      const y = pad + r * cellH;
      if (cell.bg !== "transparent") {
        ctx.fillStyle = cell.bg;
        ctx.fillRect(x, y, cellW, cellH);
      }
      ctx.fillStyle = cell.fg;
      ctx.fillText(cell.c || " ", x, y - 1);
    });
  });
  const link = document.createElement("a");
  link.download = `${state.projectName || "artwork"}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
  showToast("Image exported");
}

function showToast(message) {
  clearTimeout(toastTimer);
  els.toast.textContent = message;
  els.toast.classList.add("show");
  toastTimer = setTimeout(() => els.toast.classList.remove("show"), 1700);
}

function setDimensions(rows, cols) {
  const nextRows = Math.max(1, Math.min(60, Number(rows) || DEFAULT_ROWS));
  const nextCols = Math.max(1, Math.min(120, Number(cols) || DEFAULT_COLS));
  mutate(() => {
    state.rows = nextRows;
    state.cols = nextCols;
    state.layers = state.layers.map((layer) => ({ ...layer, g: resizeGrid(layer.g, nextRows, nextCols) }));
  });
}

function setupPopovers() {
  emojiChars.forEach((emoji) => {
    const button = document.createElement("button");
    button.textContent = emoji;
    button.addEventListener("click", () => {
      setBrush(emoji, "char");
      els.emojiPanel.hidden = true;
    });
    els.emojiPanel.appendChild(button);
  });
  specialChars.forEach((char, index) => {
    const button = document.createElement("button");
    button.textContent = char;
    button.addEventListener("click", () => {
      state.specialIndex = index;
      setBrush(char, "char");
      els.specialPanel.hidden = true;
    });
    els.specialPanel.appendChild(button);
  });
}

function pickPreset(key) {
  const presetMasks = {
    cornerTl: D | R,
    cornerTr: D | L,
    cornerBl: U | R,
    cornerBr: U | L,
    horizontal: L | R,
    vertical: U | D,
  };
  const mask = presetMasks[key];
  setBrush(glyphForMask(mask, state.lineStyle), "box", mask, state.lineStyle);
}

function bindEvents() {
  els.grid.addEventListener("pointerdown", (event) => {
    const cell = event.target.closest(".cell");
    if (!cell) return;
    event.preventDefault();
    pushHistory();
    dragStarted = true;
    drawing = true;
    lastCell = null;
    els.grid.setPointerCapture?.(event.pointerId);
    if (event.button === 2) {
      temporaryTool = state.tool;
      state.tool = "erase";
    }
    drawAt(Number(cell.dataset.row), Number(cell.dataset.col));
  });
  els.grid.addEventListener("pointermove", (event) => {
    if (!drawing) return;
    const cell = document.elementFromPoint(event.clientX, event.clientY)?.closest(".cell");
    if (cell && !els.grid.contains(cell)) return;
    if (!cell) return;
    drawAt(Number(cell.dataset.row), Number(cell.dataset.col));
  });
  els.grid.addEventListener("contextmenu", (event) => {
    const cell = event.target.closest(".cell");
    if (!cell) return;
    event.preventDefault();
  });
  window.addEventListener("pointerup", (event) => {
    els.grid.releasePointerCapture?.(event.pointerId);
    if (temporaryTool) {
      state.tool = temporaryTool;
      temporaryTool = null;
      renderControls();
    }
    drawing = false;
    dragStarted = false;
    lastCell = null;
  });
  window.addEventListener("keydown", (event) => {
    const mod = event.ctrlKey || event.metaKey;
    if (mod && event.key.toLowerCase() === "z" && !event.shiftKey) {
      event.preventDefault();
      undo();
    } else if ((mod && event.key.toLowerCase() === "y") || (mod && event.shiftKey && event.key.toLowerCase() === "z")) {
      event.preventDefault();
      redo();
    }
  });

  window.addEventListener("paste", (event) => {
    if (["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
      return;
    }
    event.preventDefault();
    const text = (event.clipboardData || window.clipboardData).getData("text");
    if (!text) return;

    mutate(() => {
      const grid = selectedGrid();
      const lines = text.split(/\r?\n/);
      const rowLimit = Math.min(lines.length, state.rows);
      for (let r = 0; r < rowLimit; r += 1) {
        const chars = Array.from(lines[r]);
        const colLimit = Math.min(chars.length, state.cols);
        for (let c = 0; c < colLimit; c += 1) {
          grid[r][c] = {
            c: chars[c],
            fg: state.fg,
            bg: state.bg,
            conn: 0,
            style: state.lineStyle,
          };
        }
      }
    });
    showToast("Text pasted to active layer");
  });

  els.toolDraw.addEventListener("click", () => {
    state.tool = "draw";
    renderControls();
  });
  els.toolErase.addEventListener("click", () => {
    state.tool = "erase";
    renderControls();
  });
  els.undo.addEventListener("click", undo);
  els.redo.addEventListener("click", redo);

  els.addLayer.addEventListener("click", () => {
    mutate(() => {
      state.layers.push(newLayer(`Layer ${state.layers.length + 1}`, state.rows, state.cols));
      state.selectedLayer = state.layers.length - 1;
    });
  });
  els.deleteLayer.addEventListener("click", () => {
    if (state.layers.length <= 1) {
      showToast("Keep at least one layer");
      return;
    }
    mutate(() => {
      state.layers.splice(state.selectedLayer, 1);
      state.selectedLayer = Math.max(0, state.selectedLayer - 1);
    });
  });

  els.rowsInput.addEventListener("change", () => setDimensions(els.rowsInput.value, state.cols));
  els.colsInput.addEventListener("change", () => setDimensions(state.rows, els.colsInput.value));
  els.brushPreview.addEventListener("click", () => els.brushInput.focus());
  els.brushInput.addEventListener("input", () => {
    const chars = Array.from(els.brushInput.value);
    setBrush(chars.at(-1) || " ", "char");
  });
  els.nerdFont.addEventListener("click", () => window.open("https://www.nerdfonts.com/cheat-sheet", "_blank", "noopener,noreferrer"));
  els.emojiToggle.addEventListener("click", () => {
    els.emojiPanel.hidden = !els.emojiPanel.hidden;
    els.specialPanel.hidden = true;
  });

  document.querySelectorAll("[data-preset]").forEach((button) => {
    button.addEventListener("click", () => pickPreset(button.dataset.preset));
  });
  els.specialChar.addEventListener("click", () => {
    els.specialPanel.hidden = !els.specialPanel.hidden;
    els.emojiPanel.hidden = true;
  });
  els.styleCycle.addEventListener("click", () => {
    const next = styleOrder[(styleOrder.indexOf(state.lineStyle) + 1) % styleOrder.length];
    state.lineStyle = next;
    const parsed = parseBoxChar(state.brushChar);
    if (state.brushKind === "box" || parsed) {
      const mask = state.brushMask || parsed.mask;
      setBrush(glyphForMask(mask, next), "box", mask, next);
    } else renderControls();
  });

  [
    [els.sideUp, 0],
    [els.sideDown, 1],
    [els.sideLeft, 2],
    [els.sideRight, 3],
  ].forEach(([button, index]) => {
    button.addEventListener("click", () => {
      state.sideWeights[index] = (state.sideWeights[index] + 1) % 3;
      renderControls();
    });
  });
  els.sideCenter.addEventListener("click", () => {
    const char = charFromWeights(state.sideWeights);
    setBrush(char, "box", maskFromWeights(state.sideWeights), state.lineStyle);
  });

  els.exportToggle.addEventListener("click", () => {
    els.exportMenu.hidden = !els.exportMenu.hidden;
  });
  els.copyText.addEventListener("click", () => {
    els.exportMenu.hidden = true;
    copyToClipboard(gridText(), "Text copied exactly");
  });
  els.copyEcho.addEventListener("click", () => {
    els.exportMenu.hidden = true;
    copyToClipboard(echoCommand(), "Echo command copied");
  });
  els.downloadImage.addEventListener("click", () => {
    els.exportMenu.hidden = true;
    exportImage();
  });

  els.saveProject.addEventListener("click", () => saveProject(true));
  els.newProject.addEventListener("click", startNewProject);
  els.projectName.addEventListener("change", () => {
    state.projectName = els.projectName.value.trim() || "Untitled Artwork";
    renderProjects();
  });
  els.projectList.addEventListener("change", () => {
    if (els.projectList.value) loadProject(els.projectList.value);
  });
}

function boot() {
  setupPopovers();
  bindEvents();
  const last = localStorage.getItem(LAST_KEY);
  const saved = readProjects().find((project) => project.id === last);
  if (saved) restore(saved.data);
  else render();
}

boot();
