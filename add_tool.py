import os
import json
import requests
from urllib.parse import urlparse
from notion_client import Client as NotionClient
from openai import OpenAI
import google.generativeai as genai
from dotenv import load_dotenv

def normalize_url(u: str) -> str:
  s = u.strip()
  if not s:
    raise ValueError("Empty URL")
  p = urlparse(s)
  if not p.scheme:
    s = "https://" + s
  return s

def fetch_markdown(u: str) -> str:
  r = requests.get("https://r.jina.ai/" + u, timeout=30)
  r.raise_for_status()
  return r.text

def analyze(md: str) -> dict:
  categories = ["Video","Image","Coding","Chatbot","SEO","Writing"]
  provider = (os.getenv("LLM_PROVIDER") or "gemini").strip().lower()
  if provider == "openai":
    prompt = {
      "role": "user",
      "content": (
        "You are an expert product analyst. Read the content and return STRICT JSON with keys: "
        "name_en, desc_en, pricing, name_zh_tw, desc_zh_tw, name_zh_cn, desc_zh_cn, category. "
        "Rules: pricing must be one of Free, Freemium, Paid, Free Trial. "
        "Category must be one of " + ", ".join(categories) + ". "
        "Descriptions must be one sentence, professional and exciting. "
        "Chinese names should preserve brand English words but translate generic parts. "
        "Input Content:\n" + md
      )
    }
    client = OpenAI()
    resp = client.chat.completions.create(model="gpt-4o", temperature=0.2, messages=[{"role":"system","content":"Return only valid JSON."}, prompt])
    txt = resp.choices[0].message.content.strip()
  else:
    genai.configure(api_key=os.getenv("GEMINI_API_KEY") or "")
    for m in genai.list_models():
      if "generateContent" in getattr(m, "supported_generation_methods", []):
        print(getattr(m, "name", ""))
    model = genai.GenerativeModel("gemini-1.5-flash-latest", generation_config={"response_mime_type": "application/json"})
    text_prompt = (
      "You are an expert product analyst. Read the content and return STRICT JSON with keys: "
      "name_en, desc_en, pricing, name_zh_tw, desc_zh_tw, name_zh_cn, desc_zh_cn, category. "
      "Rules: pricing must be one of Free, Freemium, Paid, Free Trial. "
      "Category must be one of " + ", ".join(categories) + ". "
      "Descriptions must be one sentence, professional and exciting. "
      "Chinese names should preserve brand English words but translate generic parts. "
      "Input Content:\n" + md
    )
    resp = model.generate_content(text_prompt)
    txt = (getattr(resp, "text", None) or "").strip()
  try:
    data = json.loads(txt)
  except Exception:
    data = {}
  return {
    "name_en": data.get("name_en") or "",
    "desc_en": data.get("desc_en") or "",
    "pricing": data.get("pricing") or "Free",
    "name_zh_tw": data.get("name_zh_tw") or "",
    "desc_zh_tw": data.get("desc_zh_tw") or "",
    "name_zh_cn": data.get("name_zh_cn") or "",
    "desc_zh_cn": data.get("desc_zh_cn") or "",
    "category": data.get("category") or "Writing",
  }

def create_notion_page(notion: NotionClient, database_id: str, url: str, d: dict) -> str:
  props = {
    "Name": {"title": [{"type": "text", "text": {"content": d["name_en"]}}]},
    "Description": {"rich_text": [{"type": "text", "text": {"content": d["desc_en"]}}]},
    "Name_ZH_TW": {"rich_text": [{"type": "text", "text": {"content": d["name_zh_tw"]}}]},
    "Description_ZH_TW": {"rich_text": [{"type": "text", "text": {"content": d["desc_zh_tw"]}}]},
    "Name_ZH_CN": {"rich_text": [{"type": "text", "text": {"content": d["name_zh_cn"]}}]},
    "Description_ZH_CN": {"rich_text": [{"type": "text", "text": {"content": d["desc_zh_cn"]}}]},
    "URL": {"url": url},
    "Category": {"select": {"name": d["category"]}},
    "Pricing": {"select": {"name": d["pricing"]}},
    "Status": {"select": {"name": "Draft"}},
  }
  page = notion.pages.create(parent={"database_id": database_id}, properties=props)
  return page.get("id", "")

def main():
  load_dotenv()
  openai_key = os.getenv("OPENAI_API_KEY")
  notion_token = os.getenv("NOTION_TOKEN")
  database_id = os.getenv("NOTION_DATABASE_ID")
  if not openai_key or not notion_token or not database_id:
    raise RuntimeError("Missing environment variables: OPENAI_API_KEY, NOTION_TOKEN, NOTION_DATABASE_ID")
  os.environ["OPENAI_API_KEY"] = openai_key
  if (os.getenv("LLM_PROVIDER") or "gemini").strip().lower() == "gemini":
    if not os.getenv("GEMINI_API_KEY"):
      raise RuntimeError("Missing environment variable: GEMINI_API_KEY for Gemini provider")
  raw_url = input("Enter target URL: ").strip()
  target = normalize_url(raw_url)
  md = fetch_markdown(target)
  data = analyze(md)
  notion = NotionClient(auth=notion_token)
  page_id = create_notion_page(notion, database_id, target, data)
  print(page_id)

if __name__ == "__main__":
  main()
