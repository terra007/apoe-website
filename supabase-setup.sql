-- ============================================================
-- APÖ – Supabase Setup
-- Paste into: Supabase Dashboard → SQL Editor → Run
-- ============================================================

-- 1. Create table
create table if not exists kandidatinnen (
  slug text primary key,
  data jsonb not null,
  created_at timestamptz default now()
);

-- 2. Enable Row Level Security
alter table kandidatinnen enable row level security;

-- 3. Public can read (for the website)
create policy "Public read" on kandidatinnen
  for select using (true);

-- 4. Nur die beiden Admin-Accounts dürfen schreiben (UID-basiert)
create policy "Admin write" on kandidatinnen
  for all
  using (
    auth.uid() in (
      '741ad392-bb2a-42d0-a02d-d93af930a424',
      '29e87673-5b55-46ad-a438-f75d4e71c94a'
    )
  )
  with check (
    auth.uid() in (
      '741ad392-bb2a-42d0-a02d-d93af930a424',
      '29e87673-5b55-46ad-a438-f75d4e71c94a'
    )
  );

-- 5. Seed initial candidates (using dollar-quoting to avoid apostrophe issues)
insert into kandidatinnen (slug, data) values
('nattaya-charoenwong', $d${"slug":"nattaya-charoenwong","name":"Nattaya Charoenwong","nameThai":"นัตยา เจริญวงศ์","namePhonetic":"nat-ta-ya · cha-roen-wong","age":27,"experienceYears":5,"specialization":"Altenpflege","languageLevel":"B1","languageProgress":92,"currentPhase":2,"phaseStatus":"RWR-Antrag eingereicht","bio":"Nattaya schloss ihr Pflegestudium am Mahidol University Hospital in Bangkok mit Auszeichnung ab. Ihre fünf Jahre Erfahrung in der stationären Altenpflege machen sie zur idealen Kandidatin für österreichische Pflegeheime.","skills":["Altenpflege","Grundpflege","Demenzbetreuung","Wundversorgung","Mobilitätsförderung"],"availableFrom":"Q4 2025","videoUrl":"/videos/nattaya.mp4","avatarColor":"from-blue-600 to-blue-800","documents":[{"name":"Pflegediplom (Mahidol University)","status":"anerkannt"},{"name":"Geburtsurkunde (Apostille)","status":"anerkannt"},{"name":"Strafregisterbescheinigung TH","status":"anerkannt"},{"name":"ÖSD-Zertifikat B1","status":"anerkannt"},{"name":"RWR-Antrag AMS","status":"eingereicht"},{"name":"Botschafts-Visum D","status":"ausstehend"}]}$d$::jsonb),
('siriporn-suksawat', $d${"slug":"siriporn-suksawat","name":"Siriporn Suksawat","nameThai":"ศิริพร สุขสวัสดิ์","namePhonetic":"si-ri-porn · suk-sa-wat","age":31,"experienceYears":8,"specialization":"Altenpflege","languageLevel":"B1","languageProgress":78,"currentPhase":1,"phaseStatus":"Deutsch-Intensivkurs (Monat 4/6)","bio":"Siriporn bringt acht Jahre Erfahrung in der stationären Altenpflege am Siriraj Hospital, dem größten Krankenhaus Thailands, mit.","skills":["Altenpflege","Demenzbetreuung","Angehörigenberatung","Mobilitätsförderung","Grundpflege"],"availableFrom":"Q1 2026","avatarColor":"from-purple-600 to-purple-800","documents":[{"name":"Pflegediplom (Siriraj Hospital)","status":"anerkannt"},{"name":"Geburtsurkunde (Apostille)","status":"anerkannt"},{"name":"Strafregisterbescheinigung TH","status":"eingereicht"},{"name":"ÖSD-Zertifikat B1","status":"ausstehend"},{"name":"RWR-Antrag AMS","status":"ausstehend"},{"name":"Botschafts-Visum D","status":"ausstehend"}]}$d$::jsonb),
('praewa-thongthai', $d${"slug":"praewa-thongthai","name":"Praewa Thongthai","nameThai":"แพรวา ทองไทย","namePhonetic":"praew-wa · thong-thai","age":29,"experienceYears":6,"specialization":"Altenpflege","languageLevel":"B1","languageProgress":100,"currentPhase":3,"phaseStatus":"Einreise geplant · Dienstantritt vorbereitet","bio":"Praewa spezialisierte sich nach ihrem Abschluss an der Chulalongkorn University auf die stationäre Altenpflege in einem Seniorenzentrum in Bangkok.","skills":["Altenpflege","Pflegedokumentation","Körperpflege","Sturzprävention","Aktivierungsbetreuung"],"availableFrom":"Oktober 2025","avatarColor":"from-green-600 to-green-800","documents":[{"name":"Pflegediplom (Chulalongkorn University)","status":"anerkannt"},{"name":"Geburtsurkunde (Apostille)","status":"anerkannt"},{"name":"Strafregisterbescheinigung TH","status":"anerkannt"},{"name":"ÖSD-Zertifikat B1 (Auszeichnung)","status":"anerkannt"},{"name":"RWR-Karte","status":"anerkannt"},{"name":"Botschafts-Visum D","status":"anerkannt"}]}$d$::jsonb),
('malee-wongsiri', $d${"slug":"malee-wongsiri","name":"Malee Wongsiri","nameThai":"มาลี วงศ์ศิริ","namePhonetic":"ma-lee · wong-si-ri","age":25,"experienceYears":3,"specialization":"Altenpflege","languageLevel":"A2","languageProgress":55,"currentPhase":1,"phaseStatus":"Deutsch-Intensivkurs (Monat 2/6)","bio":"Malee ist mit 25 Jahren die jüngste Kandidatin im aktuellen APÖ-Jahrgang, bringt jedoch bereits drei Jahre Erfahrung in einem Bangkoker Seniorenheim mit.","skills":["Altenpflege","Grundpflege","Ernährungsunterstützung","Soziale Betreuung","Freizeitgestaltung"],"availableFrom":"Q2 2026","avatarColor":"from-pink-600 to-pink-800","documents":[{"name":"Pflegediplom (Bangkok Childrens Hospital)","status":"anerkannt"},{"name":"Geburtsurkunde (Apostille)","status":"eingereicht"},{"name":"Strafregisterbescheinigung TH","status":"ausstehend"},{"name":"ÖSD-Zertifikat B1","status":"ausstehend"},{"name":"RWR-Antrag AMS","status":"ausstehend"},{"name":"Botschafts-Visum D","status":"ausstehend"}]}$d$::jsonb),
('anchana-buathong', $d${"slug":"anchana-buathong","name":"Anchana Buathong","nameThai":"อัญชนา บัวทอง","namePhonetic":"an-cha-na · bua-thong","age":34,"experienceYears":11,"specialization":"Altenpflege","languageLevel":"B1","languageProgress":100,"currentPhase":4,"phaseStatus":"Nostrifizierungsverfahren läuft · als PA tätig","bio":"Anchana ist die erfahrenste Kandidatin im APÖ-Programm. Elf Jahre in der stationären Altenpflege am Ramathibodi Hospital haben sie zu einer äußerst kompetenten Pflegefachkraft geformt.","skills":["Altenpflege","Demenzbetreuung","Palliativbegleitung","Wundmanagement","Teamführung","Pflegeplanung"],"availableFrom":"als DGKP: Q1 2026","avatarColor":"from-red-600 to-red-800","documents":[{"name":"Pflegediplom (Ramathibodi Hospital)","status":"anerkannt"},{"name":"Geburtsurkunde (Apostille)","status":"anerkannt"},{"name":"Strafregisterbescheinigung TH","status":"anerkannt"},{"name":"ÖSD-Zertifikat B1","status":"anerkannt"},{"name":"RWR-Karte","status":"anerkannt"},{"name":"Nostrifizierungsantrag DGKP","status":"eingereicht"}]}$d$::jsonb),
('supansa-klahan', $d${"slug":"supansa-klahan","name":"Supansa Klahan","nameThai":"สุพรรษา กล้าหาญ","namePhonetic":"su-pan-sa · kla-han","age":30,"experienceYears":7,"specialization":"Altenpflege","languageLevel":"B1","languageProgress":88,"currentPhase":2,"phaseStatus":"Dokumente bei AMS eingereicht","bio":"Supansa widmete sich nach ihrem Abschluss an der Khon Kaen University vollständig der stationären Altenpflege.","skills":["Altenpflege","Sterbebegleitung","Schmerzmanagement","Angehörigenberatung","Biografiearbeit"],"availableFrom":"Q4 2025","avatarColor":"from-amber-600 to-amber-800","documents":[{"name":"Pflegediplom (Khon Kaen University)","status":"anerkannt"},{"name":"Geburtsurkunde (Apostille)","status":"anerkannt"},{"name":"Strafregisterbescheinigung TH","status":"anerkannt"},{"name":"ÖSD-Zertifikat B1","status":"eingereicht"},{"name":"RWR-Antrag AMS","status":"eingereicht"},{"name":"Botschafts-Visum D","status":"ausstehend"}]}$d$::jsonb)
on conflict (slug) do nothing;
