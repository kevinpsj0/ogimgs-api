import { randomBytes } from "crypto";
import { readFileSync, writeFileSync, existsSync, mkdirSync } from "fs";
import { join } from "path";

const DATA_DIR = join(process.cwd(), "data");
const KEYS_FILE = join(DATA_DIR, "api-keys.json");

export type Tier = "free" | "pro" | "business";

export interface ApiKeyRecord {
  key: string;
  tier: Tier;
  email: string;
  createdAt: string;
  usageToday: number;
  lastUsedDate: string;
}

interface KeysStore {
  keys: Record<string, ApiKeyRecord>;
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) {
    mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readKeys(): KeysStore {
  ensureDataDir();
  if (!existsSync(KEYS_FILE)) {
    return { keys: {} };
  }
  const data = readFileSync(KEYS_FILE, "utf-8");
  return JSON.parse(data);
}

function writeKeys(store: KeysStore) {
  ensureDataDir();
  writeFileSync(KEYS_FILE, JSON.stringify(store, null, 2));
}

export function generateApiKey(email: string, tier: Tier = "free"): ApiKeyRecord {
  const key = `og_${tier}_${randomBytes(24).toString("hex")}`;
  const record: ApiKeyRecord = {
    key,
    tier,
    email,
    createdAt: new Date().toISOString(),
    usageToday: 0,
    lastUsedDate: new Date().toISOString().split("T")[0],
  };
  const store = readKeys();
  store.keys[key] = record;
  writeKeys(store);
  return record;
}

export function validateApiKey(key: string): ApiKeyRecord | null {
  const store = readKeys();
  return store.keys[key] || null;
}

export function incrementUsage(key: string): ApiKeyRecord | null {
  const store = readKeys();
  const record = store.keys[key];
  if (!record) return null;

  const today = new Date().toISOString().split("T")[0];
  if (record.lastUsedDate !== today) {
    record.usageToday = 0;
    record.lastUsedDate = today;
  }
  record.usageToday++;
  writeKeys(store);
  return record;
}

export function getLimit(tier: Tier): number {
  switch (tier) {
    case "free":
      return 50;
    case "pro":
      return 1000;
    case "business":
      return 10000;
    default:
      return 50;
  }
}
