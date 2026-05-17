-- =====================================================
-- APÖ Portal – Upload Token Migration
-- Run this in the Supabase SQL Editor
-- =====================================================

-- Add upload token columns to bewerbungen
ALTER TABLE bewerbungen
  ADD COLUMN IF NOT EXISTS upload_token          UUID UNIQUE,
  ADD COLUMN IF NOT EXISTS upload_token_created_at TIMESTAMPTZ;
