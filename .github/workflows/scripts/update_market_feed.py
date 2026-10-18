#!/usr/bin/env python3
"""Collect public news headlines. Never accesses private app data.
No LLM, no scraping of retailer accounts, and no automatic factual summaries.
"""
import datetime as dt, email.utils, json, pathlib, re, urllib.parse, urllib.request, xml.etree.ElementTree as ET
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/'blush_moonlight_v2'/'market-feed.json'
QUERIES={
 'canada':['jewelry retail Canada Saskatchewan trends','Canadian holiday gift spending jewelry'],
 'global':['jewellery fashion trends 2026','jewelry design gemstone trends'],
 'brands':['Hillberg Berk jewelry new collection','Pandora Canada jewelry collection','Mejuri Canada jewelry launch']
}
now=dt.datetime.now(dt.timezone.utc)
items=[];seen=set();errors=[]
for area,queries in QUERIES.items():
 for q in queries:
  url='https://news.google.com/rss/search?'+urllib.parse.urlencode({'q':q+' when:14d','hl':'en-CA','gl':'CA','ceid':'CA:en'})
  try:
   req=urllib.request.Request(url,headers={'User-Agent':'BlushMoonlightPublicResearch/1.0 (+personal noncommercial reader)'})
   with urllib.request.urlopen(req,timeout=15) as r: content=r.read(1000000)
   root=ET.fromstring(content)
   for item in root.findall('./channel/item')[:8]:
    title=(item.findtext('title') or '').strip();link=(item.findtext('link') or '').strip()
    source=(item.findtext('source') or 'Google News linked publisher').strip()
    date=(item.findtext('pubDate') or '').strip()
    if not title or not link.startswith('https://') or link in seen:continue
    try:
     parsed=email.utils.parsedate_to_datetime(date).astimezone(dt.timezone.utc)
     if parsed<now-dt.timedelta(days=21) or parsed>now+dt.timedelta(days=1):continue
     date=parsed.date().isoformat()
    except Exception:continue
    seen.add(link);items.append({'area':area,'title':title[:260],'source':source[:140],'date':date,'url':link})
  except Exception as exc:errors.append(f'{area}: {type(exc).__name__}')
items=sorted(items,key=lambda x:x['date'],reverse=True)
by_area={k:0 for k in QUERIES};selected=[]
for item in items:
 if by_area[item['area']]>=12:continue
 selected.append(item);by_area[item['area']]+=1
if not selected:
 print('No fresh feed entries. Keeping existing feed. Errors:',errors)
 raise SystemExit(0)
OUT.parent.mkdir(parents=True,exist_ok=True)
OUT.write_text(json.dumps({'updated':now.isoformat(timespec='seconds'),'items':selected},ensure_ascii=False,indent=2)+'\n',encoding='utf-8')
print('Saved',len(selected),'public headlines. Errors:',errors)
