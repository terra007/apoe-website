-- =====================================================
-- APÖ Bewerbungen – Supabase Migration
-- Run this in the Supabase SQL Editor
-- =====================================================

-- ── Tables ──────────────────────────────────────────

CREATE TABLE IF NOT EXISTS bewerbungen (
  id                    UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vorname               TEXT NOT NULL,
  nachname              TEXT NOT NULL,
  email                 TEXT NOT NULL,
  telefon               TEXT,
  herkunftsland         TEXT NOT NULL,
  ausbildung            TEXT NOT NULL,
  erfahrung             TEXT NOT NULL,
  deutschkenntnisse     TEXT NOT NULL,
  verfuegbarkeit        TEXT NOT NULL,
  nachricht             TEXT NOT NULL,
  vorhandene_dokumente  TEXT[]   DEFAULT '{}',
  status                TEXT     NOT NULL DEFAULT 'neu',
  admin_notizen         TEXT     DEFAULT '',
  angefragt_dokumente   TEXT[]   DEFAULT '{}',
  created_at            TIMESTAMPTZ DEFAULT NOW(),
  updated_at            TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS bewerbung_dokumente (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  bewerbung_id   UUID NOT NULL REFERENCES bewerbungen(id) ON DELETE CASCADE,
  original_name  TEXT NOT NULL,
  storage_path   TEXT NOT NULL,
  uploaded_by    TEXT NOT NULL DEFAULT 'bewerber',  -- 'bewerber' | 'admin'
  mime_type      TEXT,
  groesse        INTEGER,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- ── Row Level Security ───────────────────────────────

ALTER TABLE bewerbungen        ENABLE ROW LEVEL SECURITY;
ALTER TABLE bewerbung_dokumente ENABLE ROW LEVEL SECURITY;

-- Drop existing policies first (idempotent re-run)
DROP POLICY IF EXISTS "anon_insert_bewerbungen"    ON bewerbungen;
DROP POLICY IF EXISTS "auth_all_bewerbungen"       ON bewerbungen;
DROP POLICY IF EXISTS "anon_insert_dokumente"      ON bewerbung_dokumente;
DROP POLICY IF EXISTS "auth_all_dokumente"         ON bewerbung_dokumente;
DROP POLICY IF EXISTS "anon_upload_bewerbungen"    ON storage.objects;
DROP POLICY IF EXISTS "anon_read_bewerbungen"      ON storage.objects;
DROP POLICY IF EXISTS "auth_all_bewerbungen_storage" ON storage.objects;

-- Public (anon) can submit applications
CREATE POLICY "anon_insert_bewerbungen"
  ON bewerbungen FOR INSERT TO anon WITH CHECK (true);

-- Authenticated admins can do everything on bewerbungen
CREATE POLICY "auth_all_bewerbungen"
  ON bewerbungen FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Public (anon) can insert document metadata (only for applicant uploads)
CREATE POLICY "anon_insert_dokumente"
  ON bewerbung_dokumente FOR INSERT TO anon
  WITH CHECK (uploaded_by = 'bewerber');

-- Authenticated admins can do everything on documents
CREATE POLICY "auth_all_dokumente"
  ON bewerbung_dokumente FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ── Supabase Storage Policies (bucket: apo-media) ───

CREATE POLICY "anon_upload_bewerbungen"
  ON storage.objects FOR INSERT TO anon
  WITH CHECK (bucket_id = 'apo-media'
    AND (storage.foldername(name))[1] = 'bewerbungen');

CREATE POLICY "anon_read_bewerbungen"
  ON storage.objects FOR SELECT TO anon
  USING (bucket_id = 'apo-media'
    AND (storage.foldername(name))[1] = 'bewerbungen');

CREATE POLICY "auth_all_bewerbungen_storage"
  ON storage.objects FOR ALL TO authenticated
  USING (bucket_id = 'apo-media'
    AND (storage.foldername(name))[1] = 'bewerbungen')
  WITH CHECK (bucket_id = 'apo-media'
    AND (storage.foldername(name))[1] = 'bewerbungen');
