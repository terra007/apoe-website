-- =====================================================
-- APÖ Portal – RPC Function (replaces service role key)
-- Run this in the Supabase SQL Editor
-- =====================================================

-- 1. Allow anon to also insert portal uploads (was: only 'bewerber')
DROP POLICY IF EXISTS "anon_insert_dokumente" ON bewerbung_dokumente;
CREATE POLICY "anon_insert_dokumente"
  ON bewerbung_dokumente FOR INSERT TO anon
  WITH CHECK (uploaded_by IN ('bewerber', 'portal'));

-- 2. SECURITY DEFINER function: runs as DB owner, bypasses RLS,
--    but only returns the specific safe fields needed for the portal.
--    anon cannot SELECT bewerbungen directly — only via this function.
CREATE OR REPLACE FUNCTION get_portal_data(p_token UUID)
RETURNS JSON
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT json_build_object(
    'id',                       b.id,
    'vorname',                  b.vorname,
    'angefragt_dokumente',      b.angefragt_dokumente,
    'upload_token_created_at',  b.upload_token_created_at,
    'bewerbung_dokumente', COALESCE(
      (SELECT json_agg(json_build_object(
        'id',            d.id,
        'original_name', d.original_name,
        'uploaded_by',   d.uploaded_by,
        'created_at',    d.created_at
      ) ORDER BY d.created_at)
      FROM bewerbung_dokumente d
      WHERE d.bewerbung_id = b.id
        AND d.uploaded_by = 'portal'),
      '[]'::json
    )
  )
  FROM bewerbungen b
  WHERE b.upload_token = p_token;
$$;

GRANT EXECUTE ON FUNCTION get_portal_data TO anon, authenticated;
