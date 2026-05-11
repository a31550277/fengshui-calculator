const palaceDefinitions = [
  ["northwest", "西北", "乾宮", "父親、貴人、權威、金"],
  ["north", "北", "坎宮", "事業、水、腎、流動"],
  ["northeast", "東北", "艮宮", "少男、學習、山、停止"],
  ["west", "西", "兌宮", "少女、口舌、喜悅、金"],
  ["center", "中宮", "中宮", "健康、穩定、全宅核心"],
  ["east", "東", "震宮", "長男、行動、肝膽、啟動"],
  ["southwest", "西南", "坤宮", "母親、婚姻、土地、承載"],
  ["south", "南", "離宮", "名聲、眼睛、火、曝光"],
  ["southeast", "東南", "巽宮", "財、長女、風、文昌"]
];

const roomOptions = [
  ["unknown", "未知"],
  ["entry", "大門 / 玄關"],
  ["living", "客廳"],
  ["bedroom", "主臥"],
  ["guestRoom", "客臥"],
  ["study", "書房 / 工作區"],
  ["kitchen", "廚房 / 爐灶"],
  ["toilet", "廁所 / 浴室"],
  ["balcony", "陽台 / 大窗"],
  ["storage", "儲藏 / 空置"]
];


const degToFacing = {
  north: [338, 360, 0, 22],
  northeast: [23, 67],
  east: [68, 112],
  southeast: [113, 157],
  south: [158, 202],
  southwest: [203, 247],
  west: [248, 292],
  northwest: [293, 337]
};

const facingRanges = [
  ["north", 338, 360, "北"],
  ["north", 0, 22, "北"],
  ["northeast", 23, 67, "東北"],
  ["east", 68, 112, "東"],
  ["southeast", 113, 157, "東南"],
  ["south", 158, 202, "南"],
  ["southwest", 203, 247, "西南"],
  ["west", 248, 292, "西"],
  ["northwest", 293, 337, "西北"]
];

function syncDegreeToFacing(degInput, facingSelect) {
  degInput.addEventListener("input", () => {
    const v = parseInt(degInput.value, 10);
    if (isNaN(v) || v < 0 || v > 359) return;
    for (const [val, lo, hi] of facingRanges) {
      if (v >= lo && v <= hi) {
        facingSelect.value = val;
        return;
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const bDeg = document.querySelector('[name="buildingFacingDegrees"]');
  const bSel = document.querySelector('[name="buildingFacing"]');
  if (bDeg && bSel) syncDegreeToFacing(bDeg, bSel);

  const uDeg = document.querySelector('[name="unitDoorDegrees"]');
  const uSel = document.querySelector('[name="unitDoorFacing"]');
  if (uDeg && uSel) syncDegreeToFacing(uDeg, uSel);
});

const labels = {
  buy: "買房",
  rent: "租房",
  short: "1 年內",
  medium: "1 到 5 年",
  long: "5 年以上",
  apartment: "大樓 / 公寓",
  townhouse: "透天 / 別墅",
  studio: "套房 / 小宅",
  mixed: "住辦 / 店住混合",
  north: "北",
  northeast: "東北",
  east: "東",
  southeast: "東南",
  south: "南",
  southwest: "西南",
  west: "西",
  northwest: "西北",
  center: "中宮",
  unknown: "不確定",
  health: "健康與睡眠",
  wealth: "財務與事業",
  study: "讀書與專注",
  relationship: "家庭與關係",
  balanced: "整體平衡"
};

const directionMeta = {
  north: { element: "水", group: "east", trigrams: "坎", family: "中男", sector: [337.5, 22.5] },
  northeast: { element: "土", group: "west", trigrams: "艮", family: "少男", sector: [22.5, 67.5] },
  east: { element: "木", group: "east", trigrams: "震", family: "長男", sector: [67.5, 112.5] },
  southeast: { element: "木", group: "east", trigrams: "巽", family: "長女", sector: [112.5, 157.5] },
  south: { element: "火", group: "east", trigrams: "離", family: "中女", sector: [157.5, 202.5] },
  southwest: { element: "土", group: "west", trigrams: "坤", family: "母親", sector: [202.5, 247.5] },
  west: { element: "金", group: "west", trigrams: "兌", family: "少女", sector: [247.5, 292.5] },
  northwest: { element: "金", group: "west", trigrams: "乾", family: "父親", sector: [292.5, 337.5] }
};

const directionOrder = ["north", "northeast", "east", "southeast", "south", "southwest", "west", "northwest"];

const palaceByDirection = {
  north: "坎",
  northeast: "艮",
  east: "震",
  southeast: "巽",
  south: "離",
  southwest: "坤",
  west: "兌",
  northwest: "乾"
};

const palaceElements = {
  north: "水",
  northeast: "土",
  east: "木",
  southeast: "木",
  south: "火",
  southwest: "土",
  west: "金",
  northwest: "金",
  center: "土"
};

const elementGenerates = {
  木: "火",
  火: "土",
  土: "金",
  金: "水",
  水: "木"
};

const elementControls = {
  木: "土",
  土: "水",
  水: "火",
  火: "金",
  金: "木"
};

const bazhaiDirections = {
  1: { group: "east", fuWei: "north", shengQi: "southeast", tianYi: "east", yanNian: "south", jueMing: "southwest", wuGui: "northeast", liuSha: "northwest", huoHai: "west" },
  3: { group: "east", fuWei: "east", shengQi: "south", tianYi: "north", yanNian: "southeast", jueMing: "west", wuGui: "northwest", liuSha: "northeast", huoHai: "southwest" },
  4: { group: "east", fuWei: "southeast", shengQi: "north", tianYi: "south", yanNian: "east", jueMing: "northeast", wuGui: "southwest", liuSha: "west", huoHai: "northwest" },
  9: { group: "east", fuWei: "south", shengQi: "east", tianYi: "southeast", yanNian: "north", jueMing: "northwest", wuGui: "west", liuSha: "southwest", huoHai: "northeast" },
  2: { group: "west", fuWei: "southwest", shengQi: "northeast", tianYi: "west", yanNian: "northwest", jueMing: "north", wuGui: "southeast", liuSha: "south", huoHai: "east" },
  6: { group: "west", fuWei: "northwest", shengQi: "west", tianYi: "northeast", yanNian: "southwest", jueMing: "south", wuGui: "east", liuSha: "north", huoHai: "southeast" },
  7: { group: "west", fuWei: "west", shengQi: "northwest", tianYi: "southwest", yanNian: "northeast", jueMing: "east", wuGui: "south", liuSha: "southeast", huoHai: "north" },
  8: { group: "west", fuWei: "northeast", shengQi: "southwest", tianYi: "northwest", yanNian: "west", jueMing: "southeast", wuGui: "north", liuSha: "east", huoHai: "south" }
};

const bazhaiLabels = {
  shengQi: "生氣",
  tianYi: "天醫",
  yanNian: "延年",
  fuWei: "伏位",
  jueMing: "絕命",
  wuGui: "五鬼",
  liuSha: "六煞",
  huoHai: "禍害"
};

const schoolProfile = {
  version: "research-profile-2026-05",
  yearBoundaryDefault: "liChun",
  annualBoundaryDefault: "liChun",
  xuanKongVariant: "san-yuan-lower-chart-candidate",
  annualStarVariant: "zi-bai-annual-li-chun",
  twentyFourMountainReference: "earth-plate-zheng-zhen",
  notes: "依研究報告拆分可驗證方位/曆法核心與門派 profile；玄空目前輸出候選盤，兼向/替卦需現場複核。"
};

const weightPresets = {
  buyConservative: { form: 5, eight: 3, flying: 3, three: 4, modern: 5 },
  rentPractical: { form: 4, eight: 3, flying: 2, three: 4, modern: 5 },
  healthSleep: { form: 5, eight: 3, flying: 2, three: 4, modern: 5 },
  traditionalFengShui: { form: 5, eight: 5, flying: 5, three: 5, modern: 4 },
  wealthCareer: { form: 4, eight: 4, flying: 5, three: 4, modern: 4 }
};

const nineStarMeta = {
  1: { name: "一白貪狼", element: "水", tone: "吉", note: "人緣、事業、流動" },
  2: { name: "二黑巨門", element: "土", tone: "病符", note: "健康、濕滯、慢性問題" },
  3: { name: "三碧祿存", element: "木", tone: "是非", note: "口舌、競爭、衝動" },
  4: { name: "四綠文曲", element: "木", tone: "文昌", note: "學習、文書、桃花" },
  5: { name: "五黃廉貞", element: "土", tone: "大煞", note: "事故、阻滯、病災，宜靜不宜動" },
  6: { name: "六白武曲", element: "金", tone: "權貴", note: "權力、貴人、管理" },
  7: { name: "七赤破軍", element: "金", tone: "退氣", note: "破耗、口舌、金屬傷" },
  8: { name: "八白左輔", element: "土", tone: "財星", note: "財庫、穩定、土地" },
  9: { name: "九紫右弼", element: "火", tone: "當旺", note: "喜慶、名聲、科技、火氣" }
};

const auspiciousBazhai = ["shengQi", "tianYi", "yanNian", "fuWei"];
const inauspiciousBazhai = ["jueMing", "wuGui", "liuSha", "huoHai"];

const twentyFourMountains = [
  "子", "癸", "丑", "艮", "寅", "甲", "卯", "乙",
  "辰", "巽", "巳", "丙", "午", "丁", "未", "坤",
  "申", "庚", "酉", "辛", "戌", "乾", "亥", "壬"
];

const form = document.querySelector("#assessmentForm");
const palaceGrid = document.querySelector("#palaceGrid");
const report = document.querySelector("#report");
const overallScore = document.querySelector("#overallScore");
const overallVerdict = document.querySelector("#overallVerdict");
const scoreBar = document.querySelector("#scoreBar");
const loadSample = document.querySelector("#loadSample");
const addComparison = document.querySelector("#addComparison");
const exportData = document.querySelector("#exportData");
const importData = document.querySelector("#importData");
const importFile = document.querySelector("#importFile");
const comparisonPanel = document.querySelector("#comparisonPanel");
const weightPreset = document.querySelector("#weightPreset");
let hasGeneratedReport = false;
let comparisonCases = [];
let latestResult = null;
let editingComparisonId = null;
let importMode = "single";

function initPalaceGrid() {
  palaceGrid.innerHTML = palaceDefinitions.map(([value, title, palace, hint]) => `
    <label class="palace">
      <b>${title}・${palace}</b>
      <small>${hint}</small>
      <select name="palace_${value}">
        ${roomOptions.map(([roomValue, roomLabel]) => `<option value="${roomValue}">${roomLabel}</option>`).join("")}
      </select>
    </label>
  `).join("");
}

function checked(name) {
  return [...document.querySelectorAll(`input[name="${name}"]:checked`)].map((node) => node.value);
}

function numberValue(name) {
  return Number(form.elements[name].value || 0);
}

function degreeValue(name) {
  const raw = form.elements[name].value;
  if (raw === "") return null;
  const parsed = Number(raw);
  if (Number.isNaN(parsed)) return null;
  return ((parsed % 360) + 360) % 360;
}

function readInput() {
  const palaces = Object.fromEntries(
    palaceDefinitions.map(([value]) => [value, form.elements[`palace_${value}`].value])
  );

  return {
    purpose: form.purpose.value,
    caseName: form.caseName.value.trim(),
    horizon: form.horizon.value,
    homeType: form.homeType.value,
    occupants: numberValue("occupants"),
    primaryGoal: form.primaryGoal.value,
    budgetPressure: form.budgetPressure.value,
    residentBirthYear: numberValue("residentBirthYear"),
    residentGender: form.residentGender.value,
    yearBoundaryMode: form.yearBoundaryMode.value,
    weightPreset: form.weightPreset.value,
    buildingFacing: form.buildingFacing.value,
    orientationRule: form.orientationRule.value,
    northReference: form.northReference.value,
    orientationAccuracy: form.orientationAccuracy.value,
    buildingFacingDegrees: degreeValue("buildingFacingDegrees"),
    unitDoorFacing: form.unitDoorFacing.value,
    unitDoorDegrees: degreeValue("unitDoorDegrees"),
    stoveMouthFacing: form.stoveMouthFacing.value,
    builtYear: numberValue("builtYear"),
    periodBasis: form.periodBasis.value,
    annualStarYear: numberValue("annualStarYear"),
    floor: numberValue("floor"),
    totalFloors: numberValue("totalFloors"),
    condition: form.condition.value,
    palaces,
    external: checked("external"),
    internal: checked("internal"),
    living: checked("living"),
    weights: {
      form: numberValue("weightForm"),
      eight: numberValue("weightEight"),
      flying: numberValue("weightFlying"),
      three: numberValue("weightThree"),
      modern: numberValue("weightModern")
    },
    notes: form.notes.value.trim()
  };
}

function serializeFormInput() {
  const data = readInput();
  data.external = checked("external");
  data.internal = checked("internal");
  data.living = checked("living");
  data.palaces = Object.fromEntries(palaceDefinitions.map(([value]) => [value, form.elements[`palace_${value}`].value]));
  return data;
}

function applyInputData(data) {
  const normalizedAccuracy = normalizeOrientationAccuracy(data);
  const scalarFields = [
    "caseName", "purpose", "horizon", "homeType", "occupants", "primaryGoal", "budgetPressure",
    "residentBirthYear", "residentGender", "yearBoundaryMode", "weightPreset", "buildingFacing", "orientationRule",
    "northReference", "orientationAccuracy", "buildingFacingDegrees", "unitDoorFacing",
    "unitDoorDegrees", "stoveMouthFacing", "builtYear", "periodBasis",
    "annualStarYear", "floor", "totalFloors", "condition", "notes"
  ];

  scalarFields.forEach((name) => {
    if (name === "orientationAccuracy") {
      form.elements[name].value = normalizedAccuracy;
      return;
    }
    if (!form.elements[name] || data[name] === undefined) return;
    if (data[name] === null) {
      form.elements[name].value = "";
      return;
    }
    form.elements[name].value = data[name];
  });

  if (data.palaces) {
    Object.entries(data.palaces).forEach(([palace, room]) => {
      if (form.elements[`palace_${palace}`]) form.elements[`palace_${palace}`].value = room;
    });
  }

  ["external", "internal", "living"].forEach((group) => {
    document.querySelectorAll(`input[name="${group}"]`).forEach((node) => {
      node.checked = Array.isArray(data[group]) && data[group].includes(node.value);
    });
  });

  if (data.weights) {
    const mapping = {
      form: "weightForm",
      eight: "weightEight",
      flying: "weightFlying",
      three: "weightThree",
      modern: "weightModern"
    };
    Object.entries(mapping).forEach(([key, field]) => {
      if (form.elements[field] && data.weights[key] !== undefined) form.elements[field].value = data.weights[key];
    });
  }

  form.elements.weightPreset.value = data.weightPreset || detectWeightPreset(data.weights || readInput().weights);
}

function addRule(items, condition, rule) {
  if (condition) items.push(rule);
}

function palaceRoomAt(input, room) {
  return Object.entries(input.palaces).find(([, value]) => value === room)?.[0] || null;
}

function effectiveDirection(selectedDirection, degrees) {
  if (degrees !== null) return directionFromDegrees(degrees);
  return selectedDirection !== "unknown" ? selectedDirection : null;
}

function normalizeOrientationAccuracy(data) {
  return data.orientationAccuracy || data.buildingFacingAccuracy || data.unitDoorAccuracy || "none";
}

function applyWeightPreset(presetKey) {
  const preset = weightPresets[presetKey];
  if (!preset) return false;
  form.elements.weightForm.value = preset.form;
  form.elements.weightEight.value = preset.eight;
  form.elements.weightFlying.value = preset.flying;
  form.elements.weightThree.value = preset.three;
  form.elements.weightModern.value = preset.modern;
  form.elements.weightPreset.value = presetKey;
  return true;
}

function detectWeightPreset(weights) {
  return Object.entries(weightPresets).find(([, preset]) => (
    preset.form === Number(weights.form)
    && preset.eight === Number(weights.eight)
    && preset.flying === Number(weights.flying)
    && preset.three === Number(weights.three)
    && preset.modern === Number(weights.modern)
  ))?.[0] || "custom";
}

function weightPresetText(value) {
  return {
    buyConservative: "買房保守版",
    rentPractical: "租房實住版",
    healthSleep: "健康睡眠版",
    traditionalFengShui: "傳統風水版",
    wealthCareer: "財運事業版",
    custom: "自訂"
  }[value] || value;
}

function applyComparisonWeights(input, weights, preset) {
  return {
    ...input,
    weightPreset: preset || detectWeightPreset(weights),
    weights: {
      form: Number(weights.form),
      eight: Number(weights.eight),
      flying: Number(weights.flying),
      three: Number(weights.three),
      modern: Number(weights.modern)
    }
  };
}

function currentComparisonBaseline() {
  return {
    preset: form.elements.weightPreset.value,
    weights: {
      form: Number(form.elements.weightForm.value),
      eight: Number(form.elements.weightEight.value),
      flying: Number(form.elements.weightFlying.value),
      three: Number(form.elements.weightThree.value),
      modern: Number(form.elements.weightModern.value)
    }
  };
}

function rebuildComparisonCases(baseline) {
  comparisonCases = comparisonCases.map((item) => {
    const unifiedInput = applyComparisonWeights(item.input, baseline.weights, baseline.preset);
    const unifiedResult = evaluate(unifiedInput);
    return buildCaseRecord(unifiedInput, unifiedResult, item);
  });
}

function evaluateClassicalSystems(input) {
  const redFlags = [];
  const strengths = [];
  const fixes = [];
  const findings = [];
  const bazhai = calculateBazhai(input);
  const threeEssentials = calculateYangzhaiThreeEssentials(input);
  const flyingStar = calculateXuanKongFlyingStar(input);
  const annualPurpleWhite = calculateAnnualPurpleWhite(input);

  [...bazhai.findings, ...threeEssentials.findings, ...flyingStar.findings, ...annualPurpleWhite.findings].forEach((item) => {
    findings.push(item);
    if (item.type === "good") strengths.push(item);
    if (item.type === "risk") redFlags.push(item);
    if (item.fix) fixes.push(item.fix);
  });

  return {
    redFlags,
    strengths,
    fixes,
    findings,
    reports: [bazhai.report, threeEssentials.report, flyingStar.report, annualPurpleWhite.report]
  };
}

function calculateBazhai(input) {
  const findings = [];
  const kua = calculateKuaNumber(input.residentBirthYear, input.residentGender);
  const entryPalace = palaceRoomAt(input, "entry");
  const bedroomPalace = palaceRoomAt(input, "bedroom");
  const kitchenPalace = palaceRoomAt(input, "kitchen");
  const items = [];
  const doorDirection = effectiveDirection(input.unitDoorFacing, input.unitDoorDegrees);

  if (!kua) {
    return {
      findings,
      report: {
        title: "八宅派",
        status: "資料不足",
        items: ["請輸入主要居住者出生年與性別，才能計算命卦、東四命 / 西四命與四吉四凶方。"]
      }
    };
  }

  const chart = bazhaiDirections[kua];
  const groupLabel = chart.group === "east" ? "東四命" : "西四命";
  const mapByDirection = invertBazhaiChart(chart);
  items.push(`命卦：${kua} 命，屬${groupLabel}。四吉方：${auspiciousBazhai.map((key) => `${bazhaiLabels[key]}${labels[chart[key]]}`).join("、")}。四凶方：${inauspiciousBazhai.map((key) => `${bazhaiLabels[key]}${labels[chart[key]]}`).join("、")}。`);

  [
    { label: "本戶大門門向", direction: doorDirection, scoreGood: 6, scoreBad: -8 },
    { label: "大門所在宮位", direction: entryPalace, scoreGood: 4, scoreBad: -6 },
    { label: "主臥所在宮位", direction: bedroomPalace, scoreGood: 5, scoreBad: -7 },
    { label: "爐口 / 火門朝向", direction: input.stoveMouthFacing !== "unknown" ? input.stoveMouthFacing : null, scoreGood: 4, scoreBad: -6 }
  ].forEach((check) => {
    if (!check.direction || check.direction === "center") {
      items.push(`${check.label}：資料不足，暫不判。`);
      return;
    }
    const relation = mapByDirection[check.direction];
    const isGood = auspiciousBazhai.includes(relation);
    const item = {
      title: `八宅：${check.label}${bazhaiLabels[relation]}`,
      type: isGood ? "good" : "risk",
      severity: isGood ? undefined : "medium",
      score: isGood ? check.scoreGood : check.scoreBad,
      school: "八宅派",
      text: `${check.label}落在${labels[check.direction]}，對主要居住者為${bazhaiLabels[relation]}方。${isGood ? "可列為八宅加分。" : "屬八宅需保守處理的位置。"}`
    };
    findings.push(item);
    items.push(item.text);
  });

  if (kitchenPalace && kitchenPalace !== "center") {
    const relation = mapByDirection[kitchenPalace];
    const kitchenInBad = inauspiciousBazhai.includes(relation);
    const item = {
      title: kitchenInBad ? "八宅：灶座壓凶方" : "八宅：灶座落吉方需複核",
      type: kitchenInBad ? "good" : "risk",
      severity: kitchenInBad ? undefined : "low",
      score: kitchenInBad ? 3 : -2,
      school: "八宅派 / 陽宅三要",
      text: kitchenInBad
        ? `廚房所在宮位為${bazhaiLabels[relation]}方，傳統有「灶座宜壓凶」的用法；仍需確認爐口是否朝吉。`
        : `廚房所在宮位為${bazhaiLabels[relation]}方，若以灶座壓凶的做法看，需再確認爐口、水槽與實際動線。`
    };
    findings.push(item);
    items.push(item.text);
  }

  return { findings, report: { title: "八宅派", status: "已計算命卦", items } };
}

function calculateYangzhaiThreeEssentials(input) {
  const findings = [];
  const items = [];
  const doorPalace = palaceRoomAt(input, "entry");
  const mainPalace = palaceRoomAt(input, "bedroom");
  const kitchenPalace = palaceRoomAt(input, "kitchen");

  if (!doorPalace || !mainPalace || !kitchenPalace) {
    return {
      findings,
      report: {
        title: "陽宅三要",
        status: "資料不足",
        items: ["陽宅三要需要至少標出大門 / 玄關、主臥、廚房 / 爐灶所在宮位。"]
      }
    };
  }

  items.push(`門在${labels[doorPalace]}，主臥在${labels[mainPalace]}，灶在${labels[kitchenPalace]}，爐口朝${labels[input.stoveMouthFacing] || "未知"}。`);
  const doorMainSameGroup = directionMeta[doorPalace]?.group && directionMeta[doorPalace]?.group === directionMeta[mainPalace]?.group;
  const doorMainItem = {
    title: doorMainSameGroup ? "陽宅三要：門主同局" : "陽宅三要：門主不同局",
    type: doorMainSameGroup ? "good" : "risk",
    severity: doorMainSameGroup ? undefined : "medium",
    score: doorMainSameGroup ? 5 : -6,
    school: "陽宅三要",
    text: doorMainSameGroup ? "大門與主臥同屬東四 / 西四系統，門主關係較一致。" : "大門與主臥分屬東四 / 西四系統，門主關係較不一致，需靠床位與動線修正。"
  };
  findings.push(doorMainItem);
  items.push(doorMainItem.text);

  const relation = elementRelation(palaceElements[doorPalace], palaceElements[kitchenPalace]);
  const doorKitchenItem = {
    title: `陽宅三要：門灶五行${relation.label}`,
    type: relation.score >= 0 ? "good" : "risk",
    severity: relation.score >= 0 ? undefined : "low",
    score: relation.score,
    school: "陽宅三要 / 五行",
    text: `門宮五行屬${palaceElements[doorPalace]}，灶宮五行屬${palaceElements[kitchenPalace]}，關係為${relation.label}。此項是輔助判斷，仍需以門路、爐口、水槽與油煙為準。`
  };
  findings.push(doorKitchenItem);
  items.push(doorKitchenItem.text);

  if (input.internal.includes("doorToKitchen")) items.push("已勾選大門見廚房或爐台，陽宅三要中屬門灶關係需優先修正。");
  if (input.stoveMouthFacing === "unknown") items.push("缺爐口 / 火門朝向，灶向吉凶尚未完整。");

  return {
    findings,
    report: {
      title: "陽宅三要",
      status: input.stoveMouthFacing === "unknown" ? "半完整" : "已計算門主灶",
      items
    }
  };
}

function calculateXuanKongFlyingStar(input) {
  const findings = [];
  const items = [];
  const period = getSanYuanPeriod(input.builtYear);

  if (!period?.period || input.buildingFacingDegrees === null) {
    return {
      findings,
      report: {
        title: "玄空飛星",
        status: "資料不足",
        items: ["玄空飛星需要建造 / 入伙年份與建物坐向度數。若有大翻修或重新入伙，也需要另行判斷是否換運。"]
      }
    };
  }

  const facingDirection = directionFromDegrees(input.buildingFacingDegrees);
  const sittingDirection = oppositeDirection(facingDirection);
  const facingMountain = mountainFromDegrees(input.buildingFacingDegrees);
  const sittingMountain = sittingMountainFromFacingDegrees(input.buildingFacingDegrees);
  const baseChart = flyStars(period.period, true);
  const mountainCenterStar = baseChart[sittingDirection];
  const waterCenterStar = baseChart[facingDirection];
  const mountainChart = flyStars(mountainCenterStar, true);
  const waterChart = flyStars(waterCenterStar, true);
  const facingWaterStar = waterChart[facingDirection];
  const sittingMountainStar = mountainChart[sittingDirection];

  items.push(`${input.builtYear} 年屬${period.name}，建物約為坐${sittingMountain}、向${facingMountain}。`);
  items.push(`運星盤：${formatStarChart(baseChart)}。`);
  items.push(`山星候選盤以坐方運星 ${mountainCenterStar} 入中順飛：${formatStarChart(mountainChart)}。`);
  items.push(`向星候選盤以向方運星 ${waterCenterStar} 入中順飛：${formatStarChart(waterChart)}。`);
  items.push("注意：目前採標準順飛候選盤呈現，尚未處理兼向、替卦、三元龍陰陽順逆與現場山水動靜，因此不直接用星盤斷吉凶。");

  findings.push({
    title: "玄空：運星盤與山向星候選盤已產生",
    type: "neutral",
    score: 0,
    school: "玄空飛星",
    text: `向方${labels[facingDirection]}的候選向星為 ${facingWaterStar}，坐方${labels[sittingDirection]}的候選山星為 ${sittingMountainStar}。需再配合外局山水與替卦規則。`
  });

  return { findings, report: { title: "玄空飛星", status: "已產生候選宅盤", items } };
}

function calculateAnnualPurpleWhite(input) {
  const findings = [];
  const year = input.annualStarYear;

  if (!year) {
    return {
      findings,
      report: {
        title: "流年紫白九星",
        status: "資料不足",
        items: ["請輸入流年年份，才能產生年度紫白九星盤。"]
      }
    };
  }

  const centerStar = annualCenterStar(year);
  const chart = flyStars(centerStar, true);
  const items = [
    `${year} 年流年紫白以${schoolProfile.annualBoundaryDefault === "liChun" ? "立春" : "農曆新年"}為換年預設；中宮 ${centerStar}（${nineStarMeta[centerStar].name}）。`,
    `年度九宮：${formatStarChartWithNames(chart)}。`
  ];

  Object.entries(chart).forEach(([direction, star]) => {
    if (star === 5 || star === 2) {
      findings.push({
        title: `流年紫白：${labels[direction]}臨${nineStarMeta[star].name}`,
        type: "risk",
        severity: star === 5 ? "high" : "medium",
        score: star === 5 ? -8 : -5,
        school: "紫白九星 / 玄空飛星",
        text: `${year} 年${labels[direction]}方為${nineStarMeta[star].name}，傳統上宜靜不宜動；實務上可作施工、動土、長時間停留區的提醒。`
      });
    }
    if (star === 8 || star === 9 || star === 1) {
      findings.push({
        title: `流年紫白：${labels[direction]}臨${nineStarMeta[star].name}`,
        type: "good",
        score: star === 9 ? 5 : 3,
        school: "紫白九星 / 玄空飛星",
        text: `${year} 年${labels[direction]}方為${nineStarMeta[star].name}，可作活動、採光、整理與空間使用策略的參考；仍需配合宅盤與外局。`
      });
    }
  });

  return {
    findings,
    report: {
      title: "流年紫白九星",
      status: "已產生年度盤",
      items
    }
  };
}

function evaluate(input) {
  const findings = [];
  const redFlags = [];
  const strengths = [];
  const fixes = [];
  const missingData = [];
  const effectiveBuildingDirection = effectiveDirection(input.buildingFacing, input.buildingFacingDegrees);
  const effectiveDoorDirection = effectiveDirection(input.unitDoorFacing, input.unitDoorDegrees);

  addRule(strengths, input.external.includes("brightHall"), {
    title: "前方明堂佳",
    score: 10,
    school: "形勢派",
    text: "前方開闊通常代表氣口舒展、視野放鬆，也有採光與居住舒適優勢。"
  });
  addRule(strengths, input.external.includes("backSupport"), {
    title: "後方有靠",
    score: 7,
    school: "形勢派",
    text: "後方穩定能降低背後空虛感，傳統上稱有靠山，現代上也常對應安靜與安全感。"
  });
  addRule(strengths, input.external.includes("waterView"), {
    title: "外局見水景",
    score: 4,
    school: "形勢派 / 現代居住",
    text: "水景或開闊水面可帶來視覺舒展與採光優勢，但仍要看潮濕、噪音、蚊蟲與安全性，不能單獨視為大加分。"
  });
  addRule(strengths, input.external.includes("quietStreet"), {
    title: "外局安靜穩定",
    score: 8,
    school: "形勢派 / 現代居住",
    text: "外部街廓安靜、夜間車流低，通常比華麗景觀更能直接提升長住舒適與睡眠品質。"
  });
  addRule(strengths, input.external.includes("cleanApproach"), {
    title: "入口與公共區乾淨明亮",
    score: 5,
    school: "形勢派 / 現代居住",
    text: "社區入口、門廳、梯間整潔明亮，代表日常納氣與回家感受較佳，也反映管理品質。"
  });
  addRule(strengths, input.internal.includes("regularShape"), {
    title: "格局方正",
    score: 10,
    school: "形勢派 / 現代居住",
    text: "方正格局通常坪效高、家具好配置、視覺與動線更穩。"
  });
  addRule(strengths, input.internal.includes("goodCommand"), {
    title: "床 / 沙發 / 書桌有靠且視野穩定",
    score: 8,
    school: "形勢派 / 陽宅三要",
    text: "床、沙發與書桌有靠且能看見入口，可提升睡眠、專注與安全感。"
  });
  addRule(strengths, input.internal.includes("centerClear"), {
    title: "中宮清爽",
    score: 6,
    school: "形勢派 / 八宅派 / 現代居住",
    text: "房屋中心保持通透、整潔、無重壓，通常有助於動線流暢與整體穩定感。"
  });
  addRule(strengths, input.internal.includes("separateZones"), {
    title: "公私區域分明",
    score: 6,
    school: "現代居住 / 形勢派",
    text: "公共活動區與休息區互不干擾，較能兼顧作息、隱私與家庭互動。"
  });
  addRule(strengths, input.internal.includes("crossVentLayout"), {
    title: "格局具對流條件",
    score: 7,
    school: "現代居住 / 形勢派",
    text: "有明確對流路徑的格局更容易排濕散熱，也更符合長住舒適需求。"
  });
  addRule(strengths, input.living.includes("excellentLight"), {
    title: "光風濕條件佳",
    score: 12,
    school: "現代居住",
    text: "良好採光通風是少數同時被傳統與現代都重視的硬條件。"
  });
  addRule(strengths, input.living.includes("safeAccess"), {
    title: "出入與逃生安全",
    score: 7,
    school: "現代居住",
    text: "動線安全、門禁與逃生清楚，對家庭與長住價值都很重要。"
  });
  addRule(strengths, input.living.includes("privacy"), {
    title: "隱私佳",
    score: 5,
    school: "現代居住",
    text: "不被直視能讓窗簾與陽台真正被使用，也會影響長期舒適度。"
  });
  addRule(strengths, input.living.includes("storage"), {
    title: "收納與家具配置容易",
    score: 5,
    school: "現代居住",
    text: "好配置的房子更容易保持清爽，這是實際居住裡最常被低估的風水。"
  });
  addRule(strengths, input.living.includes("bedroomLight"), {
    title: "主臥採光穩定",
    score: 6,
    school: "現代居住",
    text: "主臥有穩定自然光能改善作息與起床品質，對長住感受非常關鍵。"
  });
  addRule(strengths, input.living.includes("quietSleep"), {
    title: "睡眠干擾低",
    score: 8,
    school: "現代居住",
    text: "夜間安靜、臥室不受人車音干擾，對健康與恢復力的幫助通常大於許多抽象加分。"
  });
  addRule(strengths, input.living.includes("goodManagement"), {
    title: "管理與維護品質佳",
    score: 5,
    school: "現代居住",
    text: "管理良好的社區通常能降低公共空間髒亂、設備失修與鄰里衝突風險。"
  });

  addRule(redFlags, input.external.includes("roadRush"), {
    title: "路沖 / 巷沖",
    severity: "high",
    score: -18,
    school: "形勢派 / 現代居住",
    text: "道路或車道直衝會帶來噪音、灰塵、事故風險與視覺壓迫。",
    buy: "買房列為重大扣分，需看事故、噪音、窗框隔音與轉手接受度。",
    rent: "租房務必夜間二訪；若睡眠敏感，即使便宜也不一定划算。",
    fix: "能做的多半是窗簾、植栽、隔音窗與主要停留區避開直線視野，但外局無法根本改造。"
  });
  addRule(redFlags, input.external.includes("reverseBow"), {
    title: "反弓路 / 高架外弧",
    severity: "high",
    score: -14,
    school: "形勢派",
    text: "反弓常被視為外局氣勢不收，也常伴隨車流、噪音與安全疑慮。",
    buy: "買房要把轉手性和長期噪音列入價格折扣。",
    rent: "租房可用短約測試，但不建議為景觀或坪數忽略噪音。",
    fix: "以遮蔽視線、隔音與調整常坐常睡位置為主。"
  });
  addRule(redFlags, input.external.includes("sharpSha"), {
    title: "尖角 / 壁刀 / 電塔壓迫",
    severity: "medium",
    score: -10,
    school: "形勢派",
    text: "外部尖銳形體會形成視覺壓力，若正對窗、床或沙發，感受會被放大。",
    fix: "用窗簾、霧面貼、植栽或改變座位視線降低直視。"
  });
  addRule(redFlags, input.external.includes("elevatedPressure"), {
    title: "大型外部量體壓迫",
    severity: "medium",
    score: -11,
    school: "形勢派 / 現代居住",
    text: "高架、軌道、天橋或巨大量體貼近住宅，常伴隨噪音、灰塵、風切與視覺壓迫。",
    fix: "優先確認臥室與客廳是否正面受壓；若無法避開，至少要靠隔音與視線遮擋降低影響。"
  });
  addRule(redFlags, input.external.includes("lowLand"), {
    title: "地勢低窪或排水疑慮",
    severity: "medium",
    score: -10,
    school: "形勢派 / 現代居住",
    text: "低窪地勢容易在豪雨、颱風或社區排水不足時放大積水與潮濕問題。",
    buy: "買房建議查地下室、防水與排水紀錄，並實問颱風或暴雨後狀況。",
    rent: "租房至少確認一樓、地下室、車道與公共區是否曾積水。"
  });
  addRule(redFlags, input.external.includes("constructionUncertainty"), {
    title: "周邊長期變數高",
    severity: "low",
    score: -6,
    school: "形勢派 / 現代居住",
    text: "周邊空地、施工或未定開發會讓未來噪音、採光、景觀與人流有較大不確定性。",
    buy: "買房可查都市計畫、建照與未來鄰地用途。",
    rent: "租房若是短租可接受，但長住要保守。"
  });
  addRule(redFlags, input.external.includes("noise"), {
    title: "高噪音外局",
    severity: "high",
    score: -16,
    school: "現代居住",
    text: "噪音是最難靠意志力克服的居住問題，會直接影響睡眠、專注與情緒。",
    buy: "買房請做平日夜間、假日、雨天後的多時段測試。",
    rent: "租房若無法短期退租，應把噪音視為高風險。"
  });
  addRule(redFlags, input.external.includes("sensitivePlace"), {
    title: "特殊場域鄰近",
    severity: "medium",
    score: -8,
    school: "形勢派 / 現代居住",
    text: "醫院、殯葬、宮廟、警消等場所不必然不好，但人流、聲音、心理感受與市場偏好差異很大。",
    buy: "買房須評估未來買方接受度。",
    rent: "租房可用不同時段實測決定自己能否接受。"
  });
  addRule(redFlags, input.internal.includes("missingCorner"), {
    title: "明顯缺角",
    severity: "medium",
    score: -11,
    school: "形勢派 / 八宅派",
    text: "缺角同時影響傳統九宮判讀與實際坪效，且通常不容易根本修正。",
    buy: "買房要看缺角落在哪一宮，以及是否影響主臥、客廳與採光。",
    rent: "租房可接受度取決於租金折讓與家具能否補齊動線。"
  });
  addRule(redFlags, input.internal.includes("doorToBalcony"), {
    title: "穿堂格局",
    severity: "medium",
    score: -9,
    school: "形勢派",
    text: "大門直通陽台或大窗，傳統上稱氣不易停留，現代上也有隱私與空調效率問題。",
    fix: "用屏風、矮櫃、植栽、窗簾建立緩衝，不必一開始就做硬隔間。"
  });
  addRule(redFlags, input.internal.includes("doorToToilet"), {
    title: "大門對廁所",
    severity: "medium",
    score: -10,
    school: "形勢派 / 陽宅三要",
    text: "入口視線落在廁所，會牽涉氣味、濕氣與心理感受。",
    fix: "門片常關、除濕除臭、門簾或玄關視線遮擋。"
  });
  addRule(redFlags, input.internal.includes("doorToKitchen"), {
    title: "大門見灶",
    severity: "medium",
    score: -8,
    school: "陽宅三要 / 八宅派",
    text: "門、主、灶是陽宅三要核心，大門見灶常被視為財庫外露，也會有油煙與隱私問題。",
    fix: "以半高櫃、拉門或餐邊櫃修正視線。"
  });
  addRule(redFlags, input.internal.includes("longCorridor"), {
    title: "狹長走道或多門相沖",
    severity: "medium",
    score: -8,
    school: "形勢派 / 現代居住",
    text: "過長走道、穿心廊或多門相對，常讓動線破碎、視覺緊張，也不利空氣停留。",
    fix: "用燈光、端景、地毯或收納節點把走道切段，降低一眼望穿的感覺。"
  });
  addRule(redFlags, input.internal.includes("kitchenBathConflict"), {
    title: "廚廁過近或相對",
    severity: "medium",
    score: -9,
    school: "陽宅三要 / 現代居住",
    text: "廚房與廁所相鄰、相對或共壁太重，會同時牽涉油煙、濕氣、衛生與使用感受。",
    fix: "加強排風、除濕與門片管理，並留意共壁滲水與氣味傳遞。"
  });
  addRule(redFlags, input.internal.includes("darkCenter"), {
    title: "中宮昏暗壓迫",
    severity: "medium",
    score: -8,
    school: "形勢派 / 八宅派 / 現代居住",
    text: "房屋中心若昏暗、堆物或壓迫，常讓整體空間感變差，動線與情緒也容易被拖累。",
    fix: "優先清出中心區、補照明、減少高櫃與堆積。"
  });
  addRule(redFlags, input.internal.includes("beam"), {
    title: "樑壓常停留區",
    severity: "medium",
    score: -9,
    school: "形勢派 / 現代居住",
    text: "床、沙發、書桌上方有樑，容易形成壓迫感並影響停留品質。",
    fix: "優先移位；買房可評估天花修飾，租房不建議投入高額裝修。"
  });
  addRule(redFlags, input.internal.includes("bedDoor"), {
    title: "床沖門或鏡",
    severity: "medium",
    score: -8,
    school: "形勢派 / 現代居住",
    text: "床正對門或鏡子會降低安全感，睡眠敏感者尤其明顯。",
    fix: "改床向、收鏡、加布簾或用床尾矮櫃緩衝。"
  });
  addRule(redFlags, input.internal.includes("centerToilet"), {
    title: "廁所在中宮",
    severity: "high",
    score: -16,
    school: "八宅派 / 陽宅三要 / 現代居住",
    text: "中宮是全宅核心，廁所位於中心容易牽涉濕氣、管線、氣味與傳統穩定性問題。",
    buy: "買房視為不易根本改造的重大格局扣分。",
    rent: "租房可用清潔除濕降低影響，但不宜用高租金承擔。"
  });
  addRule(redFlags, input.living.includes("humid") || input.condition === "problem", {
    title: "濕氣 / 漏水 / 壁癌疑慮",
    severity: "high",
    score: input.condition === "problem" ? -20 : -15,
    school: "現代居住",
    text: "濕氣與漏水不是單純風水問題，而是健康、維修、裝潢與資產價值問題。",
    buy: "買房必須查漏水來源、外牆、頂樓、管線、社區維修紀錄，必要時請專業驗屋。",
    rent: "租房應白紙黑字寫清修繕責任；若已有霉味，建議保守。"
  });
  addRule(redFlags, input.living.includes("poorPrivacy"), {
    title: "隱私不足",
    severity: "medium",
    score: -7,
    school: "現代居住",
    text: "被對面直視會讓窗簾長期關閉，最後反過來犧牲採光、通風與心理放鬆。",
    fix: "霧面貼、紗簾、植栽與家具角度可改善，但要確認是否犧牲太多光。"
  });
  addRule(redFlags, input.living.includes("badAccess"), {
    title: "出入 / 逃生 / 夜間動線不佳",
    severity: "high",
    score: -14,
    school: "現代居住",
    text: "安全與逃生優先於任何風水加分，這是不能浪漫化的硬條件。",
    buy: "買房須查逃生梯、消防、停車、門禁與管委會管理。",
    rent: "租房請晚上實走一次回家路線。"
  });
  addRule(redFlags, input.living.includes("heat"), {
    title: "熱負荷高",
    severity: "medium",
    score: -7,
    school: "現代居住",
    text: "西曬、頂樓熱與隔熱差會增加電費，也會讓客廳或臥室實際使用率下降。",
    buy: "買房看窗框、玻璃、外牆、頂樓隔熱與冷氣管線。",
    rent: "租房直接估夏季電費與冷氣效率。"
  });
  addRule(redFlags, input.living.includes("poorVentilation"), {
    title: "通風差與悶感明顯",
    severity: "medium",
    score: -9,
    school: "現代居住",
    text: "空氣不流動的房子容易放大濕氣、氣味與熱，長住會顯著降低舒適與健康感受。",
    fix: "先確認可否形成對流、是否能補循環扇與除濕；若先天無窗面差，需保守評估。"
  });
  addRule(redFlags, input.living.includes("odorSmoke"), {
    title: "異味或油煙倒灌",
    severity: "medium",
    score: -10,
    school: "現代居住",
    text: "油煙、二手菸、廁所異味或排氣倒灌會直接影響居住品質，也常代表管道規劃不佳。",
    buy: "買房要查管道間、排風路徑與鄰戶使用狀況。",
    rent: "租房建議晚餐時段與夜間各看一次最準。"
  });
  addRule(redFlags, input.living.includes("poorSoundproof"), {
    title: "隔音不足",
    severity: "medium",
    score: -11,
    school: "現代居住",
    text: "樓上腳步聲、管道音、鄰房談話聲若明顯，會持續消耗睡眠與情緒耐受度。",
    buy: "買房建議做平日晚間與假日時段實測。",
    rent: "租房若對聲音敏感，這類條件通常比租金更值得優先考慮。"
  });

  const directionalFindings = evaluateDirectionalFactors(input);
  const palaceFindings = evaluatePalaces(input);
  const classical = evaluateClassicalSystems(input);
  redFlags.push(...directionalFindings.redFlags, ...palaceFindings.redFlags, ...classical.redFlags);
  strengths.push(...directionalFindings.strengths, ...palaceFindings.strengths, ...classical.strengths);
  findings.push(...uniqueFindings([...strengths, ...redFlags, ...directionalFindings.findings, ...palaceFindings.findings, ...classical.findings]));
  fixes.push(...redFlags.map((item) => item.fix).filter(Boolean), ...directionalFindings.fixes, ...palaceFindings.fixes, ...classical.fixes);

  if (!effectiveBuildingDirection) missingData.push("建物 / 社區主要朝向尚不確定，玄空與外局判斷會保守處理。");
  if (!effectiveDoorDirection) missingData.push("本戶大門朝向尚不確定，八宅與陽宅三要判斷會保守處理。");
  if (input.orientationAccuracy !== "none" && input.buildingFacingDegrees === null) missingData.push("已選坐向量測精度，但尚未輸入建物精確度數，二十四山與玄空判斷會被降權。");
  if (input.orientationAccuracy !== "none" && input.unitDoorDegrees === null) missingData.push("已選坐向量測精度，但尚未輸入本戶大門度數，門向與九宮關係會被降權。");
  if (input.orientationAccuracy === "none") missingData.push("沒有坐向量測；玄空飛星與本戶門向判讀都只能保守處理。");
  if (input.northReference !== "true") missingData.push("目前未接入 WMM 磁偏角或格網北校正，若輸入不是真北，二十四山需人工校正。");
  if (!input.residentBirthYear || input.residentGender === "unknown") missingData.push("缺主要居住者出生年或性別，八宅命卦只能略過。");
  if (input.stoveMouthFacing === "unknown") missingData.push("缺爐口 / 火門朝向，陽宅三要與八宅灶向判斷會不完整。");
  if (!input.builtYear) missingData.push("缺建造或入伙年份；玄空元運判斷不足。");
  if (!input.annualStarYear) missingData.push("缺流年紫白年份，無法產生年度九星盤。");
  if (!Object.values(input.palaces).includes("entry")) missingData.push("九宮格未標示大門 / 玄關位置。");
  if (!Object.values(input.palaces).includes("bedroom")) missingData.push("九宮格未標示主臥位置。");
  if (!Object.values(input.palaces).includes("kitchen")) missingData.push("九宮格未標示廚房 / 爐灶位置。");

  const scoreSummary = calculateScoreSummary(input, strengths, redFlags);

  const confidence = estimateConfidence(input, missingData);
  const clamped = Math.max(0, Math.min(100, Math.round(scoreSummary.score)));

  return {
    score: clamped,
    scoreSummary,
    confidence,
    auditTrail: buildAuditTrail(input),
    accuracyReport: buildAccuracyReport(input),
    methodAudit: buildMethodAudit(input),
    classicalReports: classical.reports,
    redFlags,
    strengths,
    fixes: [...new Set(fixes)],
    missingData,
    schoolReports: buildSchoolReports(input, findings, palaceFindings),
    decision: buildDecision(input, clamped, redFlags, strengths),
    nextChecks: buildNextChecks(input, redFlags, missingData)
  };
}

function evaluateDirectionalFactors(input) {
  const redFlags = [];
  const strengths = [];
  const fixes = [];
  const findings = [];
  const period = getSanYuanPeriod(input.builtYear);
  const buildingDirection = input.buildingFacingDegrees === null ? null : directionFromDegrees(input.buildingFacingDegrees);
  const unitDoorDirection = input.unitDoorDegrees === null ? null : directionFromDegrees(input.unitDoorDegrees);
  const buildingFacingMountain = input.buildingFacingDegrees === null ? null : mountainFromDegrees(input.buildingFacingDegrees);
  const buildingSittingMountain = input.buildingFacingDegrees === null ? null : sittingMountainFromFacingDegrees(input.buildingFacingDegrees);
  const unitDoorFacingMountain = input.unitDoorDegrees === null ? null : mountainFromDegrees(input.unitDoorDegrees);
  const effectiveBuildingDirection = effectiveDirection(input.buildingFacing, input.buildingFacingDegrees);
  const effectiveDoorDirection = effectiveDirection(input.unitDoorFacing, input.unitDoorDegrees);

  if (input.orientationAccuracy === "none") {
    const item = {
      title: "坐向量測精度不足",
      severity: "medium",
      score: 0,
      school: "玄空飛星 / 形勢派",
      text: "沒有建物或社區主要坐向時，玄空飛星與整體外局只能作假設，不能做強結論；這會降低判斷信心，但不代表房子本身變差。",
      buy: "買房建議至少補建物主入口或主要納氣面方向，正式決策最好用羅盤複核。",
      rent: "租房可先以本戶格局與現代居住條件判斷，但不要因模糊建物坐向做大額改裝。"
    };
    redFlags.push(item);
    findings.push(item);
  }

  if (input.orientationAccuracy === "phone") {
    const item = {
      title: "手機羅盤只能粗判",
      severity: "low",
      score: 0,
      school: "玄空飛星 / 八宅派",
      text: "手機羅盤易受磁場、金屬門框、電梯井影響；可用來分八方，但不適合直接判二十四山交界或兼向。這是資料信心問題，不應當作房屋吉凶扣分。",
      fix: "同一位置至少量三次，並避開鐵門、電箱、電梯與大型金屬家具。"
    };
    redFlags.push(item);
    findings.push(item);
  }

  if (input.orientationAccuracy === "compass" || input.orientationAccuracy === "pro") {
    const item = {
      title: "建物坐向可進入玄空初判",
      score: 0,
      school: "玄空飛星",
      text: `${facingAccuracyText(input.orientationAccuracy)}可讓建物坐向、二十四山與三元九運判斷更可靠。${buildingFacingMountain ? `建物約為「坐${buildingSittingMountain}、向${buildingFacingMountain}」。` : ""}量測精度提高的是判斷信心，不是直接加吉分。`
    };
    strengths.push(item);
    findings.push(item);
  }

  if (input.orientationAccuracy === "compass" || input.orientationAccuracy === "pro") {
    const item = {
      title: "本戶大門方向可進入門向判斷",
      score: 0,
      school: "八宅派 / 陽宅三要",
      text: `${facingAccuracyText(input.orientationAccuracy)}可讓本戶納氣口、門主灶與九宮門位判斷更可靠。${unitDoorFacingMountain ? `本戶大門約為「${unitDoorFacingMountain}向」。` : ""}量測精度提高的是判斷信心，不是直接加吉分。`
    };
    strengths.push(item);
    findings.push(item);
  }

  if (buildingDirection && input.buildingFacing !== "unknown" && buildingDirection !== input.buildingFacing) {
    const item = {
      title: "建物朝向欄位互相矛盾",
      severity: "medium",
      score: -8,
      school: "玄空飛星 / 形勢派",
      text: `建物精確度數 ${input.buildingFacingDegrees} 度屬於${labels[buildingDirection]}，但建物主要朝向選了${labels[input.buildingFacing]}。這會讓外局與玄空判斷失準。`,
      fix: "請重新確認是量社區主入口、建物主要臨路面，還是本戶門向；兩者不要混填。"
    };
    redFlags.push(item);
    findings.push(item);
  }

  if (unitDoorDirection && input.unitDoorFacing !== "unknown" && unitDoorDirection !== input.unitDoorFacing) {
    const item = {
      title: "本戶門向欄位互相矛盾",
      severity: "medium",
      score: -7,
      school: "八宅派 / 陽宅三要",
      text: `本戶大門度數 ${input.unitDoorDegrees} 度屬於${labels[unitDoorDirection]}，但本戶大門朝向選了${labels[input.unitDoorFacing]}。這會讓門主灶與九宮門位判斷失準。`,
      fix: "請站在屋內面向自家大門外量測，並用這個方向填本戶大門朝向。"
    };
    redFlags.push(item);
    findings.push(item);
  }

  if (input.buildingFacingDegrees !== null && isBoundaryDegree(input.buildingFacingDegrees)) {
    const item = {
      title: "建物坐向接近方位交界",
      severity: "medium",
      score: -4,
      school: "玄空飛星",
      text: `建物 ${input.buildingFacingDegrees} 度接近八方或二十四山交界，差幾度可能換山換卦。`,
      fix: "這類物件不建議只靠手機羅盤，至少用羅盤複測主入口、外明堂與屋中心。"
    };
    redFlags.push(item);
    findings.push(item);
  }

  if (input.unitDoorDegrees !== null && isBoundaryDegree(input.unitDoorDegrees)) {
    const item = {
      title: "本戶大門接近方位交界",
      severity: "medium",
      score: -3,
      school: "八宅派 / 陽宅三要",
      text: `本戶大門 ${input.unitDoorDegrees} 度接近八方或二十四山交界，門向判斷要保守。`,
      fix: "請在門內、門外、玄關中心各量一次，並記錄最大誤差。"
    };
    redFlags.push(item);
    findings.push(item);
  }

  if (period) {
    const item = {
      title: `三元九運：${period.name}`,
      score: 0,
      school: "玄空飛星",
      text: `${input.builtYear} 年約屬${period.name}。三元九運只能決定宅盤時間背景，不能單獨判吉凶；仍需坐山、向首、山星、向星、外局山水與是否翻修入伙一起判斷。`
    };
    findings.push(item);
  }

  if (period?.period === 8) {
    const item = {
      title: "八運屋跨入九運提醒",
      score: 0,
      school: "玄空飛星",
      text: "八運建成或入伙的房子不會因 2024 進入九運就自動變凶或變吉；需看原宅盤、外局、翻修入伙是否造成換運爭議。"
    };
    findings.push(item);
  }

  if (period?.period === 9 && effectiveBuildingDirection === "south") {
    const item = {
      title: "九運南向提示",
      score: 0,
      school: "玄空飛星",
      text: "九運與南方離火有象義呼應，但不能只因南向就判吉；仍需正式飛星盤與外局明堂、山水動靜配合。"
    };
    findings.push(item);
  }

  if (period?.period === 9 && effectiveBuildingDirection === "north" && input.living.includes("humid")) {
    const item = {
      title: "九運北向遇濕提醒",
      severity: "medium",
      score: 0,
      school: "玄空飛星 / 現代居住",
      text: "北方坎水與濕氣在象義上會讓人提高警覺，但真正扣分應回到實際濕度、漏水、採光與通風。"
    };
    findings.push(item);
  }

  if (effectiveBuildingDirection) {
    const meta = directionMeta[effectiveBuildingDirection];
    const item = {
      title: `建物方位五行：${labels[effectiveBuildingDirection]}向`,
      score: 0,
      school: "形勢派 / 玄空飛星 / 五行",
      text: `${labels[effectiveBuildingDirection]}向屬${meta.element}，卦象為${meta.trigrams}，象徵${meta.family}。建物朝向主要用來看外局、明堂、採光與玄空時間性。`
    };
    findings.push(item);
  }

  if (effectiveDoorDirection) {
    const meta = directionMeta[effectiveDoorDirection];
    const item = {
      title: `本戶門向五行：${labels[effectiveDoorDirection]}向`,
      score: 0,
      school: "八宅派 / 陽宅三要 / 五行",
      text: `${labels[effectiveDoorDirection]}門向屬${meta.element}，卦象為${meta.trigrams}，象徵${meta.family}。本戶大門主要用來看實際納氣、門主灶與日常出入。`
    };
    findings.push(item);
  }

  if (effectiveBuildingDirection && effectiveDoorDirection && effectiveBuildingDirection !== effectiveDoorDirection) {
    const item = {
      title: "建物朝向與本戶門向不同",
      severity: "low",
      score: -1,
      school: "形勢派 / 八宅派 / 玄空飛星",
      text: `建物主向為${labels[effectiveBuildingDirection]}，本戶門向為${labels[effectiveDoorDirection]}。這不是錯，但報告會分開處理：玄空偏建物，門主灶偏本戶。`
    };
    redFlags.push(item);
    findings.push(item);
  }

  return { redFlags, strengths, fixes, findings };
}

function evaluatePalaces(input) {
  const redFlags = [];
  const strengths = [];
  const fixes = [];
  const findings = [];
  const entries = Object.entries(input.palaces);

  const roomAt = (room) => entries.find(([, value]) => value === room)?.[0];
  const entryPalace = roomAt("entry");
  const bedroomPalace = roomAt("bedroom");
  const kitchenPalace = roomAt("kitchen");
  const toiletPalace = roomAt("toilet");
  const studyPalace = roomAt("study");
  const effectiveDoorDirection = effectiveDirection(input.unitDoorFacing, input.unitDoorDegrees);

  if (toiletPalace === "center") {
    const item = {
      title: "九宮：廁所落中宮",
      severity: "high",
      score: -16,
      school: "九宮 / 八宅 / 現代居住",
      text: "廁所在中宮比一般廁所問題更敏感，因為它落在全宅核心。",
      fix: "買房盡量避開；租房則要嚴格管理除濕、排風與氣味。"
    };
    redFlags.push(item);
    findings.push(item);
  }

  if (kitchenPalace === "north") {
    const item = {
      title: "九宮：廚房落北方坎水",
      severity: "medium",
      score: -6,
      school: "八宅 / 五行",
      text: "北方屬水、廚房屬火，簡化模型中會標示水火互制，需要看實際通風與爐位。",
      fix: "保持乾燥、排油煙，避免水槽與爐台正沖。"
    };
    redFlags.push(item);
    findings.push(item);
  }

  if (kitchenPalace === "southeast") {
    const item = {
      title: "九宮：廚房在東南",
      score: 4,
      school: "五行 / 現代居住",
      text: "東南常與財、風、木相關，若通風排煙好，廚房在此可視為中性偏佳。"
    };
    strengths.push(item);
    findings.push(item);
  }

  if (bedroomPalace === "northwest") {
    const item = {
      title: "九宮：主臥在乾宮",
      score: 4,
      school: "八宅 / 九宮",
      text: "西北乾宮象徵權威與穩定，作主臥通常可視為穩定加分，但仍需看床位是否被沖。"
    };
    strengths.push(item);
    findings.push(item);
  }

  if (studyPalace === "northeast" || studyPalace === "southeast") {
    const item = {
      title: "九宮：書房位置有利專注",
      score: 5,
      school: "九宮 / 現代居住",
      text: `${labels[studyPalace]}作書房，通常能對應學習、文昌或穩定專注的象徵。`
    };
    strengths.push(item);
    findings.push(item);
  }

  if (entryPalace && effectiveDoorDirection && entryPalace !== effectiveDoorDirection) {
    const item = {
      title: "門位與朝向需複核",
      severity: "low",
      score: -3,
      school: "八宅 / 玄空",
      text: `九宮門位在${labels[entryPalace]}，但本戶大門朝向為${labels[effectiveDoorDirection]}；這可能合理，也可能是把門所在方位與門朝出去方向混在一起。`,
      fix: "下次看房請分清楚門所在方位與門朝出去的方向。"
    };
    redFlags.push(item);
    findings.push(item);
  }

  return { redFlags, strengths, fixes, findings };
}

function uniqueFindings(items) {
  const seen = new Set();
  return items.filter((item) => {
    const key = `${item.title}|${item.school}|${item.text}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function rawWeightedItemScore(item, input) {
  const score = item.score || 0;
  return score * schoolWeightFactor(item, input) * accuracyFactor(item, input);
}

function calculateScoreSummary(input, strengths, redFlags) {
  const positiveRaw = strengths.reduce((sum, item) => sum + Math.max(0, rawWeightedItemScore(item, input)), 0);
  const negativeRaw = redFlags.reduce((sum, item) => sum + Math.abs(Math.min(0, rawWeightedItemScore(item, input))), 0);
  const contextRaw = contextAdjustments(input, redFlags);

  const baseScore = 63;
  const positiveImpact = 20 * Math.tanh(positiveRaw / 58);
  const negativeImpact = 31 * Math.tanh(negativeRaw / 52);
  const contextImpact = 8 * Math.tanh(contextRaw / 10);
  const score = baseScore + positiveImpact - negativeImpact + contextImpact;

  return {
    baseScore,
    positiveRaw,
    negativeRaw,
    contextRaw,
    positiveImpact,
    negativeImpact,
    contextImpact,
    score
  };
}

function schoolWeightFactor(item, input) {
  const school = item.school || "";
  const weights = [];
  if (school.includes("形勢")) weights.push(input.weights.form);
  if (school.includes("八宅") || school.includes("九宮") || school.includes("五行")) weights.push(input.weights.eight);
  if (school.includes("玄空")) weights.push(input.weights.flying);
  if (school.includes("陽宅三要")) weights.push(input.weights.three);
  if (school.includes("現代")) weights.push(input.weights.modern);
  if (!weights.length) return 1;
  const average = weights.reduce((sum, value) => sum + value, 0) / weights.length;
  return 0.45 + (average / 5) * 0.75;
}

function accuracyFactor(item, input) {
  const school = item.school || "";
  if (!school.includes("玄空") && !school.includes("八宅")) return 1;
  const accuracy = input.orientationAccuracy;
  const isFlying = school.includes("玄空");
  const degrees = isFlying ? input.buildingFacingDegrees : input.unitDoorDegrees;
  if (accuracy === "none") return 0.35;
  if (accuracy === "phone") return degrees === null ? 0.5 : 0.65;
  if (accuracy === "compass") return degrees === null ? 0.82 : 1;
  return degrees === null ? 0.9 : 1;
}

function contextAdjustments(input, redFlags) {
  let adjustment = 0;
  const highRiskCount = redFlags.filter((item) => item.severity === "high").length;

  if (input.purpose === "buy") {
    adjustment -= highRiskCount * 4;
    if (input.horizon === "long") adjustment -= highRiskCount * 2;
    if (input.condition === "excellent") adjustment += 4;
  }

  if (input.purpose === "rent") {
    adjustment += redFlags.filter((item) => item.fix).length >= 3 ? 3 : 0;
    if (input.horizon === "short") adjustment += 3;
    if (input.condition === "problem") adjustment -= 5;
  }

  if (input.budgetPressure === "high" && redFlags.length > 0) adjustment -= 2;
  if (input.homeType === "studio" && redFlags.length >= 5) adjustment -= 5;
  if (input.floor <= 1 && input.homeType !== "townhouse") adjustment -= 5;
  if (input.floor === input.totalFloors && input.totalFloors >= 4) adjustment -= 3;
  if (input.occupants >= 4 && input.homeType === "studio") adjustment -= 10;
  if (input.primaryGoal === "health" && redFlags.some((item) => item.title.includes("濕氣") || item.title.includes("噪音") || item.title.includes("床"))) adjustment -= 4;
  if (input.primaryGoal === "wealth" && redFlags.some((item) => item.title.includes("穿堂") || item.title.includes("大門見灶") || item.title.includes("明顯缺角"))) adjustment -= 3;
  if (input.primaryGoal === "study" && redFlags.some((item) => item.title.includes("噪音") || item.title.includes("樑壓"))) adjustment -= 3;
  if (input.primaryGoal === "relationship" && redFlags.some((item) => item.title.includes("床") || item.title.includes("隱私"))) adjustment -= 3;

  return adjustment;
}

function estimateConfidence(input, missingData) {
  let confidence = 55;
  confidence += input.orientationAccuracy === "phone" ? 6 : 0;
  confidence += input.orientationAccuracy === "compass" ? 18 : 0;
  confidence += input.orientationAccuracy === "pro" ? 24 : 0;
  confidence += input.buildingFacingDegrees !== null ? 4 : 0;
  confidence += input.unitDoorDegrees !== null ? 3 : 0;
  confidence += Object.values(input.palaces).filter((value) => value !== "unknown").length * 2;
  confidence += input.notes ? 4 : 0;
  confidence -= missingData.length * 5;
  return Math.max(20, Math.min(95, confidence));
}

function buildAccuracyReport(input) {
  return [
    {
      title: "坐向量測精度",
      value: facingAccuracyText(input.orientationAccuracy),
      scope: "同一組精度同時套用到建物坐向與本戶大門，用來判斷玄空、八宅、陽宅三要與二十四山的可信度。",
      impact: `${accuracyImpactText(input.orientationAccuracy, input.buildingFacingDegrees, "building")} ${accuracyImpactText(input.orientationAccuracy, input.unitDoorDegrees, "unit")}`
    }
  ];
}

function buildMethodAudit(input) {
  const hasBuildingDirection = Boolean(effectiveDirection(input.buildingFacing, input.buildingFacingDegrees));
  const hasUnitDirection = Boolean(effectiveDirection(input.unitDoorFacing, input.unitDoorDegrees));
  const hasKua = Boolean(calculateKuaNumber(input.residentBirthYear, input.residentGender));
  const hasCoreRooms = Object.values(input.palaces).includes("entry")
    && Object.values(input.palaces).includes("bedroom")
    && Object.values(input.palaces).includes("kitchen");

  return [
    {
      title: "形勢派",
      status: "可作初篩",
      text: "外局、明堂、路沖、反弓、壁刀、噪音與靠山可用表單初步判斷；仍需照片、現場視線與日夜人流校正。"
    },
    {
      title: "八宅派",
      status: hasKua && hasUnitDirection && hasCoreRooms ? "已加入命卦計算" : "資料不足",
      text: hasKua && hasUnitDirection && hasCoreRooms
        ? "目前已計算主要居住者命卦、東四 / 西四、四吉四凶方，並比對本戶門向、門位、主臥與灶。若只用手機羅盤，方向可信度仍需複核；另需注意出生年跨立春與多人同住權重。"
        : "八宅正式判斷需要本戶門向、門主灶位置與居住者命卦；資料不足時只能做格局提醒。"
    },
    {
      title: "玄空飛星",
      status: hasBuildingDirection && input.builtYear ? "已產生候選宅盤" : "資料不足",
      text: hasBuildingDirection && input.builtYear
        ? "已有建物坐向與年份，可產生運星盤與山 / 向星候選盤；若只用手機羅盤，仍需羅盤複核兼向、替卦、三元龍陰陽順逆、外局山水與流年。"
        : "玄空正式判斷需要建物坐山向首、建造或入伙年、是否大翻修、山水動靜與流年盤。"
    },
    {
      title: "紫白九星",
      status: input.annualStarYear ? "已產生年度盤" : "資料不足",
      text: input.annualStarYear
        ? "目前已產生流年紫白九星年度 overlay，預設以立春換盤；月盤、日盤與節氣精準切換需接入正式曆法引擎。"
        : "紫白九星需要流年年份；若要精準到日期邊界，需接入節氣與立春時刻。"
    },
    {
      title: "陽宅三要",
      status: hasCoreRooms && input.stoveMouthFacing !== "unknown" ? "已計算門主灶" : "資料不足",
      text: hasCoreRooms && input.stoveMouthFacing !== "unknown"
        ? "目前已比對門、主、灶所在宮位、門主同局與門灶五行，並納入爐口朝向。仍需爐位、水槽、床位與門路動線細節。"
        : "陽宅三要需要大門、主臥、廚房與爐口朝向；資料不足時只能做格局提醒。"
    },
    {
      title: "現代居住",
      status: "可作初篩",
      text: "採光、通風、濕氣、噪音、安全、隱私與屋況可作看房決策；這些不是傳統派盤，但能有效校正實住風險。"
    }
  ];
}

function accuracyImpactText(accuracy, degrees, scope) {
  const target = scope === "building" ? "建物坐向" : "本戶門向";
  if (accuracy === "none") return `${target}沒有量測，相關流派只作提示，分數會大幅降權。`;
  if (accuracy === "phone" && degrees === null) return `${target}標示為手機粗量但未填度數，只能低信心判八方，不能判二十四山。`;
  if (accuracy === "phone") return `${target}使用手機粗量，系統會保守採信：可判八方，但二十四山、交界與兼向會降權。`;
  if (accuracy === "compass" && degrees === null) return `${target}標示為羅盤量測但未填度數，可信度比手機高，但仍缺二十四山依據。`;
  if (accuracy === "compass") return `${target}使用羅盤量測，二十四山與交界判斷會正常採信，相關分數權重高於手機粗量。`;
  if (degrees === null) return `${target}標示為專業確認但未填度數，系統仍會提醒補度數，避免專業欄位空轉。`;
  return `${target}已專業確認，相關判斷會以最高信心採信；主要提升的是可信度與邊界判讀，不是額外替房屋加分。`;
}

function buildSchoolReports(input, findings, palaceFindings) {
  const weight = input.weights;
  const grouped = {
    form: findings.filter((item) => item.school?.includes("形勢")),
    eight: findings.filter((item) => item.school?.includes("八宅") || item.school?.includes("九宮")),
    flying: findings.filter((item) => item.school?.includes("玄空")),
    three: findings.filter((item) => item.school?.includes("陽宅三要")),
    modern: findings.filter((item) => item.school?.includes("現代"))
  };

  grouped.flying.push({
    title: "玄空飛星資料完整度",
    text: flyingStarDataText(input)
  });

  return [
    {
      key: "form",
      title: "形勢派",
      weight: weight.form,
      principle: "先看外局氣勢：明堂、靠山、道路、形煞、動線與藏風聚氣。",
      items: grouped.form
    },
    {
      key: "eight",
      title: "八宅派 / 九宮",
      weight: weight.eight,
      principle: "看門、房、灶、廁落宮與方位象徵，並比對居住者命卦與四吉四凶方。",
      items: grouped.eight
    },
    {
      key: "flying",
      title: "玄空飛星",
      weight: weight.flying,
      principle: "看時間與空間的旺衰氣；完整判斷需要精準坐向、建造或入伙年份、元運與流年。",
      items: grouped.flying
    },
    {
      key: "three",
      title: "陽宅三要",
      weight: weight.three,
      principle: "重點是門、主、灶三者是否互相支持，並避開廁、門沖與火水衝突。",
      items: grouped.three
    },
    {
      key: "modern",
      title: "現代居住科學",
      weight: weight.modern,
      principle: "用採光、通風、濕度、噪音、安全、隱私、維護成本校正傳統判斷。",
      items: grouped.modern
    }
  ].filter((school) => school.weight > 0);
}

function flyingStarDataText(input) {
  const period = getSanYuanPeriod(input.builtYear);
  const facingMountain = input.buildingFacingDegrees === null ? null : mountainFromDegrees(input.buildingFacingDegrees);
  const sittingMountain = input.buildingFacingDegrees === null ? null : sittingMountainFromFacingDegrees(input.buildingFacingDegrees);
  if (input.orientationAccuracy === "none") return "目前缺少坐向量測，玄空飛星只能列為資料缺口，相關加扣分已大幅降權。";
  if (input.buildingFacingDegrees === null) return "雖然有坐向量測精度等級，但沒有輸入建物度數，仍無法判二十四山；玄空相關判斷會保守處理。";
  return `建物朝向 ${input.buildingFacingDegrees} 度，約屬${labels[directionFromDegrees(input.buildingFacingDegrees)]}向，二十四山為坐${sittingMountain}、向${facingMountain}；${period ? `${input.builtYear} 年屬${period.name}` : "建造或入伙年份不足"}。目前仍是初篩，正式飛星需再排山星、向星、運星，並確認翻修入伙與外局山水。`;
}

function buildDecision(input, score, redFlags, strengths) {
  const highRisks = redFlags.filter((item) => item.severity === "high");
  const mode = input.purpose === "buy" ? "買房" : "租房";

  if (input.purpose === "buy") {
    if (highRisks.length >= 2 || score < 55) {
      return {
        label: "不建議直接出價",
        tone: "danger",
        text: "除非價格有非常明顯折讓，否則建議先暫停。買房要保守處理不可逆外局、漏水、噪音與中宮廁等長期問題。"
      };
    }
    if (score < 72) {
      return {
        label: "可二訪但需議價",
        tone: "warn",
        text: "可列入備選，但需要用驗屋、夜間二訪、管委會資料與價格折讓補足風險。"
      };
    }
    return {
      label: "可列入優先名單",
      tone: "good",
      text: "目前條件在買房初篩中表現不錯，下一步應補精準坐向、漏水與噪音實測，避免漂亮格局藏硬傷。"
    };
  }

  if (highRisks.length >= 3 || score < 50) {
    return {
      label: "租房也偏冒險",
      tone: "danger",
      text: "短租也可能被噪音、濕氣或安全動線拖累。若要租，應要求短約、修繕條款與明顯租金折讓。"
    };
  }
  if (score < 70) {
    return {
      label: "可租但要談條件",
      tone: "warn",
      text: "租房可以接受較多可改善缺點，但要把除濕、隔音、家具調整、退租彈性寫進成本。"
    };
  }
  return {
    label: `${mode}適配度高`,
    tone: "good",
    text: "以租房角度看，條件相對友善；仍建議晚上實看一次，確認噪音、隱私與濕氣。"
  };
}

function buildNextChecks(input, redFlags, missingData) {
  const effectiveDoorDirection = effectiveDirection(input.unitDoorFacing, input.unitDoorDegrees);
  const checks = [
    "白天、晚上、假日各看一次，分別確認採光、噪音、人流與停車。",
    "拍攝大門、客廳窗、主臥床位、廚房爐台、廁所與外部道路照片。",
    "確認是否有漏水、壁癌、霉味、窗框滲水、天花板修補痕跡。"
  ];

  if (!effectiveDoorDirection) {
    checks.unshift("用手機羅盤先量大門朝向，再記錄門所在九宮與門朝出去的方向。");
  } else if (input.unitDoorDegrees === null) {
    checks.unshift("已填本戶大門朝向，但建議補量大門度數，並同時記錄門所在九宮與門朝出去的方向。");
  } else if (input.unitDoorFacing === "unknown") {
    checks.unshift("已填本戶大門度數，建議同步確認八方門向標示，避免後續閱讀報告時混淆。");
  }

  if (input.purpose === "buy") {
    checks.push("買房加查：實價登錄、管委會紀錄、修繕基金、鄰損、消防與逃生動線。");
  } else {
    checks.push("租房加查：修繕責任、可否釘牆、可否加裝除濕或窗簾、提前退租條款。");
  }

  if (redFlags.some((item) => item.title.includes("噪音") || item.title.includes("路沖"))) {
    checks.push("針對道路與噪音，用手機分貝 App 在臥室與客廳各測 3 分鐘。");
  }
  if (input.orientationAccuracy === "phone" || input.buildingFacingDegrees === null) {
    checks.push("建物坐向複核：在社區主入口、主要臨路明堂、建物中心線各記錄一次，確認哪個才是主要納氣面。");
  }
  if (input.orientationAccuracy === "phone" || input.unitDoorDegrees === null) {
    checks.push("本戶門向複核：站在屋內面向自家大門外量一次、門外回量一次、玄關中心再量一次，三次差異若超過 5 度需重測。");
  }
  if (input.builtYear >= 2004 && input.builtYear <= 2023) {
    checks.push("此物件可能屬八運屋，若近期大翻修或重新入伙，需確認是否有換運爭議。");
  }
  if (missingData.length) checks.push("補齊缺漏資料後重新評估，避免用模糊輸入做過度判斷。");

  return [...new Set(checks)];
}

function calculateKuaNumber(year, gender) {
  if (!year || gender === "unknown") return null;
  const lastTwo = year % 100;
  const reduced = reduceToSingleDigit(lastTwo);
  let kua;
  if (gender === "male") {
    kua = year >= 2000 ? 9 - reduced : 10 - reduced;
    if (kua <= 0) kua += 9;
    if (kua === 5) kua = 2;
  } else {
    kua = year >= 2000 ? 6 + reduced : 5 + reduced;
    kua = reduceToSingleDigit(kua);
    if (kua === 5) kua = 8;
  }
  return kua;
}

function reduceToSingleDigit(value) {
  let number = Math.abs(Number(value || 0));
  while (number > 9) {
    number = String(number).split("").reduce((sum, digit) => sum + Number(digit), 0);
  }
  return number;
}

function invertBazhaiChart(chart) {
  const result = {};
  Object.entries(chart).forEach(([key, value]) => {
    if (key !== "group") result[value] = key;
  });
  return result;
}

function elementRelation(fromElement, toElement) {
  if (!fromElement || !toElement) return { label: "資料不足", score: 0 };
  if (fromElement === toElement) return { label: "比和", score: 2 };
  if (elementGenerates[fromElement] === toElement) return { label: "相生", score: 3 };
  if (elementGenerates[toElement] === fromElement) return { label: "受生", score: 2 };
  if (elementControls[fromElement] === toElement) return { label: "相剋", score: -4 };
  if (elementControls[toElement] === fromElement) return { label: "受剋", score: -3 };
  return { label: "平", score: 0 };
}

function oppositeDirection(direction) {
  const index = directionOrder.indexOf(direction);
  if (index < 0) return null;
  return directionOrder[(index + 4) % 8];
}

function flyStars(centerStar, forward) {
  const path = ["center", "northwest", "west", "northeast", "south", "north", "southwest", "east", "southeast"];
  const chart = {};
  path.forEach((palace, index) => {
    const offset = forward ? index : -index;
    chart[palace] = normalizeStar(centerStar + offset);
  });
  return chart;
}

function normalizeStar(value) {
  return ((value - 1 + 9) % 9) + 1;
}

function formatStarChart(chart) {
  return ["northwest", "north", "northeast", "west", "center", "east", "southwest", "south", "southeast"]
    .map((direction) => `${labels[direction]}${chart[direction]}`)
    .join("、");
}

function formatStarChartWithNames(chart) {
  return ["northwest", "north", "northeast", "west", "center", "east", "southwest", "south", "southeast"]
    .map((direction) => `${labels[direction]}${chart[direction]}${nineStarMeta[chart[direction]].name}`)
    .join("、");
}

function annualCenterStar(year) {
  return normalizeStar(2027 - year);
}

function getSanYuanPeriod(year) {
  if (!year) return null;
  const periods = [
    { period: 6, name: "六運（1964-1983）", start: 1964, end: 1983 },
    { period: 7, name: "七運（1984-2003）", start: 1984, end: 2003 },
    { period: 8, name: "八運（2004-2023）", start: 2004, end: 2023 },
    { period: 9, name: "九運（2024-2043）", start: 2024, end: 2043 }
  ];
  const found = periods.find((item) => year >= item.start && year <= item.end);
  return found ? { ...found, current: found.period === 9 } : { period: null, name: "非近代常用三元九運範圍", current: false };
}

function directionFromDegrees(degrees) {
  const normalized = ((degrees % 360) + 360) % 360;
  if (normalized >= 337.5 || normalized < 22.5) return "north";
  if (normalized < 67.5) return "northeast";
  if (normalized < 112.5) return "east";
  if (normalized < 157.5) return "southeast";
  if (normalized < 202.5) return "south";
  if (normalized < 247.5) return "southwest";
  if (normalized < 292.5) return "west";
  return "northwest";
}

function mountainFromDegrees(degrees) {
  const normalized = ((degrees % 360) + 360) % 360;
  const index = Math.floor(((normalized + 7.5) % 360) / 15);
  return twentyFourMountains[index];
}

function sittingMountainFromFacingDegrees(degrees) {
  return mountainFromDegrees(degrees + 180);
}

function isBoundaryDegree(degrees) {
  const normalized = ((degrees % 360) + 360) % 360;
  const eightRemainder = normalized % 45;
  const mountainRemainder = normalized % 15;
  return Math.min(eightRemainder, 45 - eightRemainder) <= 2 || Math.min(mountainRemainder, 15 - mountainRemainder) <= 1.5;
}

function verdict(score) {
  if (score >= 84) return "非常適合，適合優先追蹤";
  if (score >= 72) return "整體不錯，補資料後可決策";
  if (score >= 58) return "可二訪，但需議價與修正";
  if (score >= 45) return "風險偏高，需保守";
  return "不建議貿然承接";
}

function render(input, result) {
  overallScore.textContent = result.score;
  overallVerdict.textContent = `${verdict(result.score)}｜判斷信心 ${result.confidence}%`;
  scoreBar.style.width = `${result.score}%`;

  report.innerHTML = `
    ${card("決策結論", `<div class="report-head"><div><h2>${result.decision.label}</h2><p class="muted">${result.decision.text}</p></div><span class="badge ${result.decision.tone}">${labels[input.purpose]}模式</span></div>
      ${summaryMatrix(input, result)}`)}
    ${card("重大紅旗", renderList(result.redFlags.map((item) => renderFinding(item, input.purpose)), "沒有觸發重大紅旗，但仍需現場確認漏水、噪音與坐向。"), badge(result.redFlags.length, result.redFlags.length >= 2 ? "danger" : "warn"))}
    ${card("主要優勢", renderList(result.strengths.map((item) => renderFinding(item, input.purpose)), "目前沒有明顯優勢，建議補更多平面圖與外部環境資料。"), badge(result.strengths.length, "good"))}
    ${card("可改善與不可逆判斷", renderList(result.fixes, "目前沒有明確改善建議；維持通風、乾燥、清爽動線即可。"), `<span class="badge">優先低成本</span>`)}
    ${card("三大風水計算", renderClassicalReports(result.classicalReports), `<span class="badge good">新增計算模組</span>`)}
    ${card("規則與版本", renderAuditTrail(input), `<span class="badge neutral">可稽核</span>`)}
    ${card("算法符合度", renderMethodAudit(result.methodAudit), `<span class="badge warn">初篩不是正式派盤</span>`)}
    ${card("量測精度判讀", renderAccuracyReport(result.accuracyReport), `<span class="badge warn">影響分數與信心</span>`)}
    ${card("流派分流解析", renderSchools(result.schoolReports), `<span class="badge">權重已套用</span>`)}
    ${card("資料缺口", renderList(result.missingData, "資料完整度不錯；若要更精準，下一步可加入平面圖與照片。"), `<span class="badge warn">信心 ${result.confidence}%</span>`)}
    ${card("下次看房清單", renderList(result.nextChecks, "暫無"), `<span class="badge">現場驗證</span>`)}
  `;
}

function buildCaseRecord(input, result, existing = {}) {
  return {
    id: existing.id || `case-${Date.now()}-${Math.random().toString(16).slice(2)}`,
    name: input.caseName || existing.name || `未命名物件 ${comparisonCases.length + 1}`,
    createdAt: existing.createdAt || new Date().toISOString(),
    input,
    result: {
      score: result.score,
      confidence: result.confidence,
      decision: result.decision,
      redFlagCount: result.redFlags.length,
      strengthCount: result.strengths.length,
      missingDataCount: result.missingData.length,
      auditTrail: result.auditTrail,
      classicalReports: result.classicalReports
    }
  };
}

function syncComparisonActionState() {
  addComparison.textContent = editingComparisonId ? "更新比較物件" : "加入比較";
}

function safeFilenamePart(value, fallback = "untitled") {
  const normalized = String(value || "")
    .trim()
    .replace(/[<>:"/\\|?*\u0000-\u001F]/g, " ")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return normalized || fallback;
}

function renderComparison() {
  if (!comparisonCases.length) {
    comparisonPanel.innerHTML = `
      <article class="panel empty-state">
        <p class="section-label">COMPARE</p>
        <h2>多物件比較</h2>
        <p>按「加入比較」後，這裡會列出多個物件的分數、信心、紅旗、優勢與決策建議。</p>
        <div class="mini-actions">
          <button type="button" class="secondary mini-button" data-action="import-all">匯入比較 JSON</button>
        </div>
      </article>
    `;
    syncComparisonActionState();
    return;
  }

  const sorted = [...comparisonCases].sort((a, b) => b.result.score - a.result.score);
  const baselinePreset = sorted[0]?.input?.weightPreset || "custom";
  const baselineWeights = sorted[0]?.input?.weights;
  comparisonPanel.innerHTML = `
    <article class="panel report-card">
      <div class="report-head">
        <h3>多物件比較</h3>
        <span class="badge good">${comparisonCases.length} 件</span>
      </div>
      <p class="muted">比較分數已統一使用同一組權重：${weightPresetText(baselinePreset)}${baselineWeights ? `｜形勢 ${baselineWeights.form} / 八宅 ${baselineWeights.eight} / 玄空 ${baselineWeights.flying} / 陽宅 ${baselineWeights.three} / 現代 ${baselineWeights.modern}` : ""}</p>
      <div class="mini-actions">
        <button type="button" class="secondary mini-button" data-action="export-all">匯出比較 JSON</button>
        <button type="button" class="secondary mini-button" data-action="import-all">匯入比較 JSON</button>
      </div>
      <div class="matrix">
        ${sorted.map((item, index) => `
          <div class="mini comparison-item ${item.id === editingComparisonId ? "is-editing" : ""}">
            <h4>${index + 1}. ${escapeHtml(item.name)}｜${item.result.score} 分</h4>
            <p>信心 ${item.result.confidence}%｜紅旗 ${item.result.redFlagCount}｜優勢 ${item.result.strengthCount}｜缺資料 ${item.result.missingDataCount}</p>
            <p>${escapeHtml(item.result.decision.label)}：${escapeHtml(item.result.decision.text)}</p>
            <div class="mini-actions">
              <button type="button" class="secondary mini-button" data-action="edit-case" data-case-id="${item.id}">${item.id === editingComparisonId ? "編輯中" : "編輯"}</button>
              <button type="button" class="secondary mini-button" data-action="remove-case" data-case-id="${item.id}">移除</button>
            </div>
          </div>
        `).join("")}
      </div>
    </article>
  `;
  syncComparisonActionState();
}

function exportPayload() {
  const input = serializeFormInput();
  const result = latestResult || evaluate(input);
  return {
    exportedAt: new Date().toISOString(),
    app: "feng-shui-calculator-pro",
    profile: schoolProfile,
    current: buildCaseRecord(input, result),
    comparisons: comparisonCases
  };
}

function exportSinglePayload() {
  const input = serializeFormInput();
  const result = latestResult || evaluate(input);
  return buildCaseRecord(input, result);
}

function exportComparisonPayload() {
  const baseline = currentComparisonBaseline();
  rebuildComparisonCases(baseline);
  const current = applyComparisonWeights(serializeFormInput(), baseline.weights, baseline.preset);
  const currentResult = latestResult || evaluate(current);
  return {
    exportedAt: new Date().toISOString(),
    app: "feng-shui-calculator-pro",
    type: "comparison-bundle",
    profile: schoolProfile,
    baseline,
    current: buildCaseRecord(current, currentResult),
    comparisons: comparisonCases
  };
}

function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function importPayload(payload) {
  const current = payload.current?.input || payload.input || payload;
  if (current) {
    applyInputData(current);
    hasGeneratedReport = true;
    form.requestSubmit();
  }
  comparisonCases = Array.isArray(payload.comparisons) ? payload.comparisons : [];
  renderComparison();
}

function importSinglePayload(payload) {
  const current = payload.current?.input || payload.input || payload;
  if (!current) throw new Error("找不到可匯入的物件資料。");
  applyInputData(current);
  editingComparisonId = null;
  hasGeneratedReport = true;
  form.requestSubmit();
}

function importComparisonPayload(payload) {
  const importedCases = Array.isArray(payload.comparisons)
    ? payload.comparisons
    : Array.isArray(payload.cases)
      ? payload.cases
      : [];
  if (!importedCases.length) throw new Error("找不到可匯入的多物件比較資料。");
  comparisonCases = importedCases;
  const baseline = payload.baseline || currentComparisonBaseline();
  if (baseline?.preset && baseline.preset !== "custom") {
    applyWeightPreset(baseline.preset);
  }
  if (baseline?.weights) {
    form.elements.weightForm.value = baseline.weights.form;
    form.elements.weightEight.value = baseline.weights.eight;
    form.elements.weightFlying.value = baseline.weights.flying;
    form.elements.weightThree.value = baseline.weights.three;
    form.elements.weightModern.value = baseline.weights.modern;
    form.elements.weightPreset.value = baseline.preset || detectWeightPreset(baseline.weights);
  }
  if (payload.current?.input) {
    applyInputData(payload.current.input);
    hasGeneratedReport = true;
    form.requestSubmit();
  }
  editingComparisonId = null;
  syncComparisonBaselineFromForm();
  renderComparison();
}

function rerenderCurrentAssessment() {
  if (!hasGeneratedReport) return;
  const input = readInput();
  input.notes = escapeHtml(input.notes);
  const result = evaluate(input);
  latestResult = result;
  render(input, result);
}

function syncComparisonBaselineFromForm() {
  if (!comparisonCases.length) return;
  const baseline = currentComparisonBaseline();
  rebuildComparisonCases(baseline);
  renderComparison();
}

function startEditingComparisonCase(caseId) {
  const item = comparisonCases.find((entry) => entry.id === caseId);
  if (!item) return;
  editingComparisonId = caseId;
  applyInputData(item.input);
  hasGeneratedReport = true;
  rerenderCurrentAssessment();
  renderComparison();
}

function removeComparisonCase(caseId) {
  comparisonCases = comparisonCases.filter((entry) => entry.id !== caseId);
  if (editingComparisonId === caseId) editingComparisonId = null;
  renderComparison();
}

function card(title, content, right = "") {
  return `
    <article class="panel report-card">
      <div class="report-head">
        <h3>${title}</h3>
        ${right}
      </div>
      ${content}
    </article>
  `;
}

function badge(text, tone = "") {
  return `<span class="badge ${tone}">${text} 項</span>`;
}

function renderFinding(item, purpose = "buy") {
  const modeText = purpose === "rent" ? item.rent : item.buy;
  const extra = [modeText, item.fix].filter(Boolean).join(" ");
  return `<strong>${item.title}</strong>｜${item.school || "綜合"}：${item.text}${extra ? `<br>${extra}` : ""}`;
}

function renderList(items, fallback) {
  if (!items.length) return `<p class="muted">${fallback}</p>`;
  return `<ul class="list">${items.map((item) => `<li>${item}</li>`).join("")}</ul>`;
}

function renderAccuracyReport(items) {
  return `<div class="matrix">${items.map((item) => `
    <div class="mini">
      <h4>${item.title}｜${item.value}</h4>
      <p>${item.scope}</p>
      <p>${item.impact}</p>
    </div>
  `).join("")}</div>`;
}

function renderMethodAudit(items) {
  return `<div class="matrix">${items.map((item) => `
    <div class="mini">
      <h4>${item.title}｜${item.status}</h4>
      <p>${item.text}</p>
    </div>
  `).join("")}</div>`;
}

function renderClassicalReports(reports) {
  return `<div class="matrix">${reports.map((report) => `
    <div class="mini">
      <h4>${report.title}｜${report.status}</h4>
      ${renderList(report.items, "暫無可顯示資料。")}
    </div>
  `).join("")}</div>`;
}

function renderAuditTrail(input) {
  return renderList(buildAuditTrail(input), "暫無規則資訊。");
}

function buildAuditTrail(input) {
  return [
    `School profile：${schoolProfile.version}`,
    `權重預設：${weightPresetText(input.weightPreset)}`,
    `換年模式：${input.yearBoundaryMode === "liChun" ? "立春換年" : "農曆新年換年"}`,
    `採向規則：${orientationRuleText(input.orientationRule)}`,
    `北向基準：${northReferenceText(input.northReference)}`,
    `宅運依據：${input.periodBasis === "renovation" ? "重大翻修 / 換天心" : "建成 / 入伙"}`,
    `玄空版本：${schoolProfile.xuanKongVariant}`,
    `紫白版本：${schoolProfile.annualStarVariant}`,
    `二十四山：${schoolProfile.twentyFourMountainReference}`,
    "注意：目前未接入 IANA tzdb、HKO 節氣表、WMM2025 磁偏角與 GeographicLib 測地線，相關欄位以使用者輸入與真北假設為準。"
  ];
}

function orientationRuleText(value) {
  return {
    qiMouth: "採氣面 / 明堂",
    mainDoor: "大門",
    facade: "主立面",
    siteMountain: "坐山 / 後靠"
  }[value] || value;
}

function northReferenceText(value) {
  return {
    true: "真北",
    magnetic: "磁北 / 手機羅盤",
    grid: "格網北"
  }[value] || value;
}

function summaryMatrix(input, result) {
  const period = getSanYuanPeriod(input.builtYear);
  const effectiveBuildingDirection = effectiveDirection(input.buildingFacing, input.buildingFacingDegrees);
  const effectiveDoorDirection = effectiveDirection(input.unitDoorFacing, input.unitDoorDegrees);
  const buildingFacingMountain = input.buildingFacingDegrees === null ? "未填" : mountainFromDegrees(input.buildingFacingDegrees);
  const buildingSittingMountain = input.buildingFacingDegrees === null ? "未填" : sittingMountainFromFacingDegrees(input.buildingFacingDegrees);
  const unitDoorMountain = input.unitDoorDegrees === null ? "未填" : mountainFromDegrees(input.unitDoorDegrees);
  return `
    <div class="matrix">
      <div class="mini"><h4>基本資料</h4><p>${labels[input.homeType]}，${labels[input.horizon]}，${input.occupants} 人，需求：${labels[input.primaryGoal]}。</p></div>
      <div class="mini"><h4>建物坐向</h4><p>主要朝向：${labels[effectiveBuildingDirection || "unknown"]}；度數：${input.buildingFacingDegrees ?? "未填"}；坐山：${buildingSittingMountain}；向首：${buildingFacingMountain}；精度：${facingAccuracyText(input.orientationAccuracy)}。</p></div>
      <div class="mini"><h4>本戶大門</h4><p>門向：${labels[effectiveDoorDirection || "unknown"]}；度數：${input.unitDoorDegrees ?? "未填"}；門向二十四山：${unitDoorMountain}；精度：${facingAccuracyText(input.orientationAccuracy)}。</p></div>
      <div class="mini"><h4>決策信心</h4><p>${result.confidence}%。信心分數代表輸入資料完整度，不代表房子好壞。</p></div>
      <div class="mini"><h4>三元九運 / 流年</h4><p>${period ? `${input.builtYear} 年約屬${period.name}。` : "建造 / 入伙年份未填，玄空時間因素不足。"}流年紫白：${input.annualStarYear || "未填"}。${input.budgetPressure === "high" ? "預算壓力高，缺點必須反映在價格。" : ""}</p></div>
    </div>
  `;
}

function facingAccuracyText(value) {
  return {
    none: "沒有量測",
    phone: "手機粗量",
    compass: "羅盤量測",
    pro: "專業確認"
  }[value];
}

function renderSchools(schools) {
  return `<div class="matrix">${schools.map((school) => `
    <div class="mini">
      <h4>${school.title}｜權重 ${school.weight}/5</h4>
      <p>${school.principle}</p>
      ${renderList(school.items.map((item) => `<strong>${item.title}</strong>：${item.text}`), "此流派目前沒有觸發明顯訊號。")}
    </div>
  `).join("")}</div>`;
}

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  hasGeneratedReport = true;
  const input = readInput();
  input.notes = escapeHtml(input.notes);
  const result = evaluate(input);
  latestResult = result;
  render(input, result);
});

form.addEventListener("change", (event) => {
  if (!hasGeneratedReport || event.target.type === "reset") return;
  form.requestSubmit();
});

form.addEventListener("input", (event) => {
  if (!hasGeneratedReport || event.target.type === "range") return;
  if (event.target.matches("input[type='number'], textarea")) form.requestSubmit();
});

document.querySelectorAll(".school-sliders input[type='range']").forEach((slider) => {
  slider.addEventListener("input", () => {
    form.elements.weightPreset.value = detectWeightPreset({
      form: form.elements.weightForm.value,
      eight: form.elements.weightEight.value,
      flying: form.elements.weightFlying.value,
      three: form.elements.weightThree.value,
      modern: form.elements.weightModern.value
    });
    rerenderCurrentAssessment();
    syncComparisonBaselineFromForm();
  });
});

weightPreset.addEventListener("change", () => {
  if (weightPreset.value !== "custom") applyWeightPreset(weightPreset.value);
  rerenderCurrentAssessment();
  syncComparisonBaselineFromForm();
});

form.addEventListener("reset", () => {
  requestAnimationFrame(() => {
    hasGeneratedReport = false;
    latestResult = null;
    editingComparisonId = null;
    applyWeightPreset("buyConservative");
    overallScore.textContent = "--";
    overallVerdict.textContent = "完成輸入後產生報告";
    scoreBar.style.width = "0";
    report.innerHTML = `
      <article class="panel empty-state">
        <p class="section-label">REPORT</p>
        <h2>等待輸入</h2>
        <p>完成左側資料後，這裡會產生紅旗、優勢、買房/租房決策、流派解析、改善優先序與下次看房清單。</p>
      </article>
    `;
  });
});

addComparison.addEventListener("click", () => {
  const baseline = currentComparisonBaseline();
  rebuildComparisonCases(baseline);
  const input = applyComparisonWeights(serializeFormInput(), baseline.weights, baseline.preset);
  const result = evaluate(input);
  latestResult = result;
  hasGeneratedReport = true;
  render(input, result);
  if (editingComparisonId) {
    const existing = comparisonCases.find((item) => item.id === editingComparisonId);
    comparisonCases = comparisonCases.map((item) => (
      item.id === editingComparisonId ? buildCaseRecord(input, result, existing || item) : item
    ));
    editingComparisonId = null;
  } else {
    comparisonCases.push(buildCaseRecord(input, result));
  }
  renderComparison();
});

comparisonPanel.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) return;
  const caseId = button.dataset.caseId;
  if (button.dataset.action === "export-all") {
    const bundle = exportComparisonPayload();
    const bundleName = safeFilenamePart(bundle.current?.name || comparisonCases[0]?.name || "comparison");
    downloadJson(`feng-shui-comparisons-${bundleName}-${new Date().toISOString().slice(0, 10)}.json`, bundle);
    return;
  }
  if (button.dataset.action === "import-all") {
    importMode = "comparison";
    importFile.click();
    return;
  }
  if (!caseId) return;
  if (button.dataset.action === "edit-case") startEditingComparisonCase(caseId);
  if (button.dataset.action === "remove-case") removeComparisonCase(caseId);
});

exportData.addEventListener("click", () => {
  const payload = exportSinglePayload();
  const objectName = safeFilenamePart(payload.name || form.elements.caseName.value || "single-case");
  downloadJson(`feng-shui-object-${objectName}.json`, payload);
});

importData.addEventListener("click", () => {
  importMode = "single";
  importFile.click();
});

importFile.addEventListener("change", async () => {
  const file = importFile.files?.[0];
  if (!file) return;
  try {
    const payload = JSON.parse(await file.text());
    if (importMode === "comparison") {
      importComparisonPayload(payload);
    } else {
      importSinglePayload(payload);
    }
  } catch (error) {
    alert(`匯入失敗：${error.message}`);
  } finally {
    importMode = "single";
    importFile.value = "";
  }
});

loadSample.addEventListener("click", () => {
  form.purpose.value = "buy";
  form.horizon.value = "long";
  form.homeType.value = "apartment";
  form.occupants.value = 3;
  form.primaryGoal.value = "balanced";
  form.budgetPressure.value = "medium";
  form.residentBirthYear.value = 1988;
  form.residentGender.value = "male";
  form.yearBoundaryMode.value = "liChun";
  applyWeightPreset("buyConservative");
  form.buildingFacing.value = "south";
  form.orientationRule.value = "qiMouth";
  form.northReference.value = "true";
  form.orientationAccuracy.value = "phone";
  form.buildingFacingDegrees.value = 176;
  form.unitDoorFacing.value = "southeast";
  form.unitDoorDegrees.value = 138;
  form.stoveMouthFacing.value = "east";
  form.builtYear.value = 2016;
  form.periodBasis.value = "completion";
  form.annualStarYear.value = 2026;
  form.floor.value = 8;
  form.totalFloors.value = 15;
  form.condition.value = "normal";
  form.notes.value = "三房兩廳，客廳朝南，旁邊有公園；大門進去可看到陽台，主臥在西北，廚房在東南。";

  Object.entries({
    southeast: "kitchen",
    south: "living",
    southwest: "guestRoom",
    east: "entry",
    center: "storage",
    west: "toilet",
    northeast: "study",
    north: "balcony",
    northwest: "bedroom"
  }).forEach(([palace, room]) => {
    form.elements[`palace_${palace}`].value = room;
  });

  document.querySelectorAll("input[type='checkbox']").forEach((node) => {
    node.checked = [
      "brightHall",
      "backSupport",
      "doorToBalcony",
      "regularShape",
      "goodCommand",
      "excellentLight",
      "privacy",
      "safeAccess",
      "storage"
    ].includes(node.value);
  });

  form.requestSubmit();
});

initPalaceGrid();
applyWeightPreset("buyConservative");
